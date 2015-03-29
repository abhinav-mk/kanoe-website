//'use strict';




angular.module('myApp.projects', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects', {
    templateUrl: 'projects/projects.html',
    controller: 'ProjectsCtrl'
  });
}])
.controller('ProjectsCtrl', function($scope,$location,$http,authentication, $route,EditProject, ViewProject) {

	$scope.data= {

	};

	$scope.data.dataLoading = true;
	$http.get('https://kanoe-api-server.herokuapp.com/projects/get').success(function(data){
			$scope.entities= data;
			$scope.data.dataLoading = false;
		}).error(function(error){
			console.log("Error connecting to internet");
			$scope.data.dataLoading = false;
	});

	$scope.loggedin = authentication.isLoggedIn();
	$scope.currentTab = 'view';
	
	$scope.addProject= function(){
		$scope.currentTab= 'add';
	};

	$scope.gotoHome= function(){
		$location.path('/home');
	};

	$scope.viewProject= function(){
		$scope.data.dataLoading = true;
		$http.get('https://kanoe-api-server.herokuapp.com/projects/get').success(function(data){
			$scope.entities= data;
			$scope.data.dataLoading = false;
		}).error(function(error){
			console.log("Error connecting to internet");
		});
		$scope.currentTab= 'view';
	};

	$scope.deleteProject= function(){
		$scope.currentTab= 'delete';
	}; 

	$scope.gotoLogin= function(){
		$location.path('/login');
	};  

	$scope.gotoProjects= function(){
		$location.path('/projects');
	};

	$scope.gotoPublications= function(){
		$location.path('/publications');
	};

	$scope.gotoPeople= function(){
		$location.path('/people');
	};

	$scope.gotoEvents= function(){
		$location.path('/events');
	};

	$scope.gotoContact= function(){
		$location.path('/contact');
	};

	$scope.signout = function(){
		authentication.logout();
		$location.path('/home');
	};
    
    $scope.submitAdd = function(){
    	console.log(JSON.parse(sessionStorage.getItem('credentials')));
    	console.log($scope.data.title);
    	console.log($scope.data.description);
    	console.log($scope.data.participants);
		$http.post('https://kanoe-api-server.herokuapp.com/projects/add',{'accessToken': JSON.parse(sessionStorage.getItem('credentials')).token, 'title':$scope.data.title, 'description': $scope.data.description, 'participants': $scope.data.participants}).success( function(data) {
				console.log(data);
				$route.reload();
		}).error(function(data){
			console.log('Error connecting to internet')
			console.log(data)
		});
	};

	$scope.selected= [];

	var updateSelected = function(action, id) {
  		if (action === 'add' && $scope.selected.indexOf(id) === -1) {
    		$scope.selected.push(id);
  		}
  		if (action === 'remove' && $scope.selected.indexOf(id) !== -1) {
    		$scope.selected.splice($scope.selected.indexOf(id), 1);
  		}
	};

	$scope.updateSelection = function($event, id) {
  		var checkbox = $event.target;
  		var action = (checkbox.checked ? 'add' : 'remove');
  		updateSelected(action, id);
	};

	$scope.selectAll = function($event) {
  		var checkbox = $event.target;
  		var action = (checkbox.checked ? 'add' : 'remove');
  		for ( var i = 0; i < $scope.entities.length; i++) {
    		var entity = $scope.entities[i];
    		updateSelected(action, entity.id);
  		}
	};

	$scope.getSelectedClass = function(entity) {
  		return $scope.isSelected(entity.id) ? 'selected' : '';
	};

	$scope.isSelected = function(id) {
  		return $scope.selected.indexOf(id) >= 0;
	};

	$scope.isSelectedAll = function() {
	  return $scope.selected.length === $scope.entities.length;
	};	

	$scope.delete= function(){
		for (var i = 0; i < $scope.selected.length; i++) {
    		$http.post('https://kanoe-api-server.herokuapp.com/projects/remove', {'accessToken':JSON.parse(sessionStorage.getItem('credentials')).token , 'id': $scope.selected[i]}).success(function(){
    			$route.reload();
    		}).error(function(){
    			console.log("Error connecting to internet");
    		});
  		}
	};

	$scope.edit= function(id, title, description, participants, e){
		EditProject.set(id,title,description,participants);
		e.stopPropagation();
		$location.path('/projects/edit');
	};
	$scope.viewFullProject = function(project){
		console.log('Entered here')
		ViewProject.set(project)
		$location.path('/projects/view');
	};
}); 
