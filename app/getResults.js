
app.controller('results',function($scope,$location,myService,$rootScope,$interval,$http){
	// $scope.percentage=$rootScope.result;
	$scope.duration = parseInt($rootScope.quiz_time_hours*60) + parseInt($rootScope.quiz_time_mins);
	if($rootScope.examFlag == true){
		$http.get("api/getdata/getResult.php?u_id="+$rootScope.uid+"&q_id="+$rootScope.q_id).success(function (response) {
          if (response.status == "success") {
          	console.log("if res");
            $scope.record = response.records;
            $scope.currentDate = new Date($scope.record.created);
            $scope.totQues = parseInt($scope.record.attended_ques) + parseInt($scope.record.unattended_ques);
            $scope.percentage = (parseInt($scope.record.marks) / parseInt($scope.totQues*$scope.record.positive_mark))*100;
            $scope.usedSec = $scope.record.used_sec;
            $scope.wrongQues = $scope.record.wrong_ques;
            $scope.correctQues = $scope.record.correct_ques;
            $scope.un_Wrong = parseInt($scope.record.unattended_ques) + parseInt($scope.record.wrong_ques);
            $scope.cq_marks = parseInt($scope.correctQues) * parseInt($scope.record.positive_mark);
            $scope.uw_marks = parseInt($scope.un_Wrong) * parseInt($scope.record.negative_mark);
          }
        });
	}else{
		$scope.totQues = $rootScope.totalQuestions;
		$scope.currentDate = new Date();
		$scope.negative_mark = $rootScope.negative_mark;
		$scope.percentage = (parseInt($rootScope.result)  / parseInt($scope.totQues*$rootScope.positive_mark))*100;
		$scope.usedSec = $rootScope.used_sec;
		$scope.wrongQues = $rootScope.wrongQuestions;
		$scope.correctQues = $rootScope.correctQuestions;
		$scope.un_Wrong = parseInt($rootScope.unattendedQuestions) + parseInt($rootScope.wrongQuestions);
        $scope.cq_marks = parseInt($scope.correctQues) * parseInt($rootScope.positive_mark);
        $scope.uw_marks = parseInt($scope.un_Wrong) * parseInt($rootScope.negative_mark);
	}
});