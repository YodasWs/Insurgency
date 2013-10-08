<?php require_once('mysql.php');
mysql::query("DELETE FROM user_area WHERE modified_date < SUBDATE(NOW(), 'INTERVAL 5 minute')");
?>