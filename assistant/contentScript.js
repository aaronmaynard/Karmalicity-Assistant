setTimeout(function(){	
	var title = window.location.href;
	var credits;
	if(title == "http://www.karmalicity.com/get-points/") {
		// home
		launchListing();
    } else if(title.includes("listing")) {
		// on listing
		launchIMDb();	   
    } else {
		// on IMDB page
		credits = obtainCredits();
		alert(credits);
    } 
}, 1000);

function launchListing(){
	// Get the first IMDB listing ID
	var listingId = document.querySelector(".imdb-yellow-font").parentElement.parentElement.getAttribute("data-listing-id");
	// Obtain the listing URL
	var listingPrefix = "http://www.karmalicity.com/get-points/listing/?id="
	// Combine the two
	var listingURL = listingPrefix.concat(listingId)	
	// Return the URL to background.js
	chrome.runtime.sendMessage(listingURL);
}

function launchIMDb(){
	// Get the target
	var target = document.querySelectorAll("strong")[1].innerHTML.replace(/['"]+/g, '');
	var targetIdPrefix = "filmo-head-";
	var targetId = targetIdPrefix.concat(target.toLowerCase());
	
	// Obtain the url
	var imdbURL = document.querySelector(".btn-karma").getAttribute("data-url")
	
	// Sent the url to extension
	chrome.runtime.sendMessage(imdbURL);
	
	
	/*
	Extension should now be on & left IMDB page
	*/
	
	
	// Click the button
	document.querySelector(".btn-karma").click()
	
	/*
	TO DO
	*/
}

function obtainCredits(){
	// Extension has completed loading the imdb page
	var node = document.getElementById("filmo-head-actor");
	
	// Convert the node to a string
	var tmpNode = document.createElement( "div" );
	tmpNode.appendChild( node.cloneNode( true ) );
	var str = tmpNode.innerHTML;
	tmpNode = node = null; // prevent memory leaks in IE
	
	// Obtain the credits from the string
	var innerHTML = str.substr(0, str.indexOf('credit'));
	var last2 = innerHTML.slice(-5);
	var credits = last2.match(/\d+/g).map(Number);
	chrome.runtime.sendMessage(credits);
	window.open('','_self').close();
	return credits;
}