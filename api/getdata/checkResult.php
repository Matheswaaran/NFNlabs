<?php
	include_once $_SERVER['DOCUMENT_ROOT'].'/nfnLabs/config.php';
	$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
	$u_id = $_GET['u_id'];
	$response = array();
	if(!$conn){
		$response['status']="error";
		$response['message']="error in connection";
	}else{
		$query="SELECT * FROM quiz_results WHERE u_id = '$u_id'";
		$result=mysqli_query($conn,$query);
		if ($result) {
			$response['rows'] = mysqli_num_rows($result);
			if (mysqli_num_rows($result) > 0) {
				$response['rows'] = mysqli_num_rows($result);
				$response['status']="error";
				$response['message']="Exam Already Written";
			}else{
				$response['status']="success";
				$response['message']="Proceed to Quiz Page";
			}
		}else{
			$response['status']="error";
			$response['message']="Cannot execute Query";
		}
	}

	echo json_encode($response);
?>