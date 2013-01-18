/* SWIPE */

$(function () {
///////////////////////////////////////////////////////////////////

function caluculateAngle() {
	var X = startX-curX;
	var Y = curY-startY;
	var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); //the distance - rounded - in pixels
	var r = Math.atan2(Y,X); //angle in radians (Cartesian system)
	swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
	if ( swipeAngle < 0 ) { swipeAngle =  360 - Math.abs(swipeAngle); }
}
	
function determineSwipeDirection() {
	if ( (swipeAngle <= 45) && (swipeAngle >= 0) ) {
		swipeDirection = 'left';
	} else if ( (swipeAngle <= 360) && (swipeAngle >= 315) ) {
		swipeDirection = 'left';
	} else if ( (swipeAngle >= 135) && (swipeAngle <= 225) ) {
		swipeDirection = 'right';
	} else if ( (swipeAngle > 45) && (swipeAngle < 135) ) {
		swipeDirection = 'down';
	} else {
		swipeDirection = 'up';
	}
}

//$('#text-output').append('<p>Test 1</p>');

//ontouchstart="touchStart(event,'touchArea');" ontouchend="touchEnd(event);" ontouchmove="touchMove(event);" ontouchcancel="touchCancel(event);"

$("#touchArea").bind('touchStart', function () {
	$('#text-output').append('Touch Started.');
});

$("#touchArea").bind('touchEnd', function () {
	$('#text-output').append('Touch Ended.');
});

$("#touchArea").bind('touchMove', function () {
	$('#text-output').append('Touch Move.');
});

$("#touchArea").bind('touchCancel', function () {
	$('#text-output').append('Touch Cancelled.');
});

///////////////////////////////////////////////////////////////////
});