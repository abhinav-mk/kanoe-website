angular.module('myApp.events', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/events', {
    templateUrl: 'events/events.html',
    controller: 'EventCtrl'
  });
}])
.controller('EventCtrl', function($scope,$location,$http,authentication, $route, EditEvent, ViewEvent) {

	$scope.data= {

	}; 

	$scope.data.dataLoading = true;
	$http.get('https://kanoe-api-server.herokuapp.com/events/get').success(function(data){
			$scope.entities= data;
			$scope.data.dataLoading = false;
		}).error(function(error){
			console.log("Error connecting to internet");
	});

	$scope.loggedin = authentication.isLoggedIn();
	$scope.currentTab = 'view';
	

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

	$scope.gotoPublications= function(){
		$location.path('/publications');
	};

	$scope.gotoPeople= function(){
		$location.path('/people');
	};

	$scope.gotoContact= function(){
		$location.path('/contact');
	};

	$scope.gotoProjects= function(){
		$location.path('/projects');
	};

	$scope.addEvent= function(){
		$scope.currentTab= 'add';
	};

	$scope.gotoHome= function(){
		$location.path('/home');
	};

	$scope.viewEvent= function(){
		$scope.data.dataLoading = true;
		$http.get('https://kanoe-api-server.herokuapp.com/events/get').success(function(data){
			$scope.entities= data;
			$scope.data.dataLoading = false;
		}).error(function(error){
			console.log("Error connecting to internet");
		});
		$scope.currentTab= 'view';
	};

	$scope.deleteEvent= function(){
		$scope.currentTab= 'delete';
	};

	

	$scope.submitAdd = function(){
		
		$http.post('https://kanoe-api-server.herokuapp.com/events/add',{'accessToken': JSON.parse(sessionStorage.getItem('credentials')).token, 'title':$scope.data.title, 'description': $scope.data.description, 'place': $scope.data.place, 'date': $scope.data.date, 'remarks': $scope.data.remarks}).success( function(data) {
				console.log(data);
				$route.reload();
		}).error(function(data){
			console.log('Error connecting to internet')
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
			console.log($scope.selected[i]);
    		$http.post('https://kanoe-api-server.herokuapp.com/events/remove', {'accessToken':JSON.parse(sessionStorage.getItem('credentials')).token , 'id': $scope.selected[i]}).success(function(){
    			$route.reload();
    		}).error(function(){
    			console.log("Error connecting to internet");
    		});
  		}
	};

	$scope.edit= function(id, title, description, place, date, remarks, e){

		EditEvent.set(id,title,description,place, date, remarks);
		e.stopPropagation();
		$location.path('/events/edit');
	};
	$scope.viewFullEvent = function(event){
		console.log('Entered here')
		ViewEvent.set(event)
		$location.path('/events/view');
	};
});	

