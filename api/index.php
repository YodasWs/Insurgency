<?php
header('Access-Control-Allow-Origin: *');
$url = $_SERVER['HTTP_X_REWRITE_URL'];
$url = substr($url, 4); // remove the temporary '/fps' directory
header('Content-type: application/json');
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
# preg_match("'/v[1-9]\d*(\.\d+)?/'", $url, $matches); // to grab and redirect to a specific version of the API
header('Content-type: text/html', true);
?>
<h1>Hello World</h1>
<div>More content to come</div>