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
	if (node == null) {
		// The page does not have a time setActive, default to zero
		key = "0";
		console.log("Running time: " + key);
	} else {
		// Convert the node to a string
		var tmpNode = document.createElement( "div" );
		tmpNode.appendChild( node.cloneNode( true ) );
		var str = tmpNode.innerHTML;
		// Obtain the running time from the string
		var innerHTML = str.substr(0, str.indexOf('min'));
		var last5 = innerHTML.slice(-5);
		var time = last5.replace(/h/g, '');
		console.log("Time: " + time);
		// At this point we will have something like "1 30"
		var timeArray = time.split(" ");
		console.log("Time Array: " + timeArray);
		if (timeArray[0] == 0) { // Time is less than one hour
			key = timeArray[3];
			console.log("Minutes: " + key);
			return key;
		} else {
			key = parseInt(timeArray[0])*60+parseInt(timeArray[1]);
			console.log("Minutes: " + key);
			return key;
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
	if(target == "Actor"){
		targetId = "filmo-head-actor";
	}else if(target == "Actress"){
		targetId = "filmo-head-actress";
	}else if(target == "Animation Department"){
		targetId = "filmo-head-animation_department";
	}else if(target == "Archive Footage"){
		targetId = "filmo-head-archive_footage";
	}else if(target == "Art Department"){
		targetId = "filmo-head-art_department";
	}else if(target == "Art Director"){
		targetId = "filmo-head-art_director";
	}else if(target == "Camera And Electrical Department"){
		targetId = "filmo-head-camera_department";
	}else if(target == "Casting Department"){
		targetId = "filmo-head-casting_department";
	}else if(target == "Casting Director"){
		targetId = "filmo-head-casting_director";
	}else if(target == "Cinematographer"){
		targetId = "filmo-head-cinematographer";
	}else if(target == "Composer"){
		targetId = "filmo-head-composer";
	}else if(target == "Costume And Wardrobe Department"){
		targetId = "filmo-head-costume_department";
	}else if(target == "Costume Designer"){
		targetId = "filmo-head-costume_designer";
	}else if(target == "Director"){
		targetId = "filmo-head-director";
	}else if(target == "Editor"){
		targetId = "filmo-head-editor";
	}else if(target == "Location Management"){
		targetId = "filmo-head-location_management";
	}else if(target == "Miscellaneous Crew"){
		targetId = "filmo-head-miscellaneous";
	}else if(target == "Music Department"){
		targetId = "filmo-head-music_department";
	}else if(target == "Producer"){
		targetId = "filmo-head-producer";
	}else if(target == "Production Designer"){
		targetId = "filmo-head-production_designer";
	}else if(target == "Production Manager"){
		targetId = "filmo-head-production_manager";
	}else if(target == "Second Unit Director Or Assistant Director"){
		targetId = "filmo-head-assistant_director";
	}else if(target == "Self"){
		targetId = "filmo-head-self";
	}else if(target == "Set Decorator"){
		targetId = "filmo-head-set_decorator";
	}else if(target == "Sound Department"){
		targetId = "filmo-head-sound_department";
	}else if(target == "Soundtrack"){
		targetId = "filmo-head-soundtrack";
	}else if(target == "Special Effects"){
		targetId = "filmo-head-special_effects";
	}else if(target == "Stunts"){
		targetId = "filmo-head-stunts";
	}else if(target == "Thanks"){
		targetId = "filmo-head-thanks";
	}else if(target == "Visual Effects"){
		targetId = "filmo-head-visual_effects";
	}else if(target == "Writer"){
		targetId = "filmo-head-writer";
	}else if(target == "Tips:"){
		// The listing is a running time listing
		targetId = ("running_time");
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

/*
Page Validator
Checks which page we are currently loaded on.
*/
if(title == "http://www.karmalicity.com/get-points/"){
	// Check if the daily limit has been reached.
	if(document.getElementById("limit-reached-container")){
		var w = window.open('','','width=350,height=300')
		w.document.title = 'Karmalicity Assistant Helper';
		w.document.write("<title>KA Helper</title><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>body { margin: 0; }ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: #788894;}li { color: white; text-align: center; text-decoration: none;}div {border-radius: 25px;color: #3c763d;background-color: #dff0d8;width: 300px;border: 25px #d6e9c6;padding: 1px;margin: 20px;text-align: center;}</style></head><body><ul> <li><h1>Karmalicity Assistant</h1></ul><div><h2>Success!</h2></div><h3 style='margin: 10;'>We're all done, you have reached your daily limit.  You may now exit Karmalicity.  See you again tomorrow!</h3></body>")
		w.focus()
	}else{
		// Gets the url of the next IMDb listing
		var urlListing; 
		setTimeout(function(){
			urlListing = getListing();
		
			console.log(urlListing);
			// Opens the listing on the current page
			if(urlListing.includes("null")){
				// There currently is no IMDb listing
				// Implement a waiting period.
				var w = window.open('','','width=400,height=250')
				w.document.write("<title>KA Helper</title><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style>body { margin: 0; }ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: #788894;}li { color: white; text-align: center; text-decoration: none;}</style></head><body><ul> <li><h1>Karmalicity Assistant</h1></ul><h2 style='color: #2e6c80; margin: 10;'>One moment please! <i class='fa fa-spinner fa-pulse'></i></h2><h3 style='margin: 10;'>Right now we're waiting for Karmalicity to load some more awesome listings.&nbsp; Thank you for your patience!&nbsp; We'll refresh the listings in <span style='color: #d83a3a' id='countdowntimer'>30</span> seconds.</h3><script type='text/javascript'> var timeleft = 30; var downloadTimer = setInterval(function(){ timeleft--; document.getElementById('countdowntimer').textContent = timeleft; if(timeleft <= 0) clearInterval(downloadTimer); },1000);</script></body>")
				w.focus()
				setTimeout(function(){
					w.close();
				}, 30000);
				setTimeout(function(){
				   window.location.reload(1);
				}, 30000);
			}else{
				openNewURLInTheSameWindow(urlListing);
			}
		}, 500);
	}
}else if(title.includes("listing")){
	// Gets the target id
	targetId = getTargetId();
	// Sends the targetId to the extension
	sendDataToExtension(targetId);
	console.log(targetId);
	// Opens up the IMDb page
	setTimeout(function(){
		document.querySelector(".btn-karma").click();
	}, 500);
	
	/*
	Extension should now be on IMDb page
	*/
	
	// Allow the extension to gather data from IMDb page
	setTimeout(function(){
		getCreditsFromExtension("submission");
		setTimeout(function(){
			console.log("Key: " + key);
			key = key.replace('key_','');
			document.getElementById("imdb-view-answer").setAttribute('value',key); // Fills credits
			document.querySelector(".btn-success").click(); // Click the button
		}, 3000);
	}, 5000);
	
	
}else if(title.includes("imdb")){
	// Get the targetId from the extension
	setTimeout(function(){
		targetId = getIdFromExtension("target");
		setTimeout(function(){
			console.log("TargetId is: " + targetId);
			console.log("->" + targetId + "<-");
			if (targetId == "running_time" || targetId == undefined || targetId == ""){
				// Running time listing
				console.log("Running time listing");
				obtainRunningTime();
				key = "key_" + key;
				console.log("Key: " + key);
				sendDataToExtension(key);
			} else{
				// Credit listing
				console.log("Credit listing");
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
