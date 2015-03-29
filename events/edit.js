angular.module('myApp.Eventedit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/events/edit', {
    templateUrl: 'events/edit.html',
    controller: 'EventeditCtrl'
  });
}])
.controller('EventeditCtrl', function($scope,$location,$http,authentication, $route,EditEvent) {
	console.log("In edir")

	$scope.loggedin = authentication.isLoggedIn();
	var eve= EditEvent.get();
	
	$scope.title= eve.title;
	$scope.description= eve.description;
	$scope.place= eve.place;
	$scope.date= eve.date;
	$scope.remarks= eve.remarks;


	$scope.submitEdit = function(){
		$http.post('https://kanoe-api-server.herokuapp.com/events/edit',{'accessToken': JSON.parse(sessionStorage.getItem('credentials')).token, 'id':eve.id, 'title':$scope.title, 'description': $scope.description, 'place': $scope.place, 'date': $scope.date, 'remarks': $scope.remarks}).success( function(data) {
			$location.path('/events');
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

	$scope.gotoPublications= function(){
		$location.path('/publications');
	};

	$scope.gotoPeople= function(){
		//$location.path('/publications');
	};

	$scope.gotoContact= function(){
		$location.path('/contact');
	};

	$scope.gotoNews= function(){
		//$location.path('/publications');
	};

	$scope.gotoLinks= function(){
		//$location.path('/publications');
	};

	$scope.gotoPartners= function(){
		//$location.path('/publications');
	};

	$scope.gotoLogin= function(){
		$location.path('/login');
	};  

	$scope.signout = function(){
		authentication.logout();
		$location.path('/home');
	};
	
});	
