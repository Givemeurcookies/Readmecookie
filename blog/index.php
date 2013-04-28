<?php 
require_once 'Twig/Autoloader.php';
require_once 'php/_DB.php';

Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem('_templates/');
$twig = new Twig_Environment($loader, array(
    'auto_reload' => true
));

function category_colors($input_string){
	$func_array = array(
			'code' 	 		=> 'a9e840', // Green
			'updates'		=> 'fc2d74', // Violet
			'media'  		=> '6ad4e3', // Blue
			'uncategorized' => '7c7a66'  // Gray
	);
	if (isset($func_array[$input_string])) {
		return ($func_array[$input_string]);
	} else return ('7c7a66');
}

$posts = array();

//$rss = simplexml_load_file("_posts/2013/posts.xml");
$icons = file_get_contents("_xml/svgicons.xml");

	try {
		$db = new DB();
		$result = $db->dosql("SELECT * FROM BlogPosts ORDER BY `BlogPosts`.`id`");
		if($result['status'] === true) {
			foreach ($result['result'] as $value) {
				$pubDate = explode('-', $value["pubDate"]);
				$color = category_colors($value["Category"]);
				array_push($posts, array(
					'title'   => $value["Title"], 
					'article' => $value["Content"],
					'link'    => $value["URL"],
					'pubDate' => array(
						'day' 	=> $pubDate[2],
						'month' => $pubDate[1],
						'year'	=> $pubDate[0]
					),
					'guid'    => $value["id"],
					'category'=> $value["Category"],
					'color'	  => $color
					)
				);    
			}
		}
	} catch(expression $e) {
		print_r($e);
	}

echo $twig->render('index.html', array(
	'posts' => array_reverse($posts),
	'svgicons' => $icons,
	'staticdomain' => 'http://static.readmecookie.com/blog'
	));
?>