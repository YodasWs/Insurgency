var ajax = {
	this.get = function(url, callback) {
		console.log('ajax.get looking at ' + url);
		this.post(url, null, callback);
	}
	this.post = function(url, data, callback) {
		var xhr = XMLHttpRequest(),
		xhr.open('post', url, true);
		xhr.send(data);
		xhr.onreadystatechange = function() {
			console.log('Ajax response ready state = ' + this.readyState);
			if (this.readyState != 4) return false;
			var type = this.getResponseHeader('Content-type');
			var data = this.responseText;
			if (type == 'application/json')
				data = eval('(' + data + ')');
			if (typeof callback == 'function')
				callback(data);
		}
	}
};

console.log('index.js loaded');

(function() {
	document.addEventListener('deviceready', function() {
		console.log('Device Ready =)');
		ajax.get('http://fps.yodas.ws/friends', function(data) {
			console.log('Response from ajax received');
			alert(JSON.stringify(data));
		});
	}, false);
})();
