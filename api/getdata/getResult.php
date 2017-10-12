<?php
	include_once $_SERVER['DOCUMENT_ROOT'].'/nfnLabs/config.php';
	$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
	$u_id=$_GET["u_id"];
	$q_id=$_GET["q_id"];
	$response = array();
	if(!$conn){
		$response["status"] = "error";
		$response["message"] = "error in connection";
	}else{
		$res_query="select * from quiz_results WHERE u_id = '$u_id'";
		$res_result=mysqli_query($conn,$res_query);
		$quiz_query="select * from quiz_list WHERE sno = '$q_id'";
		$quiz_result=mysqli_query($conn,$quiz_query);

		if(!$res_result && !$quiz_result){
			$response["status"] = "error";
			$response["message"] = "no data found";
		}else{
			$quiz_res=array();
			if(mysqli_num_rows($res_result) == 1 && mysqli_num_rows($quiz_result) == 1){
				if($res_row = mysqli_fetch_assoc($res_result)){
					$response["res"] = $res_row;
					$response["ques"] = $quiz_row;
					$quiz_res["sno"] = $res_row["sno"];
					$quiz_res["u_id"] = $res_row["u_id"];
					$quiz_res["q_id"] = $res_row["q_id"];
					$quiz_res["attended_ques"]=$res_row["attended_ques"];
					$quiz_res["unattended_ques"]=$res_row["unattended_ques"];	
					$quiz_res["correct_ques"]=$res_row["correct_ques"];	
					$quiz_res["wrong_ques"]=$res_row["wrong_ques"];	
					$quiz_res["marks"]=$res_row["marks"];
					$quiz_res["created"]=$res_row["created"];
					$quiz_res["used_sec"]=$res_row["used_sec"];
					if($quiz_row = mysqli_fetch_assoc($quiz_result)){
						$quiz_res["positive_mark"] = $quiz_row["positive_mark"];
						$quiz_res["negative_mark"] = $quiz_row["negative_mark"];
						$quiz_res["hours"] = $quiz_row["hours"];
						$quiz_res["mins"] = $quiz_row["mins"];
					}
					$response["status"] = "success";
					$response["message"] = "Data sucessfully fetched";
					$response["records"] = $quiz_res;
				}else{
					$response["status"] = "error";
					$response["message"] = "no data found";
				}
			}
		}
	}
	echo json_encode($response);

?>