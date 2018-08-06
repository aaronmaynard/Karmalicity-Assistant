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
				alert("You need to be logged in to utilize this application!");
			}else { 
				// User is logged in
				urlManagement();
			}
		});
    }, 1000);
});


function urlManagement(){
	chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
		// Checks url from listener
		if (response.includes("listing")){
			// A listing page
			chrome.tabs.update({ url: response });
		} else if (response.includes("imdb")){
			// A imdb page
			chrome.tabs.create({ url: response });
		} else{
			// ehh...
		}
		
	});
}


/* Notes


function obtainListing(){
	alert("logged in");
	// Get the first IMDB listing ID
	var listingId = "1556"; 
	//listingId = document.querySelector(".imdb-yellow-font").parentElement.parentElement.getAttribute("data-listing-id");
	alert("listingId = " + listingId);
	// Obtain the listing URL
	var listingPrefix = "http://www.karmalicity.com/get-points/listing/?id="
	// Combine the two
	var listingURL = listingPrefix.concat(listingId)
	// Open the listing
	chrome.tabs.create({ url: listingURL });
}


*/