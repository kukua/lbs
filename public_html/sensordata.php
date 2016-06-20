<?php

require_once("./vendor/autoload.php");

class Sensordata {

	/**
	 * Get request
	 *
	 * @access public
	 * @return void
	 */
	public static function get() {
		$data = [
			"region"		=> 7,
			"measurement"	=> $_POST["type"],
			"dateFrom"		=> $_POST["dateFrom"],
			"dateTo"		=> $_POST["dateTo"],
			"interval"		=> $_POST["interval"]
		];

		$result = self::call($data);
		echo $result;
		exit;
	}

	/**
	 * @access protected
	 * @return Curl::response
	 */
	public static function call($data = Array()) {
		$curl = new \Curl\Curl();
		$curl->post("https://dashboard.kukua.cc/api/sensordata/get",
			$data
		);

		if ($curl->error) {
			return $curl->errorMessage;
		}
		return $curl->response;
	}
}
