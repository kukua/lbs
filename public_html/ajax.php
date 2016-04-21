<?php

require_once("./sensordata.php");

if ($_POST) {
	if (isset($_POST["type"])) {
		Sensordata::get();
	}
}
exit;
