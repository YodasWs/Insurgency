<?php
header('Access-Control-Allow-Origin: *');
$url = $_SERVER['HTTP_X_REWRITE_URL'];
$url = substr($url, 4); // remove the temporary '/fps' directory
if ($url == '/friends') {
   header('Content-type: application/json');
   echo json_encode(array(
      'test' => 'hello world',
   ));
   exit;
}
# preg_match("'/v[1-9]\d*(\.\d+)?/'", $url, $matches); // to grab and redirect to a specific version of the API
header('Content-type: text/html');
?>
<h1>Hello World</h1>
<div>More content to come</div>