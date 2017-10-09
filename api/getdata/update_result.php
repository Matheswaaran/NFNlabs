<?php
$u_id = $_POST["u_id"];
$q_id = $_POST["q_id"];
$marks = $_POST["marks"];
$hours_rem = $_POST["hours_rem"];
$mins_rem = $_POST["mins_rem"];
$atten_ques = $_POST["atten_ques"];
$unAtten_ques = $_POST["unAtten_ques"];

$response=array();
include_once $_SERVER['DOCUMENT_ROOT'].'/matExam/config.php';
$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);


if(!$conn){
	$response['status']="error";
	$response['message']="error in connection";
}else{
	$query="insert into $result_tab VALUES (null,'$user','$user_rno','$user_email',$marks,null)";
	$result=mysqli_query($conn,$query);
	if($result){
		$response['status']="success";
		$response['message']="marks recorded";
	}else{
		$response['status']="error";
		$response['message']="failed to record marks";
		}
	}


//echo $marks" "$user" "$user_email" "$user_rno" "$result_tab;
echo json_encode($response);
?>