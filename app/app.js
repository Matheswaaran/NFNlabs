var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'authCtrl'
            })
            .when('/quiz_page', {
                title: 'Quiz_Page',
                templateUrl: 'partials/quiz_page.html',
                controller:'authCtrl'
                
            })
            .when('/result', {
                title: 'result',
                templateUrl: 'partials/result.html',
                controller: 'authCtrl',
                
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            })
            .otherwise({
                redirectTo: '/login'
            });
  }])
    .run(function ($rootScope, $location, Data,myService) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                    $rootScope.regno = results.regno;
                    $rootScope.user_details=results;
                    $rootScope.quiz_name;
                    $rootScope.q_id;
                    $rootScope.quiz_tab;
                    $rootScope.quiz_time;
                    $rootScope.quiz_time_hours;
                    $rootScope.quiz_time_mins;
                    $rootScope.result;
                   // quizname,quiztab,hours,mins
                    $rootScope.res_tab;
                   // myService.set_user(results);
                    $location.path(nextUrl);
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login' ) {
                        
                    }else{
                        $location.path('/login');
                    }
                }
            });
        });
    })
    .factory('myService', function() {
        
    });