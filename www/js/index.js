window.onerror = function(error) { console.log(error); };
var ajax = {
	get: function(url, callback) {
		alert('ajax.get looking at ' + url);
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState != 4) return false;
			var data = null;
			if (this.status == 200) {
				data = this.responseText;
				var type = this.getResponseHeader('Content-type');
				if (type == 'application/json')
					data = eval('(' + data + ')');
			}
			if (this.status >= 200 && this.status < 300) {
				if (typeof callback == 'function')
					callback(data);
			} else alert('ajax.get returned status ' + this.status);
		};
		xhr.open('GET', url, true);
//		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.send(null);
	},
	post: function(url, data, callback) {
	}
};

(function() {
	document.addEventListener('deviceready', function() {
		alert('Device Ready =)');
		try {
			ajax.get('http://yodas.ws/fps/friends', function(data) {
				alert(JSON.stringify(data));
			});
		} catch(e) {
			alert(e);
		}
	}, false);
})();