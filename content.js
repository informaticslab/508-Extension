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

        // //handle refresh
        // if (message.msg === "refresh") {
        //     $.when(reloadPage()).done(function() {
        //         finishedReload(htmlStr, port)
        //     });
        //     // location.reload(true).done(console.log(htmlStr));
        //     // $(function() {
        //     //     console.log(htmlStr)
        //     //     port.postMessage({msg: "refreshed"});
        //     // });
        // }
        // else if (message.msg === "updateHtml") {
        //     htmlStr = $('html')[0].innerHTML;
        //     port.postMessage({msg: "updatedHtml", data: htmlStr});
        // }
    });
});

// var reloadPage = function() {
//     $.when(location.reload(true)).done(function() {
//         $(window).on('load', function() {
//             alert("window is loaded");
//             return true;
//         });
//     });
// };

// var finishedReload = function(pageData, port) {
//     console.log(pageData);
//     port.postMessage({msg: "refreshed"});
// };


// chrome.tabs.query( {
//     active: true,
//     lastFocusedWindow: true
// },
// function(array_of_Tabs) {
//     var tab = array_of_Tabs[0];
//     //tab.url; - url of the active tab

//     // chrome.tabs.executeScript(tab.id, {code: "chrome.runtime.sendMessage(document.getElementsByTagName('html')[0].innerHTML);"});

// });

// chrome.runtime.onMessage.addListener(function(request) {
//     document.getElementsByTagName('html')[0].innerHTML = request;
// });

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         if (request.message === "clicked_browser_action") {
//             var firstHref = $("a[href^='http']").eq(0).attr("href");
//             // console.log(firstHref);

//             // chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
//             chrome.runtime.sendMessage({"message": "source_doc", "source": document.getElementsByTagName('html')[0].innerHTML});
//             console.log("HTML: /n" + document.getElementsByTagName('html')[0].innerHTML);
//             var htmlStr = document.getElementsByTagName('html')[0].innerHTML
            
//             let parser = new DOMParser();
//             let parsedHtml = parser.parseFromString(htmlStr, 'text/html');

//             for (var i = 0; i < parsedHtml.images.length; i++){
//                 console.log("alt tag:..."+ parsedHtml.images[i].alt+ "...");
//                 if (parsedHtml.images[i].alt == ""){
//                     alert("No alt tag");
//                 }
//             }

//             var iFrame = document.createElement('iframe');
//             // iFrame.style.width = "200px";
//             // iFrame.style.height = "100%";
//             // iFrame.style.background = "white";
//             // iFrame.style.position = "fixed";
//             // iFrame.style.cssFloat = "left";
//             // iFrame.style.top =  "0px";
//             // iFrame.style.left = "0px";
//             iFrame.id = "panel";
//             iFrame.className = "frame";
//             document.body.prepend(iFrame);

//             function tryMe(arg) {
//                 document.write(arg);
//             }  

//             // document.body.appendChild(iFrame);
//             // document.getElementById('panel').src = "https://nppadmindev.phiresearchlab.org/";
//             // document.getElementById('panel').srcdoc = 
//             //     "<html><head><script type='text/javascript' src='jquery-3.2.1.min.js'></script></head><script src='content.js'></script></head><body>Data Here<script>document.write(htmlStr)</script></body></html>";
//             // document.getElementById('panel').src = "file:////Users/cameronday/Projects/index.html";


//             // var $htmlStr = $(htmlStr);
//             // console.log($htmlStr.getElementsByTagName("img"));
            
//             // var  xmlStr = htmlStr, parser = new DOMParser(), doc = parser.parseFromString(xmlStr, "text/xml");
//             // console.log(doc.nextSibling.textContent);
            
//             // console.log("/n/nSource: /n" + request.source);
//         }
//     }
// );


// // // content.js
// // chrome.runtime.onMessage.addListener(
// //   function(request, sender, sendResponse) {
// //     if( request.message === "clicked_browser_action" ) {
// //       var firstHref = $("a[href^='http']").eq(0).attr("href");

//       console.log(firstHref);

//       // This line is new!
//       chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
//     }
//   }
// );