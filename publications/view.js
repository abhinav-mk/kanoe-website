angular.module('myApp.viewPublications', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/publications/view', {
    templateUrl: 'publications/view.html',
    controller: 'PublicationViewCtrl'
  });
}])
.controller('PublicationViewCtrl', function($scope,$location, authentication, ViewPublication) {
	$scope.pub = ViewPublication.get()
	$scope.loggedin = authentication.isLoggedIn();
	$scope.gotoLogin= function(){
		$location.path('/login');
	};  

	$scope.gotoHome= function(){
		$location.path('/home');
	};

	$scope.gotoProjects= function(){
		$location.path('/projects');
	};

	$scope.gotoEvents= function(){
		$location.path('/events');
	};

	$scope.signout = function(){
		authentication.logout();
		$location.path('/home');
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
});	