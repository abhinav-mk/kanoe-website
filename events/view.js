angular.module('myApp.viewEvent', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/events/view', {
    templateUrl: 'events/view.html',
    controller: 'EventViewCtrl'
  });
}])
.controller('EventViewCtrl', function($scope,$location,ViewEvent) {
	$scope.event = ViewEvent.get();

	$scope.gotoPublications= function(){
		$location.path('/publications');
	};

	$scope.gotoPeople= function(){
		$location.path('/people');
	};

	$scope.gotoHome= function(){
		$location.path('/home');
	};

	$scope.gotoContact= function(){
		$location.path('/contact');
	};

	$scope.gotoProjects= function(){
		$location.path('/projects');
	};

	$scope.gotoEvents= function(){
		$location.path('/events');
	};

	$scope.gotoLogin= function(){
		$location.path('/login');
	};  

	$scope.signout = function(){
		authentication.logout();
		$location.path('/home');
	};

});	