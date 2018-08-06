/*
Global variables
*/

var title; // Gets the url of the webpage
var credits; // Setting the default value to zero
var targetId; // The target used to collect the credits on IMDb

/*
Main stuff
*/

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
	if (request.greeting.includes("filmo-head-")){
		targetId = request.greeting;
		sendResponse({farewell: ("received targetId: " + targetId)});
	}
	if (request.greeting.includes("target")){
		sendResponse({farewell: (targetId)});
	} 
	if (request.greeting.includes("key_")){
		credits = request.greeting;
		sendResponse({farewell: (credits)});
	} 
	if (request.greeting.includes("credits")){
		sendResponse({farewell: (credits)});
	} 
  });