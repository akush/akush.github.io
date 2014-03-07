//Define an angular module for our app
var akushApp = angular.module('akushApp', []);

akushApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'home.html',
        controller: 'HomeController'
    }).
      when('/github', {
        templateUrl: 'github.html',
        controller: 'GithubController'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
 
 
akushApp.controller('HomeController', function($scope) {
     
  $scope.message = 'This is home screen';
     
});
 
 
akushApp.controller('GithubController', function($scope, $http) {

  $scope.message = 'This is tasks screen';
  $scope.userNotFound = false;
  $scope.loaded = false;

  $http.get("https://api.github.com/users/akush")
       .success(function (data) {
          if (data.name == "") data.name = data.login;
          $scope.user = data;
          $scope.loaded = true;
       })
       .error(function () {
          $scope.userNotFound = true;
       });
  $http.get("https://api.github.com/users/akush/repos").success(function (data) {
    $scope.repos = data;
    $scope.reposFound = data.length > 0;
  });
 
});