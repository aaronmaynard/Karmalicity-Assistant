/*
Global variables, loaded on every page open
*/

var title = window.location.href; // Gets the url of the webpage
var credits;
var runningTime;
var node; // All of the html for the node in reference to target id
var targetId;
var data;

/*
Check which page we are loaded on
Do we need a timeout function?
*/

if (title == "http://www.karmalicity.com/get-points/") { // We have loaded on the startup page
	
	var urlListing = getListing(); // Gets the url of the next IMDb listing
	openNewURLInTheSameWindow(urlListing); // The listing URL is now open on the current page
	
} else if (title.includes("listing")) { // We have loaded on the listing page
	
	// First check that we have not reached the daily limit
	var activityCol = document.getElementById("rightColumn");
	var tmpNode = document.createElement( "div" );
	tmpNode.appendChild( activityCol.cloneNode( true ) );
	var str = tmpNode.innerHTML;
	// look for 60 out of 60
	if (str.includes("You've completed 60 out of 60 possible actions so far today.")) { // completed daily activity
		/*
		Stop extension
		*/
		
		
	} else {
		
		targetId = getTargetId(); // Gets the target id
		console.log(targetId);
		var urlIMDb = document.querySelector(".btn-karma").getAttribute("data-url"); // Gets the listings IMDb link
		
		sendDataToExtension(targetId);
		
		document.querySelector(".btn-karma").click(); // Click the button
		
		/*
		Extension should now be on IMDb page
		*/
		
		setTimeout(function(){
			getCreditsFromExtension("credits");
			setTimeout(function(){
				credits = credits.replace('key_','');
				document.getElementById("imdb-view-answer").setAttribute('value',credits); // Fills credits
				document.querySelector(".btn-success").click(); // Click the button
			}, 1000);
		}, 4000);
	}
	
} else if (title.includes("imdb")) { // We have loaded on the IMDb page
	// Get the targetId from the extension
	setTimeout(function(){
		getIdFromExtension("target");
		setTimeout(function(){
			console.log(targetId);
			if (targetId == "Tips:"){
				obtainRunningTime();
				runningTime = "key_" + runningTime;
				credits = runningTime;
				sendDataToExtension(credits);
			} else{
				obtainCredits(targetId);
				credits = "key_" + credits;
				sendDataToExtension(credits);
			}
			close();
		}, 1000);
	}, 1000);
	
} else{
	// Do nothing
}


/*
Functions referenced on page load
*/

function getIdFromExtension(request){
	chrome.runtime.sendMessage({greeting: request}, function(response) { // Gets the data from the extension
		targetId = (response.farewell);
	});
}

function getCreditsFromExtension(request){
	chrome.runtime.sendMessage({greeting: request}, function(response) { // Gets the data from the extension
		credits = (response.farewell);
	});
}

function sendDataToExtension(request){
	chrome.runtime.sendMessage({greeting: request}, function(response) { // Sends the data to the extension
		console.log(response.farewell);
	});
}

function obtainCredits(targetId){
	// Extension has completed loading the imdb page
	console.log(targetId);
	node = document.getElementById(targetId);
	
	// Convert the node to a string
	var tmpNode = document.createElement( "div" );
	tmpNode.appendChild( node.cloneNode( true ) );
	var str = tmpNode.innerHTML;
	//tmpNode = node = null; // prevent memory leaks in IE
	
	// Obtain the credits from the string
	var innerHTML = str.substr(0, str.indexOf('credit'));
	var last5 = innerHTML.slice(-5);
	var tmpArr = last5.match(/\d+/g).map(Number);
	credits = tmpArr[0];
}

function obtainRunningTime(){
	// Extension has completed loading the imdb page
	node = document.querySelector("time");
	if (node === null) { // The page does not have a time setActive
		runningTime = "0";
	} else {
		// Convert the node to a string
		var tmpNode = document.createElement( "div" );
		tmpNode.appendChild( node.cloneNode( true ) );
		var str = tmpNode.innerHTML;
		//tmpNode = node = null; // prevent memory leaks in IE
		
		// Obtain the running time from the string
		var innerHTML = str.substr(0, str.indexOf('min'));
		var last5 = innerHTML.slice(-5);
		var time = last5.replace(/h/g, '');
		// At this point we will have something like "1 30"
		var timeArray = time.split(" ");
		var minutes
		if (timeArray[0] === 0) { // Time is less than one hour
			minutes = timeArray[3];
		} else {
			minutes = parseInt(timeArray[0])*60+parseInt(timeArray[1]);
		}
		// would be 90
		runningTime = minutes;
	}
}

function getTargetId(){
	// Get the target
	targetId = "";
	var target = document.querySelectorAll("strong")[1].innerHTML.replace(/['"]+/g, '');
	
	if (target === "Tips:") { // We caught a running length listing
		console.log("We need running time");
		targetId = ("Tips:");
		return targetId;
	}	
	
	/*
	Here we have recieved the target ie actor, actress, producer
	What we need to do is correspond it with the appropriate ending
	*/
	if (target == "Actor"){
		target = "actor";
	} else if (target == "Actress"){
		target = "actress";
	} else if (target == "Writer"){
		target = "writer";
	} else if (target == "Producer"){
		target = "producer";
	} else if (target == "Miscellaneous Crew"){
		target = "miscellaneous";
	} else if (target == "Music Department"){
		target = "music_department";
	} else if (target == "Thanks"){
		target = "thanks";
	} else if (target == "Self"){
		target = "self";
	} else if (target == "Stunts"){
		target = "stunts";
	} else if (target == "Art Department"){
		target = "art_department";
	} else if (target == "Location Management"){
		target = "location_management";
	} else if (target == "Second Unit Director or Assistant Director"){
		target = "assistant_director";
	} else if (target == "Director"){
		target = "director";
	} else if (target == "Archive Footage"){
		target = "archive_footage";
	} else if (target == "Cinematographer"){
		target = "cinematographer";
	} else if (target == "Sound Department"){
		target = "sound_department";
	} else if (target == "Visual Effects"){
		target = "visual_effects";
	} else if (target == "Camera And Electrical Department"){
		target = "camera_department";
	} else if (target == "Special Effects"){
		target = "special_effects";
	} else if (target == "Production Designer"){
		target = "production_designer";
	} else if (target == "Production Manager"){
		target = "production_manager";
	} else {
		target = "You need to add more types";
	}
	// Attach the two
	var targetIdPrefix = "filmo-head-";
	targetId = targetIdPrefix.concat(target);
	return targetId;
}

function getListing(){
	// Get the first IMDB listing ID
	var listingId = document.querySelector(".imdb-yellow-font").parentElement.parentElement.getAttribute("data-listing-id");
	// Obtain the listing URL
	var listingPrefix = "http://www.karmalicity.com/get-points/listing/?id=";
	// Combine the two
	var listingURL = listingPrefix.concat(listingId);
	// Return the listingURL
	return listingURL;
}

// this function can fire onclick handler for any DOM-Element
function fireClickEvent(element) {
    var evt = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    element.dispatchEvent(evt);
}

// this function will setup a virtual anchor element
// and fire click handler to open new URL in the same room
// it works better than location.href=something or location.reload()
function openNewURLInTheSameWindow(targetURL) {
    var a = document.createElement('a');
    a.href = targetURL;
    fireClickEvent(a);
}

function openNewTabOrNewWindow(targetURL) {
    var a = document.createElement('a');
    a.href = targetURL;

    a.target = '_blank'; // now it will open new tab/window and bypass any popup blocker!

    fireClickEvent(a);
}
