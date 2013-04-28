<html>
<head>
	<title> Update Posts </title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<style type="text/css">
	.error {
		border-style:solid;
		border-color:#ff0000;
	}
	</style>
	<script type="text/javascript" src="http://static.readmecookie.com/blog/js/form.js"></script>
</head>
<body>

	<?php 
	session_start();
	if(isset($_SESSION['SESS_MEMBER_ID']) || (trim($_SESSION['SESS_MEMBER_ID']) != '')) { ?>
	<span style="color:green">Logged in... Welcome!</span>
	<form name="theform" id="theform" method="post"
	onsubmit="javascript:sendForm(); return false;">
		<label for="title">Title:</label>
			<input id="title" name="title"><br>
		<label for="">Permalink:</label>
			<input id="permalink" name="permalink"><br>
		<label for="content">Content:</label><br>
			<textarea id="content" name="content"></textarea><br>
		<label for="category">Category:</label>
			<input id="category" name="category"><br>
		<input type="submit" id="thesubmit" value="Send">
	</form>
	<?php } else echo '<span style="color:RED">NOT LOGGED IN! CANNOT EDIT POSTS</span>'; ?>
</body>
</html>