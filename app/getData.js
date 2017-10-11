
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