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

	if (swapWhich == 1){
		mCurrentIndex += 1
	} else if (swapWhich == 2) {
		mCurrentIndex -= 1
	} else if (swapWhich == 3){
		mCurrentIndex += 1
	}

// ABOVE IN FUNCTION: turns on and off swapWhich to be able to swap the photo and simultaneously have a timer that swaps the photo.

	if (mCurrentIndex >= mImages.length){
		mCurrentIndex = 0;
	}
	if (mCurrentIndex < 0){
		mCurrentIndex = mImages.length;
	}

	document.getElementById('photo').src = mImages[mCurrentIndex].img;


	var nam = document.getElementsByClassName('name');
	nam[0].innerHTML = 'Name: '+ mImages[mCurrentIndex].name;
	
	var pwr = document.getElementsByClassName('powers');
	pwr[0].innerHTML = 'Powers: '+ mImages[mCurrentIndex].powers;

	var job = document.getElementsByClassName('occupation');
	job[0].innerHTML = 'Occupation: '+ mImages[mCurrentIndex].occupation;

	mLastFrameTime = 0

	swapWhich = 3;

	console.log('swapped.');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrieved JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'https://api.npoint.io/653347947d31070d42c6';

//Converts data from Json file into readable text
function fetchJson() {
	mRequest.onreadystatechange = function() {
		console.log("on ready state change");
		if (this.readyState == 4 && this.status == 200) {
			mJson = JSON.parse(mRequest.responseText);
			iterateJSON(mJson);
		}
	}
	mRequest.open("GET", mUrl, true);
	mRequest.send();
		
}

function iterateJSON(mJson) {

	//Set that index of mImages equal to a new GalleryImage object Access the name attribute using dot notation and set it equal to mJson.images[x].imgName Repeat b for powers, occupation, and img/imgPath
	for (x = 0; x < mJson.images.length; x++) {
		mImages[x] = new GalleryImage();
		mImages[x].name = mJson.images[x].imgName;
		mImages[x].powers = mJson.images[x].powers;
		mImages[x].occupation = mJson.images[x].occupation;
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

var swapWhich;

$(document).ready( function() {

	$('#nextPhoto').position({
		my: 'right bottom',
		at: 'right bottom',
		of: '#nav'
	})
	
	const urlParams = new URLSearchParams(window.location.search)

	for (const [key, value] of urlParams) {
		console.log(`${key}:${Value}`)
		mUrl = value
	}

	if (mUrl == undefined) {
		mUrl = 'https://api.npoint.io/653347947d31070d42c6';
	}
	
	fetchJson();

	$("#nextPhoto").click(function () {
		console.log('Fast forward')
		swapWhich = 1
		swapPhoto()
    });

	$("#prevPhoto").click(function () {
		console.log('rewind')
		swapWhich = 2
		swapPhoto()
    });
});

window.addEventListener('load', function() {	
	
	console.log('window loaded');

}, false);
//Assigning data from JSON list ot variables that will be used in our slideshow
function GalleryImage() {
	var name;
	var powers;
	var occupation;
	var img;
	//implement me as an object to hold the following data about an image:
	//1. name where photo was taken
	//2. powers of person in photo
	//3. what the person in the photo does for a living
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



