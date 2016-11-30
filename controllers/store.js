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

		console.log($scope.ownerOfItem.$id);
		console.log($scope.currStoreItem);
		console.log($routeParams.itemID);
		StoreItem.saveStoreItem($scope.currStoreItem).then(function(){
			
			console.log($scope.ownerOfItem.$id);
			console.log($scope.currStoreItem);
			console.log($routeParams.itemID);
			Auth.addProduct($scope.ownerOfItem.$id, $scope.currStoreItem, $routeParams.itemID);
			
			
		});
		$("#editItemModal").modal('hide');

	});


	//Deletes a store item 
	$scope.deleteThisItem = (function(){
		
		StoreItem.deleteSecondary($scope.currStoreItem);
		StoreItem.deleteStoreItem($scope.currStoreItem);
		$("#editItemModal").modal('hide');
		$location.path('/store').replace();
	})



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
		
		
		StoreItem.addNewStoreItem($scope.storeItem).then(function(newItem){

			Auth.addProduct($scope.currentUser.$id, $scope.storeItem, $scope.storeItem.itemID);

			$scope.storeItem = {};

		});
		
		$("#submit-item-modal").modal('hide');

		
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



	// For adding reviews
	$scope.review = {};
   
  	$scope.addReview = function(){

    	Auth.addReview($routeParams.userID, $scope.review);

    	$scope.review = {};
  	};  

  	if($routeParams.userID){
  		$scope.userIdOfProfile = Auth.getUser($routeParams.userID);
  		
	  	if($scope.currentUser.$id == $routeParams.userID){
	  		$scope.ownsThisProfile = true;
	  	}
	  	else{
	  		$scope.ownsThisProfile = false;
	  	}		
  	}






});





angular.module('merchantsGuild').controller('SearchbarController',function(){


	$("#menu-toggle").click(function(e) {
	    e.preventDefault();
	    $("#wrapper").toggleClass("toggled");
	});


});


angular.module('merchantsGuild').controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
  });

