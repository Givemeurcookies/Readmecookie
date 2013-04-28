<?php
	require_once("_DB.php");

	$DB = new DB;

	// Intentionally not secure against HTML injections!
	$result = $DB->insert(array(
			"Title"   => $_POST['title'],
			"pubDate" => $date,
			"URL"     => $_POST['permalink'],
			"Content" => $_POST['content'],
			"Category"=> $_POST['category']
	));
	// Gives out various error codes
	// Error 62 = Duplicate
	// Improvement: Add more complex error handling
	// i.e handling error 62 incl. the field with a duplicate
	// Second improvement, include more alternatives (right now it lacks a few common error messages)
	switch ((string)$result) {
		case "0":
			echo '{"status":0,"error":1}';
			break;
		case "1":
			echo '{"status":1,"error":0}';
			break;
		case "Dup":
			echo '{"status":0,"error":62}';
			break;
		default:
			echo ('{"status":0,"error":"'.$result.'"}');
			break;
	}
?>