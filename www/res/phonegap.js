// String.trim, JavaScript v1.8.1
// Extended by Sam Grundman on 5 Aug 2013
String.prototype.trim = function(chars) {
	return this.replace(new RegExp('^[' + (chars || '\\s') + ']+|[' + (chars || '\\s') + ']+$', 'g'), '');
};

// On document load, fire deviceready event
window.addEventListener('load', function() {
	// http://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
	var event = document.createEvent("HTMLEvents");
	event.initEvent('deviceready', true, true);
	event.eventName = 'deviceready';
	event.memo = {};
	document.dispatchEvent(event);
}, false);

// console
if (!window.console) var console = {
	log:function() {}
};

// device, http://docs.phonegap.com/en/3.0.0/cordova_device_device.md.html#Device
var device = {
	name:(function() {
		return (navigator.userAgent.match(/\((.*?;)?\s*(.*?(windows|linux).*?)\)/i))[2].trim();
	})(),
	platform:(function() {
		return (navigator.userAgent.match(/\w*(IE|Chrome|Safari|iPod|iPhone|Android)\w*/))[0].trim();
	})(),
	version:(function() {
		return (navigator.userAgent.match(/(IE|Chrome|Safari|Firefox)\/?\s*([\d\.]*)/))[2].trim();
	})(),
	uuid:'do-not-check',
	cordova:'sam-testing'
};
device.model = device.name;
console.log('userAgent: ' + navigator.userAgent);
console.log('device: ' + JSON.stringify(device));

// geolocation,
http://docs.phonegap.com/en/3.0.0/cordova_geolocation_geolocation.md.html#Geolocation
if (!window.geolocation) {
	var geolocation = {};
	if (navigator.geolocation)
		geolocation = navigator.geolocation;
	else geolocation = {
		getCurrentPosition:function(success,error,options) {
			if (typeof error === 'function')
				error({code:1,message:'Position Unavailable on this device'});
		},
		watchPosition:function(success,error,options) {
			if (typeof error === 'function')
				error({code:1,message:'Position Unavailable on this device'});
			return 'faulty';
		},
		clearPosition:function(){}
	};
}
geolocation.getCurrentPosition(function(position) {
	console.log('geolocation: ' + position.latitude + ', ' + position.longitude);
}, function(error) {
	console.log('geolocation: ' + error.message);
});

// camera, http://docs.phonegap.com/en/3.0.0/cordova_camera_camera.md.html#Camera
camera = {
	getPicture:function() {
	},
	cleanup:function() {
	}
};

// Augmented Reality: http://phonegap.com/blog/2012/10/09/wikitude-provides-users-with-augmented-reality-plugin/

// For Android Development: http://phonegap-pain-points.appspot.com/#/