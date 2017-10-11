<?php        
include_once $_SERVER['DOCUMENT_ROOT'].'/nfnLabs/config.php';
$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
if(!$conn){

}else{
	$query="select * from quiz_list";
	$result=mysqli_query($conn,$query);
	if(!$result){

	}else{
		$data=array();
		if(mysqli_num_rows($result)>0){
			while ($row=mysqli_fetch_assoc($result)) {
				$quiz=array();
				$quiz["sno"]=$row["sno"];
				$quiz["name"]=$row["name"];
				$quiz["level"] = $row["level"];
				$quiz["description"]=$row["descr"];
				$quiz["cond_by"]=$row["conducted_by"];
				$quiz["negative_mark"] = $row["negative_mark"];
				$quiz["positive_mark"] = $row["positive_mark"];
				$quiz["hours"]=$row["hours"];
				$quiz["mins"]=$row["mins"];
                $data[]=$quiz;
			}
			$final=array();
			$final["records"]=$data;
			echo json_encode($final);
		}
	}
}
?>