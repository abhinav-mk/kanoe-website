angular.module('myApp.edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects/edit', {
    templateUrl: 'projects/edit.html',
    controller: 'EditCtrl'
  });
}])
.controller('EditCtrl', function($scope,$location,$http,authentication, $route,EditProject) {
	$scope.loggedin = authentication.isLoggedIn();
	var proj= EditProject.get();
	$scope.title= proj.title;
	$scope.description= proj.description;
	$scope.participants= proj.participants;

	$scope.submitEdit = function(){
		$http.post('https://kanoe-api-server.herokuapp.com/projects/edit',{'accessToken': JSON.parse(sessionStorage.getItem('credentials')).token, 'id':proj.id, 'title':$scope.title, 'description': $scope.description, 'participants': $scope.participants}).success( function(data) {
			$location.path('/projects');
		}).error(function(data){
			console.log('Error connecting to internet')
		});
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

	$scope.gotoLogin= function(){
		$location.path('/login');
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

