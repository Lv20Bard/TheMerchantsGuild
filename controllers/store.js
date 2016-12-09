angular.module('merchantsGuild').controller('StoreController',function($scope, $routeParams, $location, $window, Auth, AuthWaitForLogged, StoreItem){

	$scope.currStoreItem = {};
	$scope.ownerOfItem = {};
	$scope.ownsCurrentItem;

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

	

	// Code for storeitem page
	// Fetches the Deatils of the page we are on
	if($routeParams.itemID){
		$scope.currStoreItem = StoreItem.getStoreItem($routeParams.itemID);
		$scope.currStoreItem.$loaded().then(function(){
			$scope.ownerOfItem = Auth.getUser($scope.currStoreItem.userWhoPosted);
			$scope.ownerOfItem.$loaded().then(function(){
				//Set if the user viewing the page owns the item on the page
				if($scope.ownerOfItem.$id == $scope.currentUser.$id){
					$scope.ownsCurrentItem = true;
				}
				else{
					$scope.ownsCurrentItem = false;
				}

			});
		});
	}

	// Function for editing a store page
	$scope.openEditItemModal = (function(){
		$("#editItemModal").modal('show');
	});

	$scope.editStoreItem = (function(){
		
		if(!(Array.isArray($scope.currStoreItem.tags))){
			if($scope.currStoreItem.tags != undefined){
				$scope.tagArray = $scope.currStoreItem.tags.split(",");
			}
		}

		StoreItem.saveStoreItem($scope.currStoreItem).then(function(){

			Auth.addProduct($scope.ownerOfItem.$id, $scope.currStoreItem, $routeParams.itemID);
			
			
		});
		$("#editItemModal").modal('hide');

	});





	//Deletes a store item 
	$scope.deleteThisItem = (function(){
		
		
		Auth.deleteSecondaryProductLocation($scope.currStoreItem.userWhoPosted, $routeParams.itemID).then(function(){
			StoreItem.deleteStoreItem($scope.currStoreItem);
			$("#editItemModal").modal('hide');
			$location.path('/store').replace();
		});
	});



	// Array of Products
	var storeItems = StoreItem.getStoreItems();



	$scope.products = storeItems;

	$scope.storeItem = {};

	// TODO: Adding Time Stamping
	$scope.addStoreItem = function(){
		
		$scope.tagArray = $scope.storeItem.tags.split(",");
		$scope.uid = $scope.currentUser.$id;

		$scope.storeItem.tags = $scope.tagArray;
		$scope.storeItem.userWhoPosted = $scope.uid;
		
		
		StoreItem.addNewStoreItem($scope.storeItem).then(function(newStoreItem){
			$scope.storeItem.itemID = newStoreItem.key;


			productObj = {
				name: $scope.storeItem.name, 
				price: $scope.storeItem.price, 
				itemID: $scope.storeItem.itemID
			}


			Auth.addProduct($scope.currentUser.$id, productObj, $scope.storeItem.itemID);


			
			$location.path('/storeitem/'+$scope.storeItem.itemID).replace();
			$scope.storeItem = {};

		});
		
	};



	// function for sending an email
	$scope.openEmailModal = (function(){
		$("#emailModal").modal('show');
	});


	$scope.sendEmail = (function(emailBody){
		recipientEmail = $scope.ownerOfItem.email;
		subject = "The Merchants Guild: "+$scope.currStoreItem.name;
		$window.open("mailto:"+recipientEmail+"?Subject="+subject+"&body="+emailBody,"_self");
		$("#emailModal").modal('hide');

	});










});





angular.module('merchantsGuild').controller('SearchbarController',function(){


	$("#menu-toggle").click(function(e) {
	    e.preventDefault();
	    $("#wrapper").toggleClass("toggled");
	});


});



