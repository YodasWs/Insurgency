// for desktop testing
window.onerror = function(error) { console.log(error); };
if (device.platform == 'Chrome') device.platform = 'Android';

function switchSection(newSection, oldSection) {
	if (!oldSection)
		oldSection = $('section[data-role="content"]:visible').first();
	else if (typeof oldSection === 'string')
		oldSection = $(oldSection);
//	if (oldSection.closest('article').is('#home')) // For phones with back buttons
//		history.pushState({page:$this.attr('href')}, null, $this.attr('href').substring(1));
	if (typeof newSection === 'string' && newSection == '#home')
		newSection = $('#home > section[data-role="content"]:first');
	else if (typeof newSection === 'string')
		newSection = $('section' + newSection);
	else if (typeof newSection !== 'object' || typeof newSection.closest !== 'function' || newSection.closest('article').attr('id') != 'home')
		return false;

	// Move to Same Section ?
	if (oldSection.attr('id') == newSection.attr('id')) {
		switch(device.platform) {
		case 'WinCE': case 'Win32NT':
			break;
		case 'iOS': case 'Android':
			oldSection.animate({
				opacity:0
			}, 'fast', function() {
				oldSection.animate({
					opacity:1
				}, 'slow').find('input[type="password"]').val('');
			});
			break;
		}
		return false;
	}

	// Slide to New Section
//	switch(device.platform) {
//	case 'iOS': case 'Android':
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
			$('body').css({overflow:''});
		});
//		break;
//	case 'WinCE': case 'Win32NT':
//		break;
//	}
	return false;
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
	if ($($(this).attr('href')).closest('article').is(':visible'))
		return switchSection($(this).attr('href'), $(this).closest('section'));
	if ($(this).attr('href') == '#mission') {
		$.get('http://yodas.ws/fps/user', {
		}, function(data) {
alert(JSON.stringify(data));
			if (data.error) {
				return;
			}
		}, 'json');
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

	var sendLogin = function(callback) {
		var password = $('#login form input[name="password"]').val();
		var username = $('#login form input[name="username"]').val();
		if (username && password) $.ajax('http://yodas.ws/fps/user', {
			data: { password:password, username:username },
			type:'POST',crossDomain:true,dataType:'jsonp',
			statusCode:{
				200:function(data) {
					if (typeof callback === 'function') callback();
				},
				401:function() {
					alert('error 401');
					switchSection('#login');
//					sendLogin(callback);
				},
				418:function() {
					alert('error 418');
					switchSection('#login');
				}
			}
		}); else console.log('not logged in');
	};
	// Login Form
	$('#login form').submit(function() {
		sendLogin(function() {
			switchSection('#home');
		});
		return false;
	});
});
alert(JSON.stringify(device));

/*
//(function() {
$(document).ready(function() {
document.addEventListener('deviceready', function() {
alert('Device Ready =)');
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
	try {
		$.get('http://yodas.ws/fps/friends', function(data) {
			alert(JSON.stringify(data));
		}, 'json');
	} catch(e) {
		alert(e);
	}

//*/
//}, false);
//});
//})();