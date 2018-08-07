/*
Global Variables
Loaded on every page open
*/
var title = window.location.href; // Gets the url of the current webpage
var key; // Holds the current value of credits or running time
var node; // All of the html for the node in reference to target id
var targetId; // String used to find the DIV associated with the target
var dLR // Daily Limit Reached

/*
Functions referenced by Page Validator
*/
// Gets the targetId from the extension
function getIdFromExtension(request){
	chrome.runtime.sendMessage({greeting: request}, function(response){ 
		targetId = (response.farewell);
		return targetId;
	});
}
// Gets the key from the extension
function getCreditsFromExtension(request){
	chrome.runtime.sendMessage({greeting: request}, function(response){
		key = (response.farewell);
	});
}
// Sends the data to the extension
function sendDataToExtension(request){
	chrome.runtime.sendMessage({greeting: request}, function(response){
	});
}
// Key registered as credits
function obtainCredits(targetId){
	// Obtain the node containing the target value
	node = document.getElementById(targetId);
	// Convert the node to a string
	var tmpNode = document.createElement( "div" );
	tmpNode.appendChild( node.cloneNode( true ) );
	var str = tmpNode.innerHTML;	
	// Obtain the credits from the string
	var innerHTML = str.substr(0, str.indexOf('credit'));
	var last5 = innerHTML.slice(-5);
	var tmpArr = last5.match(/\d+/g).map(Number);
	// Sets the key to the appropriate number of credits
	key = tmpArr[0];
	return key;
}
// Key registered as running time
function obtainRunningTime(){
	// Obtain the node containing the target value
	node = document.querySelector("time");
	if (node === null) {
		// The page does not have a time setActive, default to zero
		key = "0";
	} else {
		// Convert the node to a string
		var tmpNode = document.createElement( "div" );
		tmpNode.appendChild( node.cloneNode( true ) );
		var str = tmpNode.innerHTML;
		// Obtain the running time from the string
		var innerHTML = str.substr(0, str.indexOf('min'));
		var last5 = innerHTML.slice(-5);
		var time = last5.replace(/h/g, '');
		// At this point we will have something like "1 30"
		var timeArray = time.split(" ");
		var minutes
		if (timeArray[0] === 0) { // Time is less than one hour
			key = timeArray[3];
		} else {
			key = parseInt(timeArray[0])*60+parseInt(timeArray[1]);
		}
	}
}
// Gets the next available IMDb listing
function getListing(){
	// Search for an IMDb tag
	var listingId = document.querySelector(".imdb-yellow-font").parentElement.parentElement.getAttribute("data-listing-id");
	// Listing URL prefix is known
	var listingURL = "http://www.karmalicity.com/get-points/listing/?id=".concat(listingId);
	// Return the listingURL
	return listingURL;
}
// Gets the targetId
function getTargetId(){
	// Clear the target for fresh grab
	targetId = "";
	// Get the target
	var target = document.querySelectorAll("strong")[1].innerHTML.replace(/['"]+/g, '');
	// We caught a running length listing
	if(target === "Tips:"){
		targetId = ("Tips:");
	}else if(target == "Actor"){
		targetId = "filmo-head-actor";
	}else if(target == "Actress"){
		targetId = "filmo-head-actress";
	}else if(target == "Writer"){
		targetId = "filmo-head-writer";
	}else if(target == "Producer"){
		targetId = "filmo-head-producer";
	}else if(target == "Miscellaneous Crew"){
		targetId = "filmo-head-miscellaneous";
	}else if(target == "Music Department"){
		targetId = "filmo-head-music_department";
	}else if(target == "Thanks"){
		targetId = "filmo-head-thanks";
	}else if(target == "Self"){
		targetId = "filmo-head-self";
	}else if(target == "Stunts"){
		targetId = "filmo-head-stunts";
	}else if(target == "Art Department"){
		targetId = "filmo-head-art_department";
	}else if(target == "Location Management"){
		targetId = "filmo-head-location_management";
	}else if(target == "Second Unit Director Or Assistant Director"){
		targetId = "filmo-head-assistant_director";
	}else if(target == "Director"){
		targetId = "filmo-head-director";
	}else if(target == "Archive Footage"){
		targetId = "filmo-head-archive_footage";
	}else if(target == "Cinematographer"){
		targetId = "filmo-head-cinematographer";
	}else if(target == "Sound Department"){
		targetId = "filmo-head-sound_department";
	}else if(target == "Visual Effects"){
		targetId = "filmo-head-visual_effects";
	}else if(target == "Camera And Electrical Department"){
		targetId = "filmo-head-camera_department";
	}else if(target == "Special Effects"){
		targetId = "filmo-head-special_effects";
	}else if(target == "Production Designer"){
		targetId = "filmo-head-production_designer";
	}else if(target == "Production Manager"){
		targetId = "filmo-head-production_manager";
	}else if(target == "Casting Director"){
		targetId = "filmo-head-casting_director";
	}else if(target == "Costume And Wardrobe Department"){
		targetId = "filmo-head-costume_department";
	}else if(target == "Casting Director"){
		targetId = "filmo-head-casting_director";
	}else if(target == "Casting Department"){
		targetId = "filmo-head-casting_department";
	}else{
		targetId = "The developer needs to add more types";
		alert(targetId);
		console.log(targetId);
	}
	return targetId;
}
// This function can fire onclick handler for any DOM-Element
function fireClickEvent(element){
    var evt = new window.MouseEvent('click',{
        view: window,
        bubbles: true,
        cancelable: true
    });
    element.dispatchEvent(evt);
}
// Opens URL in the same window
function openNewURLInTheSameWindow(targetURL){
    var a = document.createElement('a');
    a.href = targetURL;
    fireClickEvent(a);
}
// Opens URL in new tab
function openNewTabOrNewWindow(targetURL){
    var a = document.createElement('a');
    a.href = targetURL;
    a.target = '_blank';
    fireClickEvent(a);
}
// Checks if the daily limit has been reached
function checkDailyLimit(){
	var activityCol = document.getElementById("rightColumn");
	var tmpNode = document.createElement( "div" );
	tmpNode.appendChild( activityCol.cloneNode( true ));
	var str = tmpNode.innerHTML;
	if (str.includes("You've completed 60 out of 60 possible actions so far today.")) { // completed daily activity
		// Daily limit reached
		dLR = true;
	}else{
		// Daily limit not yet reached
		dLR - false;
	}
}

/*
Page Validator
Checks which page we are currently loaded on.
*/
if(title == "http://www.karmalicity.com/get-points/"){
	// Gets the url of the next IMDb listing
	var urlListing = getListing(); 
	// Opens the listing on the current page
	if(urlListing.includes("null")){
		console.log(urlListing);
		// There currently is no IMDb listing
		// Implement a waiting period.
	}
	openNewURLInTheSameWindow(urlListing);
}else if(title.includes("listing")){
	// Check if the daily limit has been reached
	checkDailyLimit();
	if(dLR){
		// Disable the extension
		// Implement a method of turning off or disabling hte extension
		alert("You have reached your limit for Daily Actions!");
	}else{
		// Gets the target id
		targetId = getTargetId();
		// Sends the targetId to the extension
		sendDataToExtension(targetId);
		// Opens up the IMDb page
		document.querySelector(".btn-karma").click();
		console.log(targetId);
		
		/*
		Extension should now be on IMDb page
		*/
		
		// Allow the extension to gather data from IMDb page
		setTimeout(function(){
			getCreditsFromExtension("credits");
			setTimeout(function(){
				console.log(key);
				key = key.replace('key_','');
				document.getElementById("imdb-view-answer").setAttribute('value',key); // Fills credits
				document.querySelector(".btn-success").click(); // Click the button
			}, 1000);
		}, 4000);
	}
	
}else if(title.includes("imdb")){
	// Get the targetId from the extension
	setTimeout(function(){
		targetId = getIdFromExtension("target");
		setTimeout(function(){
			console.log(targetId);
			if (targetId == "Tips:" || targetId == undefined){
				// Running time listing
				obtainRunningTime();
				key = "key_" + key;
				sendDataToExtension(key);
			} else{
				// Credit listing
				obtainCredits(targetId);
				key = "key_" + key;
				sendDataToExtension(key);
			}
			close();
		}, 1000);
	}, 1000);
}else{
	// We are on some other page, do nothing
}
