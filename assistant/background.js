/*
Global Variables
These variables are used to carry data between the background scripts.
*/
var credits; // The number of credits obtained from IMDb
var targetId; // The string used to find the corresponding DIV on IMDb

/*
Message Passing
Send a one-time JSON-serializable message from a content script to extension , or vice versa, respectively.
*/
function messagePassing(){
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse){
			// Content script [Karmalicity] is passing the variable targetId
			if(request.greeting.includes("filmo-head-")){
				// Set the incoming request to the targetId
				targetId = request.greeting;
			}
			// Extension sends the targetId to the content script [IMDb]
			if(request.greeting.includes("target")){
				// Sends the targetId
				sendResponse({farewell: (targetId)});
				// Reset the targetId
				targetId = "";
			}
			// Content script [IMDb] is passing the credits to the extension
			if(request.greeting.includes("key_")){
				// Set the incoming request to the variable credits
				credits = request.greeting;
			}
			// Extension sends the credits to the content script [Karmalicity]
			if(request.greeting.includes("submission")){
				// Set the incoming request to the variable credits
				sendResponse({farewell: (credits)});
			}
		}
	);
}

/*
Extension Runner
Starts the extension when the icon is clicked.  Navigates to Karmalicity and runs the Message Passing sequence.
*/
chrome.browserAction.onClicked.addListener(function(activeTab){
	// Opens the "Get Points" page on Karmalicity
	chrome.tabs.create({ url: "http://www.karmalicity.com/get-points/" });
	// One second timeout to allow the page to redirect if the user is not logged in
	setTimeout(function(){		
		// Runs a query to obtain tab information
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			// Checks if the user is logged in
			var check = (tabs[0].url).includes('login');
			if(check){
				// The user is not logged in
				alert("You need to be logged in to utilize this application!\nPlease log in and try again.");
			}else{
				// The user is logged in
				messagePassing();
			}
		});
	}, 1000);
});
