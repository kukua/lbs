<?php

require_once("./sensordata.php");

if ($_POST) {
	if (isset($_POST["country"])) {
		Sensordata::get();
	}
}
exit;
