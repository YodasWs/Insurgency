window.onerror = function(error) { console.log(error); };

$(document).ready(function() {
	// TODO: Change "Page"
	$('a[href^="#"]').click(function() {
		$this = $(this);
	switch(device.platform) {
	case 'iOS': case 'Android':
	case 'Chrome':
		$('article:visible').fadeOut('slow', function() {
			$($this.attr('href')).fadeIn('slow');
		});
		break;
	case 'WinCE': case 'Win32NT':
		break;
	}
		return false;
	});
});

(function() { document.addEventListener('deviceready', function() {
// Load device-specific styling
switch(device.platform) {
case 'WinCE': case 'Win32NT':
	$('link').first().after('<link rel="stylesheet" href="css/windowsphone.css"/>');
	break;
case 'iOS': case 'Android':
case 'Chrome': // for desktop testing
default:
	$('link').first().before('<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css"/>');
	break;
}
/*
	alert('Device Ready =)');
	try {
		$.get('http://yodas.ws/fps/friends', function(data) {
			alert(JSON.stringify(data));
		}, 'json');
	} catch(e) {
		alert(e);
	}

//*/
}, false);})();