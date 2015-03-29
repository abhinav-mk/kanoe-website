//'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])
.controller('MainCtrl', function($scope) {
})
.controller('HomeCtrl', function($scope,$location,authentication,$route) {
	$scope.loggedin = authentication.isLoggedIn();
	$scope.gotoLogin = function(){
		$location.path('/login');
	};
	$scope.signout = function(){
		authentication.logout();
		$route.reload();
	};
	$scope.gotoProjects= function(){
		$location.path('/projects');
	};

	$scope.gotoEvents= function(){
		$location.path('/events');
	};

	$scope.gotoPublications= function(){
		$location.path('/publications');
	};

	$scope.gotoPeople= function(){
		$location.path('/people');
	};

	$scope.gotoContact= function(){
		$location.path('/contact');
	};

	$scope.gotoHome= function(){
		$location.path('/home');
	};

});
