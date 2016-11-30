angular.module('merchantsGuild').controller('ProfileController',function($scope, $routeParams, $window, $location, Auth, AuthWaitForLogged, Requests){


	$scope.loginStatus = {
		isLoggedIn: false
	}; 


	// Check the current User
	if(AuthWaitForLogged == null){
		$scope.loginStatus.isLoggedIn = false;
	}
	else{
		$scope.loginStatus.isLoggedIn = true;
		$scope.currentUser = Auth.checkUser(AuthWaitForLogged);

	}


	// Check if this is your own profile 
	if($routeParams.userID){
		$scope.userIdOfProfile = Auth.getUser($routeParams.userID);
  		
	if($scope.currentUser != undefined){
  	if($scope.currentUser.$id == $routeParams.userID){
  		$scope.ownsThisProfile = true;
  	}
  	else{
  		$scope.ownsThisProfile = false;
  	}
	 }		
	}


	// For adding reviews
	$scope.review = {};
   
  	$scope.addReview = function(){

    	Auth.addReview($routeParams.userID, $scope.review);

    	$scope.review = {};
  	};  




  	// List of a users posted Items 
  	// These populate in a list on the profile
  	$scope.listedProducts = [];
  	$scope.listedProducts = Auth.getSecondaryProductDirectory($routeParams.userID);
  




  	//list of a users Posted Requests
  	// These populate in a list on the profile
  	$scope.listedRequests = [];
  	$scope.listedRequests = Auth.getSecondaryRequestDirectory($routeParams.userID);


});







// Tabs on Profile
angular.module('merchantsGuild').controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(newValue){
    	this.tab = newValue;
    };

    this.isSet = function(tabName){
    	return this.tab === tabName;
    };
});

