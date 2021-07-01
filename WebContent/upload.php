<?php

//
///* Get the name of the uploaded file */
//$filename = $_FILES['file']['name'];
//
///* Choose where to save the uploaded file */
//$location = "upload/".$filename;
//
///* Save the uploaded file to the local filesystem */
//if(move_uploaded_file($_FILES['file']['tmp_name'], $location)){
//    echo $location;
//}else{
//    echo 0;
//}


if(isset($_FILES['file']['name'])){

    /* Getting file name */
    $filename = $_FILES['file']['name'];

    /* Location */
    $location = "upload/".$filename;
    $imageFileType = pathinfo($location,PATHINFO_EXTENSION);
    $imageFileType = strtolower($imageFileType);

    /* Valid extensions */
    $valid_extensions = array("jpg","jpeg","png");

    $response = 0;
    /* Check file extension */
    if(in_array(strtolower($imageFileType), $valid_extensions)) {
        /* Upload file */
        if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
            $response = $location;
        }
    }

    echo $response;
    exit;
}

echo 0;