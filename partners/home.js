//'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])
.controller('MainCtrl', function($scope) {
	$scope.loggedIn=false;
	$scope.token='';
})
.controller('HomeCtrl', function($scope,$location) {
	$scope.gotoLogin = function(){
		$location.path('/login')
	};
}); 
