angular.module('myApp.editPeople', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/people/edit', {
    templateUrl: 'people/edit.html',
    controller: 'PeopleEditCtrl'
  });
}])
.controller('PeopleEditCtrl', function($scope,$location,$http,authentication, $route,EditPeople) {
	$scope.loggedin = authentication.isLoggedIn();
	var proj= EditPeople.get();
	console.log(proj);
	$scope.id1= proj.id;
	$scope.name= proj.name;
	$scope.email= proj.email;
	$scope.phno = proj.phno;

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

