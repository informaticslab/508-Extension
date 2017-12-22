document.addEventListener('DOMContentLoaded', function() {
    
   
    document.getElementById('status').textContent = "Click the button below to check the 508 accessibility of the current web page";
    var runCheckButton = document.getElementById('accessibilityCheckBtn');
    var refreshButton = document.getElementById('refreshBtn');
    var errorCount = 0;
    var warningCount = 0;

    //handle click of check button (begins application)
    runCheckButton.addEventListener('click', function () {
        $('#status').html('Results of the web page\'s accessibilty are listed below');
        var text = "success";

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {data: text}, function(response) {

                //open constant communication with content.js
                chrome.runtime.onConnect.addListener(function(port) {
                    console.assert(port.name == "conection");

                    //load DOM from current tab
                    let parser = new DOMParser();
                    var htmlString = response.data;
                    port.onMessage.addListener(function(message) {
                        if (message.msg === "updatedHtml") {
                            htmlString = message.data;
                        }
                    });
                    let parsedHtml = parser.parseFromString(htmlString, 'text/html');

                    //Check images for alt tags
                    $("#imagesBody").html('<tr></tr>');
                    if (!parsedHtml.images){
                        $('#imagesBody tr:last').after('<tr><td>No Tables Found on Web Page</td></tr>');
                    }
                    else{
                        for (var i = 0; i < parsedHtml.images.length; i++){
                            if (!parsedHtml.images[i].alt || parsedHtml.images[i].alt == ""){
                                $('#imagesBody tr:last').after('<tr><td class="danger">Error: No alt tag provided</td><td>'+parsedHtml.images[i].src+'</td></tr>');
                                var source = parsedHtml.images[i].src.replace('chrome-extension://jepgedbmbmcbllidonfjkcfcpbealfee', '');
                                port.postMessage({msg: "imageError", data: source});
                                this.errorCount ++;
                            }
                            else {
                                $('#imagesBody tr:last').after('<tr><td>'+parsedHtml.images[i].alt+'</td><td>'+parsedHtml.images[i].src+'</td></tr>');
                            }
                        }
                    }
                });
            });
        });
        //update summary table
        if (errorCount > 0){
            var errorDesc = (errorCount < 2 ? "Error Discovered" : "Errors Discovered");
            $('#errors').append('<td class="danger">'+errorCount+' '+errorDesc+'</td>');
        }
        else {
            $('#errors').append('<td>No Errors Discovered</td>');
        }
        if (warningCount > 0){
            var warningDesc = (warningCount < 2 ? "Warning Discovered" : "Warnings Discovered");
            $('#warnings').append('<td class="warning">'+warningCount+' '+warningDesc+'</td>');
        }
        else {
            $('#warnings').append('<td>No Warnings Discovered</td>');
        }

        //hide/show buttons and result tables
        $('#accessibilityCheckBtn').hide();
        $('#summary').show();
        $("#images").show();
    });

    
});