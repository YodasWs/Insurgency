// On document load, fire deviceready event
window.addEventListener('load', function() {
	// http://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
	var event = document.createEvent("HTMLEvents");
	event.initEvent('deviceready', true, true);
	event.eventName = 'deviceready';
	event.memo = {};
	document.dispatchEvent(event);
}, false);