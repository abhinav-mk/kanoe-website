angular.module('myApp.editPublications', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/publications/edit', {
    templateUrl: 'publications/edit.html',
    controller: 'EditPublicationCtrl'
  });
}])
.controller('EditPublicationCtrl', function($scope,$location,$http,authentication, $route,EditPublication) {
	$scope.loggedin = authentication.isLoggedIn();
	var pub= EditPublication.get();
	$scope.author= pub.author;
	$scope.coauthors= pub.coauthors;
	$scope.area= pub.area;
	$scope.date= pub.date;
	$scope.description= pub.description;

	$scope.submitEdit = function(){
		$http.post('https://kanoe-api-server.herokuapp.com/publications/edit',{'accessToken': JSON.parse(sessionStorage.getItem('credentials')).token, 'id':pub.id, 'author':$scope.author, 'coauthors': $scope.coauthors, 'area': $scope.area, 'date': $scope.date, 'description': $scope.description}).success( function(data) {
			$location.path('/publications');
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