// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
function swapPhoto() {
	if (mCurrentIndex >= mImages.length){
		mCurrentIndex = 0;
	}
	if (mCurrentIndex < 0){
		mCurrentIndex = mImages.length;
	}

	document.getElementById('photo').src = mImages[mCurrentIndex].img;


	var loc = document.getElementsByClassName('location');
	loc[0].innerHTML = 'location: '+ mImages[mCurrentIndex].location;
	
	var des = document.getElementsByClassName('description');
	des[0].innerHTML = 'description: '+ mImages[mCurrentIndex].description;

	var dt = document.getElementsByClassName('date');
	dt[0].innerHTML = 'date: '+ mImages[mCurrentIndex].date;

	mLastFrameTime = 0
	mCurrentIndex += 1
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'https://api.npoint.io/018407a7e31452e70f03';

//Converts data from Json file into readable text
function fetchJson() {
	mRequest.onreadystatechange = function() {
		console.log("on ready state change");
		if (this.readyState == 4 && this.status == 200) {
			mJson = JSON.parse(mRequest.responseText);
			console.log("What");
			iterateJSON(mJson);
		}
	}
	mRequest.open("GET", mUrl, true);
	mRequest.send();
		
}

function iterateJSON(mJson) {

	//Set that index of mImages equal to a new GalleryImage object Access the location attribute using dot notation and set it equal to mJson.images[x].imgLocation Repeat b for description, date, and img/imgPath
	for (x = 0; x < mJson.images.length; x++) {
		mImages[x] = new GalleryImage();
		mImages[x].location = mJson.images[x].imgLocation;
		mImages[x].description = mJson.images[x].description;
		mImages[x].date = mJson.images[x].date;
		mImages[x].img = mJson.images[x].imgPath;
	
		
	}
}


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	//$('.details').eq(0).hide();
	fetchJson();
});

window.addEventListener('load', function() {	
	
	console.log('window loaded');

}, false);
//Assigning data from JSON list ot variables that will be used in our slideshow
function GalleryImage() {
	var location;
	var description;
	var date;
	var img;
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
}

function rotSwitcher() {
	if ($( ".moreIndicator" ).hasClass( "rot90" )){
		$( ".moreIndicator" ).addClass( "rot270" );
		$( ".moreIndicator" ).removeClass( "rot90" );
		
	}
	else {
		$( ".moreIndicator" ).addClass( "rot90" );
		$( ".moreIndicator" ).removeClass( "rot270" );

  
	}
	$( ".details" ).slideToggle( "slow" );
}

$("#nextPhoto").click(function() {
  console.log( "Handler for .click() called." );
  mCurrentIndex += 1;
});

$("#prevPhoto").click(
	mCurrentIndex -= 1
);


