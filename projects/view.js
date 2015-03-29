angular.module('myApp.viewProject', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects/view', {
    templateUrl: 'projects/view.html',
    controller: 'ProjectViewCtrl'
  });
}])
.controller('ProjectViewCtrl', function($scope, $location, authentication, ViewProject) {
	$scope.project = ViewProject.get()
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