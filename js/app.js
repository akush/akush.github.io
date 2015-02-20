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
  markActiveHeader('home');
  $scope.message = 'I am working at Citrix R&D India as Software Development Engineer. Graduated from IIT (BHU), Varanasi.';
});
 
 
akushApp.controller('GithubController', function($scope, $http) {

  markActiveHeader('github');
  $scope.message = 'This is tasks screen';
  $scope.userNotFound = false;
  $scope.loaded = false;

  $http.get("https://api.github.com/users/akush")
       .success(function (data) {
          if (data.name === "") data.name = data.login;
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

function markActiveHeader($cls){
  $('#nav-list li').removeClass('active');
  $('#nav-list li.'+$cls).addClass('active');
}