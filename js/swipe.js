var Toucher = {
    startX : 0,
    startY : 0,
    currentX : 0,
    currentY : 0,
    startTime : 0,
    currentTime : 0
    touchStart : function (event) {
		event.preventDefault();
		Toucher.fingerCount = event.touches.length;
		
        if (Toucher.fingerCount != 1) {
            return false;
        }
        Toucher.startX = event.touches[0].pageX;
        Toucher.startY = event.touches[0].pageY;
		Toucher.startTime = +new Date;
    },
    touchMove : function (event) {
		event.preventDefault();
        if (event.touches.length != 1) {
            Toucher.touchCancel();
        }
        Toucher.currentX = event.touches[0].pageX;
        Toucher.currentY = event.touches[0].pageY;
        Toucher.currentTime = +new Date;
    },
    touchEnd : function (event) {
		if (Toucher.fingerCount != 1 || Toucher.currentX == 0) {
            return false;
        }
		event.preventDefault();
        var X = Toucher.startX-Toucher.currentX;
		var Y = Toucher.currentY-Toucher.startY;
		var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); //the distance - rounded - in pixels
		var r = Math.atan2(Y,X); //angle in radians (Cartesian system)
		var swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
		if ( swipeAngle < 0 ) { 
            swipeAngle =  360 - Math.abs(swipeAngle);
        }
		
        var swipeDirection = '';
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
		var time = Toucher.currentTime - Toucher.startTime;
		// $("#textOutput").text('swipeDirection: ' + swipeDirection + '; event.touches.length: ' + event.touches.length + '; ');
        $("#textOutput").text('you swiped ' + swipeDirection + ' at speed of ' + (Z/(time/1000)) + ' pixels per second');
		Toucher.touchCancel();
    },
    touchCancel : function (event) {
		Toucher.startX = Toucher.startY = Toucher.currentX = Toucher.currentY = Toucher.startTime = Toucher.currentTime = 0;
    }
};

$(function () {
	
	document.getElementById('touchArea').ontouchstart = Toucher.touchStart;
	document.getElementById('touchArea').ontouchend = Toucher.touchEnd;
	document.getElementById('touchArea').ontouchmove = Toucher.touchMove;
	document.getElementById('touchArea').ontouchcancel = Toucher.touchCancel;
	
    $("#leftButton").click(function () {
        $("#textOutput").text('Click Left');
    });
    $("#rightButton").click(function () {
        $("#textOutput").text('Click Right');
    });
    
});
