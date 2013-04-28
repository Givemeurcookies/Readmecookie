<?php session_start(); ?>
<html>
<head>
	<title> Login! </title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<style type="text/css">
	.error {
		border-style:solid;
		border-color:#ff0000;
	}
	</style>
	<script type="text/javascript" src="static/class.js"></script>
	<script type="text/javascript"> 


	</script>
</head>
<body>
	<?php
	//Check whether the session variable SESS_MEMBER_ID is present or not
	if(!isset($_SESSION['SESS_MEMBER_ID']) || (trim($_SESSION['SESS_MEMBER_ID']) == '')) {
		echo '<span style="color:RED">NOT LOGGED IN!</span>';
	} else echo '<span style="color:GREEN">LOGGED IN!</span>';

	?>
	<form action="php/login.php" method="post">
		<label for="username">Login:</label>
		<input type="text" name="username" id="username">
		<label for="password">Password:</label>
		<input type="text" name="password" id="password">
		<br>
		<input type="submit" name="submit" value="login">
	</form>
	<form action="php/login.php"><input type="submit" name="submit" value="logout"></form>
</body>
</html>