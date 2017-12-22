# 508-Extension

Chrome Extension Start-up:
  1) Navigate to Chrome → Extensions
  2) Select 'Load unpacked extension...'
  3) Select this project folder
  4) Chrome extension icon should appear in right corner of toolbar, click on icon to run extension
  
  Note - theses steps should be followed for initial loading of the extension as well as after any modifications to the code.
  
  
  Main Files:
  1) manifest.json - provides details for the extension such as name, description, version number, scripts, actions, etc. 
  2) content.js - accesses DOM from current web page and communicates with background.js to provide this information
  3) background.js - maniplates data provided from content.js to test the accessibility of the loaded web page and modifies the popup window
  
  
 Bootstrap v3.3.7
 JQuery v3.2.1
  
# 508-Extension
