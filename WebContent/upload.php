<?php

$user = $_POST['username'];
$image = $_FILES['myfile'];
//echo "Hello $user <br/>";
//echo "File Name<b>::</b> " . $image['name'];

move_uploaded_file($image['tmp_name'], "upload/" . $image['name']);
//here the "photos" folder is in same folder as the upload.php,
//otherwise complete url has to be mentioned
?>

//
//    move_uploaded_file($_FILES['image']['tmp_name'], uniqid());

//
//if(isset($_FILES['file']['name'])){
//
//    /* Getting file name */
//    $filename = $_FILES['file']['name'];
//
//    /* Location */
//    $location = "upload/".$filename;
//    $imageFileType = pathinfo($location,PATHINFO_EXTENSION);
//    $imageFileType = strtolower($imageFileType);
//
//    /* Valid extensions */
//    $valid_extensions = array("jpg","jpeg","png");
//
//    $response = 0;
//    /* Check file extension */
//    if(in_array(strtolower($imageFileType), $valid_extensions)) {
//        /* Upload file */
//        if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
//            $response = $location;
//        }
//    }
//
//    echo $response;
//    exit;
//}
//
//echo 0;