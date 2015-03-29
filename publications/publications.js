//'use strict';

angular.module('myApp.publications', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/publications', {
    templateUrl: 'publications/publications.html',
    controller: 'PublicationCtrl'
  });
}])
.controller('PublicationCtrl', function($scope,$location,$http,authentication, $filter, $route,EditPublication, ViewPublication) {
	
	$scope.data= {
	};

	$scope.data.dataLoading = true;
	$http.get('https://kanoe-api-server.herokuapp.com/publications/get').success(function(data){
		years= [];
			for(var i=0; i<data.length; i++){
				data[i].year= $filter('date')(data[i].date,'yyyy');
			}
			if(data.length>0){
				years.push(data[0].year);
			}
			for(var i=1; i<data.length; i++){
				var flag=0;
				for(var j=0; j<years.length; j++){
					if(data[i].year== years[j]){
						flag=1;
						break;
					}
				}
				if(flag==0){
					years.push(data[i].year);
				}
			}

			years.sort();
			years.reverse();
			$scope.data.uniqueyears= years;
			
			$scope.data.entities= data;
			$scope.data.dataLoading = false;
		}).error(function(error){
			console.log("Error connecting to internet");
			$scope.data.dataLoading = false;
	});
	
	$scope.loggedin = authentication.isLoggedIn();
	$scope.currentTab = 'view';
	
	$scope.gotoHome= function(){
		$location.path('/home');
	};

	$scope.addPublication= function(){
		$scope.currentTab= 'add';
	};

	$scope.viewPublication= function(){
		years= [];
		$scope.data.dataLoading = true;
		$http.get('https://kanoe-api-server.herokuapp.com/publications/get').success(function(data){
			for(var i=0; i<data.length; i++){
				data[i].year= $filter('date')(data[i].date,'yyyy');
			}
			if(data.length>0){
				years.push(data[0].year);
			}
			for(var i=1; i<data.length; i++){
				var flag=0;
				for(var j=0; j<years.length; j++){
					if(data[i].year== years[j]){
						flag=1;
						break;
					}
				}
				if(flag==0){
					years.push(data[i].year);
				}
			}

			years.sort();
			years.reverse();
			$scope.data.uniqueyears= years;
			
			$scope.data.entities= data;
			$scope.data.dataLoading = false;
		}).error(function(error){
			console.log("Error connecting to internet");
			$scope.data.dataLoading = false;
		});
		$scope.currentTab= 'view';
		
	};

	$scope.deletePublication= function(){
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

	$scope.gotoContact= function(){
		$location.path('/contact');
	};

	$scope.gotoEvents= function(){
		$location.path('/events');
	};

	$scope.signout = function(){
		authentication.logout();
		$location.path('/home');
	};
    
	

    $scope.submitAdd = function(){
		$http.post('https://kanoe-api-server.herokuapp.com/publications/add',{'accessToken': JSON.parse(sessionStorage.getItem('credentials')).token, 'author': $scope.data.author, 'coauthors': $scope.data.coauthors, 'area':$scope.data.area, 'date': $scope.data.date, 'description': $scope.data.description}).success( function(data) {
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
    		$http.post('https://kanoe-api-server.herokuapp.com/publications/remove', {'accessToken':JSON.parse(sessionStorage.getItem('credentials')).token , 'id': $scope.selected[i]}).success(function(){
    			$route.reload();
    		}).error(function(){
    			console.log("Error connecting to internet");
    		});
  		}
	};
	$scope.edit= function(id, author, coauthors, area, date, description, e){
		EditPublication.set(id,author, coauthors, area, date, description);
		e.stopPropagation();
		$location.path('/publications/edit');
	}
	
	$scope.viewFullPublication = function(pub){
		console.log('Entered here')
		ViewPublication.set(pub)
		$location.path('/publications/view');
	};
}); 