
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