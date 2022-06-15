<?php 
 if($_SERVER['REQUEST_METHOD'] != 'POST'){
    exit;
 }

 include 'db_connection.php';

 $request_body = file_get_content('php://input');
 $data = json_decode($request_body);

 $postId = $data->id;

 $sql = "DELETE FROM posts WHERE id = '$postId';";
 $result = mysqli_query($conn, $sql);

 if(!$result){
    echo("Error Description: " . mysqli_error($conn));
 } else {
    echo ("All is Guchi! Post was deleted");
 }
?>