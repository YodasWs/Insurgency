var ajax = {
	get: function(url, callback) {
		alert('ajax.get looking at ' + url);
		var xhr = XMLHttpRequest();
		xhr.onreadystatechange = function() {
			alert('Ajax response ready state = ' + this.readyState);
			if (this.readyState != 4) return false;
			var data = null;
			if (this.status == 200) {
				var type = this.getResponseHeader('Content-type');
				data = this.responseText;
				if (type == 'application/json')
					data = eval('(' + data + ')');
			}
			if (typeof callback == 'function')
				callback(data);
		}
		xhr.open('GET', url, true);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.send(null);
	},
	post: function(url, data, callback) {
	}
};

document.write('<div>hello from index.js</div>');

(function() {
	document.addEventListener('deviceready', function() {
		console.log('Device Ready =)');
		ajax.get('http://fps.yodas.ws/friends', function(data) {
			console.log('Response from ajax received');
			alert(JSON.stringify(data));
		});
	}, false);
})();
