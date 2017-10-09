<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/matExam/config.php';
$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
$q_id=$_GET["q_id"];
if(!$conn){
echo "error in connection";
}else{
	$query="select * from quiz_questions WHERE q_id = $q_id";
	$result=mysqli_query($conn,$query);
	if(!$result){

	}else{
		$data=array();
		if(mysqli_num_rows($result)>0){
			while ($row=mysqli_fetch_assoc($result)) {
				$quiz_ques=array();
				$quiz_ques["sno"]=$row["sno"];
				$quiz_ques["q_id"] = $row["q_id"];
				$quiz_ques["question"]=$row["question"];
				$quiz_ques["op_a"]=$row["op_a"];	
				$quiz_ques["op_b"]=$row["op_b"];
				$quiz_ques["op_c"]=$row["op_c"];
				$quiz_ques["op_d"]=$row["op_d"];
				$quiz_ques["result"]=$row["result"];
				$quiz_ques["marks"]=$row["marks"];
                $data[]=$quiz_ques;
			}
			$final=array();
			$final["records"]=$data;
			echo json_encode($final);
		}
	}
}
?>