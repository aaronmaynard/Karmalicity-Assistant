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
		targetId = "";
	} 
	if (request.greeting.includes("key_")){
		credits = request.greeting;
		sendResponse({farewell: (credits)});
	} 
	if (request.greeting.includes("credits")){
		sendResponse({farewell: (credits)});
	} 
});
  
  
chrome.browserAction.onClicked.addListener(function(activeTab){
    // Attempt to open Karmalicity get points page
    var getPoints = "http://www.karmalicity.com/get-points/";
    chrome.tabs.create({ url: getPoints });

	// Allow the browser to redirect if the user is not logged in
    setTimeout(function(){
		var check;
		// Check if the user is logged in
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			// Boolean returns true if the url contains the string 'login'
			check = (tabs[0].url).includes('login');

			if (check == true){
				// If returns true, user is not logged in
				alert("You need to be logged in to utilize this application!\nPlease log in and try again.");
			}else { 
				// User is logged in
				chrome.runtime.onMessage.addListener(
					function(request, sender, sendResponse) {
						console.log(sender.tab ?
									"from a content script:" + sender.tab.url :
									"from the extension");
						if (request.greeting.includes("filmo-head-")){
							targetId = request.greeting;
							sendResponse({farewell: ("received targetId: " + targetId)});
						}
						if (request.greeting.includes("Tips")){
							targetId = request.greeting;
							sendResponse({farewell: ("received targetId: " + targetId)});
						}
						if (request.greeting.includes("target")){
							sendResponse({farewell: (targetId)});
							targetId = "";
						} 
						if (request.greeting.includes("key_")){
							credits = request.greeting;
							sendResponse({farewell: (credits)});
						} 
						if (request.greeting.includes("credits")){
							sendResponse({farewell: (credits)});
						} 
					}
				);
			}
		});
    }, 1000);
});
