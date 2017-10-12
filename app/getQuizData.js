app.controller('getQuizData',function ($rootScope,$scope, $window ,toaster,$rootScope,myService,$http,$location,$timeout,$interval) {
	$scope.Quizname=$rootScope.quiz_name;
  $scope.q_id = $rootScope.q_id;
  $scope.user=$rootScope.user_details;
  $scope.hour=$rootScope.quiz_time_hours;
  $scope.minutes=$rootScope.quiz_time_mins;
  $scope.email=$rootScope.email;
  $scope.index = 1;

	if($scope.Quizname==null){
		console.log("empty "+$scope.q_id);
	}else{
    $http.get("api/getdata/getquizques.php?q_id="+$scope.q_id).success(function (response) {
			$scope.setGlobal(response);
			console.log("response got"+response);
		});


  console.log($scope.user.name+" user got");

  $scope.questions=[];
  $scope.setGlobal=function(response){
    $scope.questions=response.records;
    console.log($scope.questions);
    $scope.quesarr=[$scope.questions];
  }
  //$scope.questions=[];
  $scope.index=1;
  $scope.pos=$scope.index-1;
  $scope.results=[];
  $scope.usedSec = 0;
  $scope.correctQues = 0;
  $scope.wrongQues = 0;

  $scope.goToQues = function(a){
    console.log(a);
    $scope.index = parseInt(a);
  }

  $scope.submit=function(){
      $scope.marks = 0;
      console.log("submit called "+$scope.results.length+" test");
      for (var i = 0; i < $scope.results.length; i++) {
        if(angular.equals($scope.questions[i].result,$scope.results[i])){
          $scope.marks=$scope.marks+parseInt($rootScope.positive_mark);
          $scope.correctQues = parseInt($scope.correctQues) + 1;
        }else{
          $scope.marks=$scope.marks-parseInt($rootScope.negative_mark);
          $scope.wrongQues = parseInt($scope.wrongQues) + 1;
        }
      }
      var attended = $scope.results.length;
      var unattended = $scope.questions.length - $scope.results.length;
      $rootScope.result=$scope.marks;
      $rootScope.totalQuestions = $scope.questions.length;

      $scope.full_timer = (parseInt($rootScope.quiz_time_hours)*3600) + (parseInt($rootScope.quiz_time_mins)*60)
      $scope.completed_timer = (parseInt($scope.hour)*3600) + (parseInt($scope.minutes)*60) + parseInt($scope.seconds);
      // $scope.usedSec = parseInt($scope.full_timer) - parseInt($scope.completed_timer);
      $scope.usedSec = parseInt($scope.full_timer) - parseInt($scope.completed_timer);
      $rootScope.used_sec = $scope.usedSec;
      $rootScope.correctQuestions = $scope.correctQues;
      $rootScope.wrongQuestions = $scope.wrongQues;
      $rootScope.unattendedQuestions = unattended;
      $rootScope.attendedQuestions = attended;

      $scope.result_data={username:$rootScope.name,q_id:$rootScope.q_id,u_id:$rootScope.uid,marks:$scope.marks,atten_ques:attended,unAtten_ques:unattended,usedSec:$scope.usedSec,correct_ques:$scope.correctQues,wrong_ques:$scope.wrongQues};
      $http({
        method : "POST",
        url : "api/getdata/update_result.php",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
       transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
       },
      data: $scope.result_data
      }).success(function(response){
        //$scope.qtable=response.qtable;
        $scope.setGlobal(response);
        //myService.set_questab(response.qtable);
        $rootScope.quiz_tab=response.qtable;
        console.log(response.message);
            toaster.pop(response.status, "", response.message, 1000, 'trustedHtml');
               // $location.path('/quizques');
      });
      $location.path('/result');
    }
//timer starts
$scope.seconds=00;
$scope.counter=$scope.minutes*60;
if($scope.hour!=0 && $scope.minutes==0){
  $scope.tott=$scope.hour*60*60;
  $scope.seconds=60;
  $scope.minutes=59;
  $scope.hour--;
}else if($scope.hour==0 && $scope.minutes!=0){
  $scope.tott=$scope.minutes*60;
  $scope.seconds=60;
  $scope.minutes--;
}else if($scope.seconds!=0){
  $scope.tott=$scope.seconds;
}
var timer=$interval(function () {
      if($scope.tott!=0){
        if($scope.seconds==0 && $scope.tott!=0){
           if($scope.minutes!=0){
             $scope.seconds=60;
             $scope.minutes--;
            }else{
              if($scope.hour!=0){
                $scope.minutes=59;
                $scope.seconds=60;
                $scope.hour--;
              }
            }
          }
        $scope.seconds--;
        $scope.tott--;        
        }else{
          $interval.cancel(timer);
          $scope.submit();
        }      
   }, 1000);		   
 }
 //timer ends
 	//console.log($scope.questions[0].opa);	
});