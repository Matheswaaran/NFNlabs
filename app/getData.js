
/* global $ */
app.controller('getdata',function($rootScope,$scope,$http,myService,$location,$interval,toaster){
  $scope.reload=function(){
    console.log("clicked");
     // $location.path('/dashboard');
      $http.post("api/getdata/getQuizList.php").success(function (response) {
      /*After Successfully fetch the data from JSON file assigning these data to $scope object variable*/
      //$scope.questions = response.records;
        $scope.members=response.records;
        for (var i = 0; i < $scope.members.length; i++) {
          $scope.members[i].quiz_time = parseInt($scope.members[i].hours*60) + parseInt($scope.members[i].mins);
      }
      });

  }
  $scope.reload();

	$scope.gotoquiz = function(quizname,q_id,hours,mins,positive_mark,negative_mark){
    $rootScope.quiz_name=quizname;
    $rootScope.q_id=q_id;
    $rootScope.quiz_time_hours=hours;
    $rootScope.quiz_time_mins=mins;
    $rootScope.positive_mark = positive_mark;
    $rootScope.negative_mark = negative_mark;

    $http.get("api/getdata/checkResult.php?u_id="+$rootScope.uid).success(function (response) {
      // $scope.setGlobal(response);
      if (response.status == "success") {
        $rootScope.examFlag = false;
        $location.path('quiz_page');
        toaster.pop(response.status, "", response.message, 1000, 'trustedHtml');
      }else{
        toaster.pop(response.status, "", response.message, 1000, 'trustedHtml');
        $rootScope.examFlag = true;
        $location.path('result');
      }
    });
	}
});