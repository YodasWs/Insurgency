<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
parse_str(file_get_contents('php://input'), $_POST);

// Require User Authentication
function throw401() {
	header('HTTP/1.1 401 Unauthorized');
	header('WWW-Authenticate: Digest realm="Realm",qop="auth",nonce="'.uniqid().'",opaque="'.md5('Realm').'"');
	echo json_encode(array(
		'error' => 'Authorized Users Only',
	));
	exit;
}

// For Unauthorized Users
function throw418() {
	header('HTTP/1.1 418 I\'m a teapot');
	echo json_encode(array(
		'error' => 'No coffee here',
	));
	exit;
}

// function to parse the http auth header, http://php.net/manual/en/features.http-auth.php
function http_digest_parse($txt) {
	// protect against missing data
	$needed_parts = array('nonce'=>1, 'nc'=>1, 'cnonce'=>1, 'qop'=>1, 'username'=>1, 'uri'=>1, 'response'=>1);
	$data = array();
	$keys = implode('|', array_keys($needed_parts));

	preg_match_all('@(' . $keys . ')=(?:([\'"])([^\2]+?)\2|([^\s,]+))@', $txt, $matches, PREG_SET_ORDER);

	foreach ($matches as $m) {
		$data[$m[1]] = $m[3] ? $m[3] : $m[4];
		unset($needed_parts[$m[1]]);
	}

	return $needed_parts ? false : $data;
}

#if (strpos($_SERVER['HTTP_ORIGIN'], 'mobile:') !== 0) throw418();
#header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");

require_once('users.php');
$url = $_SERVER['HTTP_X_REWRITE_URL'];
$url = substr($url, 4); // remove the temporary '/fps' directory

switch($url) {
case '/user': // Login
	if (Users::joined($_SERVER['HTTP_ORIGIN'])) {
		header('HTTP/1.1 200 OK');
		echo json_encode(array('username' => Users::joined($_SERVER['HTTP_ORIGIN'])));
		exit;
#	} else if (Users::joined($_POST['uuid'])) {
#		header('HTTP/1.1 200 OK');
#		echo json_encode(array('username' => Users::joined($_POST['uuid'])));
#		exit;
	} else if (!empty($_POST)) {
		if (!Users::joined($_POST['uuid'])) {
			if (!Users::authorized($_POST['username'])) throw418();
			if ($_POST['password'] != Users::getPassword($_POST['username'])) throw418();
		} else $_POST['username'] = Users::joined($_POST['uuid']);
#		$_SESSION['authFPS'] = uniqid(rand(100,999));
	} else if (empty($_SESSION['authFPS'])) throw418();

	echo json_encode(array('username' => $_POST['username']));
	exit;
}

# preg_match("'/v[1-9]\d*(\.\d+)?/'", $url, $matches); // to grab and redirect to a specific version of the API

if ($url == '/friends') {
	echo json_encode(array(
		'test' => 'hello world',
	));
	exit;
} else if (strpos($url, '/keys') === 0) {
	require_once('keys.php');
	if (strpos($url, '/keys/scoreoid') === 0)
		echo json_encode($scoreoid);
	else {
		header('HTTP/1.1 300 Multiple Choices');
		echo json_encode(array(
			'error' => 'Please specify your desired API.',
			'APIs' => array(
				'scoreoid',
			),
		));
	}
	exit;
}
header('Content-type: text/html', true);
?>
<h1>Hello World</h1>
<div>More content to come</div>