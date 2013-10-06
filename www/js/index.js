document.addEventListener('deviceready', function() {
	// Change Section
	Zepto('a[href^="#"]').click(function() {
		switchSection(Zepto(this).attr('href'), Zepto(this).closest('section'));
		return false;
	});

	// Add Back Button to Home
	switch(device.platform) {
	case 'Android':
	case 'iOS':
		btnBack = Zepto('<a href="#back">Back</a>').click(function() {
			switchSection('#'+Zepto(this).closest('article').find('section').first().attr('id'));

			return false;
		});
		if (device.platform == 'Android') {
			btnBack.text('').addClass('glyphicon').addClass('glyphicon-chevron-left');
		}
		if (device.platform == 'iOS') {
			btnBack.prepend('<span class="glyphicon glyphicon-chevron-left"></span>');
			btnBack.addClass('btn').addClass('btn-default');
		}
		Zepto('section:not(:first-of-type) > header').prepend(btnBack);
	}

	// Login Form
	Zepto('#login form').submit(function() {
		var password = Zepto('#login form input[name="password"]').val();
		var username = Zepto('#login form input[name="username"]').val();
		if (username && password) Zepto.ajax({
			url: 'http://yodas.ws/fps/user', type:'POST', dataType:'text',
			data: { password:password, username:username },
//			headers: {'Origin':'mobile:'+device.uuid},
			complete:function(xhr) { switch (xhr.status) {
			case 200:
				switchSection('#homebase');
				break;
			case 401:
			case 418:
			default:
				alert('error ' + xhr.status);
				switchSection('#login');
				break;
			} }
		}); else console.log('not logged in');
		return false;
	});

	Zepto.ajax({
		url: 'http://yodas.ws/fps/user',
data:{uuid:'mobile:'+device.uuid},
		type:'POST', dataType:'json', //headers:{'Origin':'mobile:'+device.uuid},
		complete:function(xhr) {
			switch (xhr.status) {
			case 200:
				Zepto('article#homebase').show().find('section').first().show();
				break;
			case 401:
			case 418:
			default:
				Zepto('article#start, section#login').show();
				break;
			}
			Zepto('#loading').animate({opacity:0}, 'slow', 'ease-out', function() {
				Zepto(this).remove();
			});
		}
	});
}, false);

function switchSection(newSection, oldSection) {
	if (!oldSection)
		oldSection = Zepto('section').filter(function() {
			return Zepto(this).css('display') != 'none';
		});
	else if (typeof oldSection === 'string')
		oldSection = Zepto(oldSection);
	if (typeof newSection === 'string' && newSection == '#home')
		newSection = Zepto('#home > section').first();
	else if (typeof newSection === 'string')
		newSection = Zepto(newSection);
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
			}, 'fast', 'ease', function() {
				oldSection.animate({
					opacity:1
				}, 'slow').find('input[type="password"]').val('');
			});
			break;
		}
		return false;
	}
oldSection.closest('article').hide();
oldSection.hide();
newSection.closest('article').show();
newSection.show();
if (newSection.is('article'))
	newSection.find('section').first().show();
return;

	// Slide to New Section
	var direction = newSection.is(':first-of-type') ? 1 : -1;
	switch(device.platform) {
	case 'Android':
	case 'iOS':
		Zepto('body').css({
			overflow:'hidden',height:Zepto('window').height()
		});
		oldSection.css({
			position:'absolute',top:oldSection.offset().top+'px',width:'100%'
		});
		newSection.css({
			position:'absolute',top:-1*direction*Zepto(window).height()+'px',width:'100%'
		}).show();
		oldSection.animate({
			top:direction*Zepto(window).height()+'px'
		}, 'slow', 'ease', function() {
			Zepto(this).hide();
		});
		newSection.animate({
			top:'0px'
		}, 'slow', 'ease', function() {
			Zepto(this).css({position:''});
			oldSection.hide();
			Zepto('body').css({overflow:'auto',height:'auto'});
		});
		break;
	case 'Win32NT':
	case 'WinCE':
		break;
	}
	return false;
}