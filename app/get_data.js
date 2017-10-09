
/* global $ */
app.controller('getdata',function($rootScope,$scope,$http,myService,$location,$interval){
  $scope.reload=function(){
    console.log("clicked");
     // $location.path('/dashboard');
      $http.post("api/getdata/getQuizList.php").success(function (response) {
      /*After Successfully fetch the data from JSON file assigning these data to $scope object variable*/
      //$scope.questions = response.records;
        $scope.members=response.records;
        for (var i = 0; i < $scope.members.length; i++) {
          $scope.members[i].quiz_time = ($scope.members[i].hours*60)+$scope.members[i].mins;
      }
      });

  }
  $scope.reload();
	
 // console.log($rootScope.name);
	$scope.gotoquiz = function(quizname,q_id,hours,mins){
    console.log(mins+""+hours+""+quizname);
	//	myService.set(quizname,quiztab,hours,mins);
    $rootScope.quiz_name=quizname;
    console.log(q_id)
    $rootScope.q_id=q_id;
    $rootScope.quiz_time_hours=hours;
    $rootScope.quiz_time_mins=mins;
    $rootScope.quiz_time=(hours*60)+mins;
    console.log(quiz_time);
   // console.log($rootScope.res_tab);
		$location.path('/quiz_page');
	}
});

app.controller('results',function($scope,$location,myService,$rootScope,$interval){
$scope.marks=$rootScope.result;
$scope.time1=60;
var timer=$interval(function () {
  $scope.time1--;
  if($scope.time1==0){
    $interval.cancel(timer);
      $location.path('/dashboard');
    }
  }, 1000);
  

});

app.controller('getQuizData',function ($rootScope,$scope, $window ,toaster,$rootScope,myService,$http,$location,$timeout,$interval) {
	$scope.Quizname=$rootScope.quiz_name;
  $scope.q_id = $rootScope.q_id;
  $scope.user=$rootScope.user_details;
  $scope.hour=$rootScope.quiz_time_hours;
  $scope.minutes=$rootScope.quiz_time_mins;
  // $scope.quiz_time=$rootScope.quiz_time;
  $scope.email=$rootScope.email;
 // console.log($rootScope.email);

	if($scope.Quizname==null){
		console.log("empty "+$scope.q_id);
	}else{
    $http.get("api/getdata/Getquizques.php?q_id="+$scope.q_id).success(function (response) {
			/*After Successfully fetch the data from JSON file assigning these data to $scope object variable*/
			//$scope.questions = response.records;
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
  $scope.submit=function(){
        $scope.marks = 0;
      
        console.log("submit called "+$scope.results.length+" test");
        //$scope.i=0;
      for (var i = 0; i < $scope.results.length; i++) {
         console.log(angular.equals($scope.questions[i].ans,$scope.results[i]));

          if(angular.equals($scope.questions[i].result,$scope.results[i])){
            console.log($scope.results[i]);          
            $scope.marks=$scope.marks+parseInt($scope.questions[i].marks);
          }
      }
      console.log($scope.marks);
      var attended = $scope.results.length;
      var unattended = $scope.questions.length - $scope.results.length;
      console.log(unattended);
      $rootScope.result=$scope.marks;
      $scope.result_data={username:$rootScope.name,marks:$scope.marks,result_tab:$rootScope.res_tab,email:$rootScope.email,regno:$rootScope.regno};
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