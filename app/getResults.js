
app.controller('results',function($scope,$location,myService,$rootScope,$interval){
	$scope.percentage=$rootScope.result;
	$scope.duration = parseInt($rootScope.quiz_time_hours*60) + parseInt($rootScope.quiz_time_mins);
	$scope.currentDate = new Date();
	// $scope.time1=60;
	// var timer=$interval(function () {
	// 	$scope.time1--;
	// 	if($scope.time1==0){
	// 		$interval.cancel(timer);
	// 		$location.path('/dashboard');
	// 	}
	// }, 1000);

	$scope.negative_mark = $rootScope.negative_mark;
});