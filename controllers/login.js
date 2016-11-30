angular.module('merchantsGuild').controller('LoginController',function($scope, Auth, Profile){


	// Facebook Signin
	$scope.loginWithFacebook = (function(){
		Auth.loginWithFacebook()
		.then(function(loggedData){	
			$scope.currentUser = Auth.checkUser(loggedData.user);	
			$scope.loginStatus.isLoggedIn = true;
		});

	});

	// Google Signin
	$scope.loginWithGoogle = (function(){
		Auth.loginWithGoogle()
		.then(function(loggedData){
			$scope.currentUser = Auth.checkUser(loggedData.user);
			$scope.loginStatus.isLoggedIn = true;
		});
	});


	// Logout
	$scope.logout = (function(){
		Auth.logout().then(function(){
			$scope.loginStatus.isLoggedIn = false;
		});
	});


	$scope.showSubmitItemModal = (function(){
		$("#submit-item-modal").modal('show');
	});	


	$scope.showSubmitRequestModal = (function(){
		$("#submit-request-modal").modal('show');

	});
	
	





});