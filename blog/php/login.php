<?php
	
	//
	// A few fixes might be:
	// - Prevent session hijaking
	// - Add captcha
	//

	if (!$_POST && !$_GET) exit("Not allowed to access directly");

	session_start();
	// Checks wheter the user is already logged in
	if (isset($_SESSION['SESS_MEMBER_ID'])){
		if ($_GET['submit'] === 'logout') {
			unset($_SESSION['SESS_MEMBER_ID']);
			exit("Succesfully logged out");
		} else exit("Already logged in...");
	}

	if($_POST['submit'] === 'login') {
		// DB.php is not included before it's absolutely needed
		require_once("_DB.php");
		$DB = new DB;
		$user = $_POST['username'];
		$pass = $_POST['password'];

		// DB automatically escapes the entries
		// login returns an absolute TRUE (note ===)
		// If something unexpected happens it should be handled in the DB class
		$result = $DB->login($user,$pass);
		if($result === true) {
			echo "LOGGIN IN!";
			$_SESSION['SESS_MEMBER_ID'] = 1;
		} else {
			echo "Wrong credentials";
		}
	}
?>