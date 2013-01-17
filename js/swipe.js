var Toucher = {
    startX : 0,
    startY : 0,
    currentX : 0,
    currentY : 0,
    touchStart : function (event) {
        if (event.touches.length != 1) {
            return false;
        }
        Toucher.startX = event.touches[0].pageX;
        Toucher.startY = event.touches[0].pageY;
    },
    touchMove : function (event) {
        if (event.touches.length != 1) {
            Toucher.touchCancel();
        }
        Toucher.currentX = event.touches[0].pageX;
        Toucher.currentY = event.touches[0].pageY;
    },
    touchEnd : function (event) {
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
        alert(swipeDirection);
    },
    touchCancel : function (event) {
        Toucher.startX = Toucher.startY = Toucher.currentX = Toucher.currentY = 0;
    }
};

$(function () {
    $("#touchArea").bind('touchstart', Toucher.touchStart);
    $("#touchArea").bind('touchend', Toucher.touchEnd);
    $("#touchArea").bind('touchmove', Toucher.touchMove);
    $("#touchArea").bind('touchcancel', Toucher.touchCancel);
});
