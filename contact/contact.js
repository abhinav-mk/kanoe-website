//'use strict';

angular.module('myApp.contact', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'contact/contact.html',
    controller: 'ContactCtrl'
  });
}])
.controller('ContactCtrl', function($scope, $location, authentication) {
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
