<?php
// Fill up array with names
$rss = simplexml_load_file("../_posts/2013/posts.xml");
$posts = array();
foreach ($rss->channel->item as $item) {       
  array_push($posts, array(
          'title' =>$item->title, 
          'article' => $item->description,
          'link' => $item->link,
          'pubDate' => $item->pubDate,
          'guid' => $item->guid
          )
  );    
}
//get the q parameter from URL
$q=$_GET["q"];
$a = $posts['title'];
//lookup all hints from array if length of q>0
if (strlen($q) > 0)
  {
  $hint="";
  foreach($posts as $item)
    {
    print (" ".$q);
    print (" = ".substr($item['title'],0,strlen($q)));
    if (strtolower($q)==strtolower(substr($item['title'],0,strlen($q))))
      {
      echo "true!";
      if ($hint=="")
        {
        $hint=$item['title'];
        }
      else
        {
        $hint=$hint." , ".$item['title'];
        }
      }
    }
  }

// Set output to "no suggestion" if no hint were found
// or to the correct values
if ($hint == "")
  {
  $response="no suggestions";
  }
else
  {
  $response=$hint;
  }

//output the response
echo $response;
?>