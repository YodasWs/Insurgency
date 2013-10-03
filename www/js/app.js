document.addEventListener('deviceready', function() {
	// Load device-specific styling
	switch(device.platform) {
	case 'WinCE': case 'Win32NT':
		Zepto('link').first().after('<link rel="stylesheet" href="css/windowsphone.css"/>');
		break;
	case 'iOS':
		Zepto('link').last().after('<link rel="stylesheet" href="css/ios.css"/>');
		break;
	case 'Android':
	default:
		Zepto('link').last().after('<link rel="stylesheet" href="css/android.css"/>');
		break;
	}

	// Add Back Button to Home
	switch(device.platform) {
	case 'Android':
	case 'iOS':
		Zepto('section:not(:first-of-type) > header').prepend('<a href="#home">Back</a>');
		if (device.platform == 'Android')
			Zepto('section > header > a:first-child').addClass('glyphicon').addClass('glyphicon-chevron-left');
		break;
	}

	// Add Cross-Device Bootstrap Styling
	Zepto('input[type="submit"]').addClass('btn').addClass('btn-default');

	Zepto('#loading').animate({opacity:0}, 'slow', 'ease-out', function() {
		Zepto(this).remove();
	});
});