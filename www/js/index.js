window.onerror = function(error) { console.log(error); };

$(document).ready(function() {
	$('a[href^="#"]').click(function() {
		$this = $(this);
		$('article:visible').fadeOut('slow', function() {
			$($this.attr('href')).fadeIn('slow');
		});
		return false;
	});
});

(function() { document.addEventListener('deviceready', function() {
switch(device.platform) {
case 'iOS':
case 'Android':
case 'Chrome':
	$('link').first().before('<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css"/>');
	break;
case 'WinCE':
case 'Win32NT':
	$('link').first().after('<link rel="stylesheet" href="css/windowsphone.css"/>');
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