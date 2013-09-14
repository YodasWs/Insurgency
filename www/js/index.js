// for desktop testing
window.onerror = function(error) { console.log(error); };
if (device.platform == 'Chrome') device.platform = 'iOS';

function sendLogin(callback) {
	var username = prompt('Username');
	var password = prompt('Password');
	if (username && password) $.ajax('http://yodas.ws/fps/user', {
		password:password,username:username,statusCode:{
			200:function() { if (typeof callback === 'function') callback(); },
			401:function() { sendLogin(callback); },
			418:function() { alert('error'); }
		}
	}); else console.log('not logged in');
}

$(document).ready(function() {
	// TODO: Add iOS Back Button to Headers :-\
	if (device.platform == 'iOS') {
		$('article#home > section[data-role="content"]:not(:nth-child(1)) > header[data-role="header"]').prepend(
			'<a href="#home" data-role="button" data-icon="back" data-inline="true">Back</a>'
		);
		$('article#home > section[data-role="content"]:not(:nth-child(1)) a[data-role="button"]').buttonMarkup('refresh');
	}

	// TODO: Change "Page"
	$('a[href^="#"]').click(function() {
		$this = $(this);
//		if ($this.closest('article').is('#home')) // For phones with back buttons
//			history.pushState({page:$this.attr('href')}, null, $this.attr('href').substring(1));
	if ($($this.attr('href')).closest('article').attr('id') == 'home') {
		// Slide to New Section
		var oldSection = $this.closest('section');
		var newSection = $($this.attr('href'));
		if ($this.attr('href') == '#home') newSection = $('#home > section[data-role="content"]:first');
		oldSection.css({
			position:'absolute',top:oldSection.offset().top+'px'
		});
		newSection.css({
			position:'absolute',top:$(window).height()+'px'
		}).show();
		$('body').css('overflow','hidden');
		oldSection.animate({
			top:'-'+$(window).height()+'px'
		}, 'slow', function() {
			$(this).hide();
		});
		newSection.animate({
			top:'0px'
		}, 'slow', function() {
			$(this).css({position:''});
			oldSection.hide();
			$('body').css('overflow','');
		});
		return false;
	}
	if ($(this).attr('href') == '#mission') {
		$.get('http://yodas.ws/fps/user', {
		}, function(data) {
alert(JSON.stringify(data));
			if (data.error) {
				return;
			}
		}, 'json').fail(function(jqXHR) {
			if (jqXHR.status == '401') sendLogin(function() {
				$this.click();
			});
		});
	}
	switch(device.platform) {
	case 'iOS': case 'Android':
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
case 'iOS':
	$('a[data-role="button"][data-icon="back"]').attr('data-theme', 'b').buttonMarkup('refresh');
	$('link').last().after('<link rel="stylesheet" href="css/ios.css"/>');
	$('link').first().before('<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css"/>');
	break;
case 'Android':
default:
	$('link').last().after('<link rel="stylesheet" href="css/android.css"/>');
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