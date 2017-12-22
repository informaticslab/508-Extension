chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    var htmlStr = $('html')[0].innerHTML;
    var data = htmlStr;
    sendResponse({data: data, success: true});

    //open constant communication with background.js
    var port = chrome.runtime.connect({name: "connection"});
    port.onMessage.addListener(function(message) {

        //append bootstrap to current page to display labels for warnings/errors
        $('head').append($('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">'));

        //handle image alt tag errors
        if (message.msg === "imageError") {
            for (var i = 0; i < $('img').length; i++){
                if ($('img')[i].src.includes(message.data)){
                    $("<span class=\"label label-danger\">Error: No Alt Tag Present</span>").insertBefore($('img')[i]);
                }
            }
        }
    });
});