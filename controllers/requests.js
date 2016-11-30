angular.module('merchantsGuild').controller('RequestsController',function($scope, $routeParams, $window, $location, Auth, AuthWaitForLogged, Requests){


	$scope.loginStatus = {
		isLoggedIn: false
	}; 


	if(AuthWaitForLogged == null){
		$scope.loginStatus.isLoggedIn = false;
	}
	else{
		$scope.loginStatus.isLoggedIn = true;
		$scope.currentUser = Auth.checkUser(AuthWaitForLogged);
	}

	// Code for requestitem page
	// Fetches the Deatils of the page we are on
	if($routeParams.requestID){
		$scope.currRequestItem = Requests.getRequest($routeParams.requestID);
		$scope.currRequestItem.$loaded().then(function(){
			$scope.ownerOfRequest = Auth.getUser($scope.currRequestItem.userWhoPosted);
			$scope.ownerOfRequest.$loaded().then(function(){
				//Set if the user viewing the page owns the item on the page
				if($scope.ownerOfRequest.$id == $scope.currentUser.$id){
					$scope.ownsCurrentRequest = true;
				}
				else{
					$scope.ownsCurrentRequest = false;
				}

			});
		});
	}

	// Function for editing a request
	$scope.openEditRequestModal = (function(){
		$("#editRequestModal").modal('show');
	});



	// Deleting a request from the list
	$scope.deleteThisRequest = (function(){

		Auth.deleteSecondaryRequestLocation($scope.currRequestItem.userWhoPosted, $routeParams.requestID).then(function(){
			Requests.deleteRequest($scope.currRequestItem);
			$("#editRequestModal").modal('hide');
			$location.path('/requests').replace();

		});

	});

	// Modal for sending emails
	$scope.openEmailModal = (function(){
		$("#emailModal").modal('show');
	});

	// Mailto function
	$scope.sendEmail = (function(emailBody){
		recipientEmail = $scope.ownerOfRequest.email;
		subject = "The Merchants Guild: "+$scope.currRequestItem.name;
		$window.open("mailto:"+recipientEmail+"?Subject="+subject+"&body="+emailBody,"_self");
		$("#emailModal").modal('hide');

	});




	// Array of Products
	$scope.requestArr = Requests.getRequests();

	$scope.request = {};

	// TODO: Adding Time Stamping
	$scope.addRequest = function(){
		

		$scope.tagArray = $scope.request.tags.split(",");
		$scope.uid = $scope.currentUser.$id;


		$scope.request.tags = $scope.tagArray;
		$scope.request.userWhoPosted = $scope.uid;	

		Requests.addNewRequest($scope.request).then(function(newRequest){
			$scope.request.itemID = newRequest.key;


			requestObj = {
				name: $scope.request.name, 
				price: $scope.request.price, 
				itemID: $scope.request.itemID
			}


			Auth.addRequest($scope.currentUser.$id, requestObj, $scope.request.itemID);


			$scope.request = {};
			$("#submit-request-modal").modal('hide');

		});
	};


	// Edit Items
	$scope.editRequestItem = (function(){
	
		if(!(Array.isArray($scope.currRequestItem.tags))){
			if($scope.currRequestItem.tags != undefined){
				$scope.tagArray = $scope.currRequestItem.tags.split(",");
			}
		}

		requestObj = {
				name: $scope.currRequestItem.name, 
				price: $scope.currRequestItem.price, 
				itemID: $routeParams.requestID
		}

	
		Requests.saveRequests($scope.currRequestItem).then(function(){
			
			Auth.addRequest($scope.currentUser.$id , requestObj, $routeParams.requestID);
			$("#editRequestModal").modal('hide');

		});

	});





});


