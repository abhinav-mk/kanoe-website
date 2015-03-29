//'use strict';

angular.module('myApp.people', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/people', {
    templateUrl: 'people/people.html',
    controller: 'PeopleCtrl'
  });
}])
.controller('PeopleCtrl', function($scope,$location,$http,authentication, $route, EditPeople) {

	$scope.data= {};

	$scope.data.dataLoading = true;
	$http.get('https://kanoe-api-server.herokuapp.com/people/get').success(function(data){
			$scope.people_data = data.people_data;
			$scope.people_image_data = data.people_image_data;
			var i;
			$scope.imageUrl=[]
			for(i=0;i<$scope.people_data.length;i++)
			{
				$scope.imageUrl[i] = "https://kanoe-api-server.herokuapp.com/people/get/"+$scope.people_data[i].id+"";
			}
			$scope.data.dataLoading = false;
		}).error(function(error){
			console.log("Error connecting to internet");
			$scope.data.dataLoading = false;
	});
	$scope.loggedin = authentication.isLoggedIn();
	$scope.currentTab = 'view';	
	$scope.token = JSON.stringify(sessionStorage.getItem('credentials')).token

	$scope.addPeople= function(){
		$scope.currentTab= 'add';
	};

	$scope.viewPeople= function(){
		$scope.data.dataLoading = true;
		$http.get('https://kanoe-api-server.herokuapp.com/people/get').success(function(data){
			$scope.people_data = data.people_data;
			$scope.people_image_data = data.people_image_data;
			var i;
			$scope.imageUrl=[]
			for(i=0;i<$scope.people_data.length;i++)
			{
				$scope.imageUrl[i] = "https://kanoe-api-server.herokuapp.com/people/get/"+$scope.people_data[i].id+"";
			}
			$scope.data.dataLoading = false;
		}).error(function(error){
			console.log("Error connecting to internet");
	});
		$scope.currentTab= 'view';
	};

	$scope.deletePeople= function(){
		$scope.currentTab= 'delete';
	}; 

	$scope.gotoEvents= function(){
		$location.path('/events');
	};

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
  		for ( var i = 0; i < $scope.people_data.length; i++) {
    		var entity = $scope.people_data[i];
    		updateSelected(action, entity.id);
  		}
	};
	$scope.data.submitAdd = function(event){
    	
    	console.log("In submit add");
    	console.log($scope.data.name);
    	console.log($scope.data.phno);
    	console.log($scope.data.email);
    	console.log($scope.data.upload);
	};

	$scope.getSelectedClass = function(entity) {
  		return $scope.isSelected(entity.id) ? 'selected' : '';
	};

	$scope.isSelected = function(id) {
  		return $scope.selected.indexOf(id) >= 0;
	};

	$scope.isSelectedAll = function() {
	  return $scope.selected.length === $scope.people_data.length;
	};	

	$scope.delete= function(){
		for (var i = 0; i < $scope.selected.length; i++) {
    		$http.post('https://kanoe-api-server.herokuapp.com/people/remove', {'accessToken':JSON.parse(sessionStorage.getItem('credentials')).token , 'id': $scope.selected[i]}).success(function(){
    			$route.reload();
    		}).error(function(){
    			console.log("Error connecting to internet");
    		});
  		}
	};

	$scope.edit= function(id, name, email, phno, event){
		EditPeople.set(id, name, email, phno, event);
		$location.path('/people/edit');
	};
}); 