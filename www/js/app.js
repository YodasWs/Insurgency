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

	// Add Cross-Device Bootstrap Styling
	Zepto('input[type="submit"]').addClass('btn').addClass('btn-default');
});