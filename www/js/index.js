var ajax = {
	this.get = function(url, callback) {
		this.post(url, null, callback);
	}
	this.post = function(url, data, callback) {
		var xhr = XMLHttpRequest(),
		xhr.open('post', url, true);
		xhr.send(data);
		xhr.onreadystatechange = function() {
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

(function() {
	document.addEventListener('deviceready', function() {
		ajax.get('http://fps.yodas.ws/friends', function(data) {
			alert(JSON.stringify(data));
		});
	}, false);
})();
