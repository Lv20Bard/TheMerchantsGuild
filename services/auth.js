angular.module('merchantsGuild').factory('Auth', function($firebaseAuth, $firebaseObject, $firebaseArray) {

	var auth = $firebaseAuth();
	var loggedIn = false;

	auth.$onAuthStateChanged(function(firebaseUser) {
		if (firebaseUser) {
			Auth.user = firebaseUser;
		} else {
			
		}
	});


	var Auth = {
		user: {},

		loginWithFacebook: function() {
			return auth.$signInWithPopup("facebook");
		},

		loginWithGoogle: function(){
			return auth.$signInWithPopup("google");
		},

		isLoggedIn: function() {
			return Auth.user != {};
		},

		getAuth: function(){
			return auth;
		},

		checkUser: function(user){
			var ref = firebase.database().ref().child('profiles').child(user.uid);
			
			var theUser = $firebaseObject(ref);
			theUser.$loaded().then(function(){
				

				theUser.display_name = user.displayName;
				theUser.email = user.email;
				theUser.photoURL = user.photoURL;

				
				theUser.$save();

			});


			return theUser;
		},


		// Function to add a product to a user object
		addReview: function(userID, review){
			var ref = firebase.database().ref().child('profiles').child(userID);

			var theUser = $firebaseObject(ref);
			theUser.$loaded().then(function(){

				if(!Array.isArray(theUser.userReviews)){
					theUser.userReviews = [review];
				}	
				else{
					theUser.userReviews.push(review);
				}


				theUser.$save()
			});

		},

		// Function to add products to a user profile
		addProduct: function(userID, product, productID){
			var listingRef = firebase.database().ref().child('productListing').child(userID).child(productID);
			
			console.log(userID);
			console.log(listingRef);

			var listing = $firebaseObject(listingRef);
			console.log(listing);
			console.log(product);

			listing.description = product.description;
			listing.itemID = product.itemID;
			listing.location = product.location;
			listing.name = product.name;
			listing.price = product.price;
			listing.specs = product.specs;
			listing.tags = product.tags;
			listing.userWhoPosted = product.userWhoPosted;
			
			console.log(listing);
			return listing.$save();
		

		},

		// Fucntion that adds requests to a user profile for viewing later
		addRequest: function(userID, request, requestID){
			var listingRef = firebase.database().ref().child('requestListings').child(userID).child(requestID);



			var listing = $firebaseObject(listingRef);

			

			listing.description = request.description;
			listing.itemID = request.itemID;
			listing.location = request.location;
			listing.name = request.name;
			listing.price = request.price;
			listing.specs = request.specs;
			listing.tags = request.tags;
			listing.userWhoPosted = request.userWhoPosted;
			

			

			listing.$save();		

		},


		getSecondaryDirectory: function(userUD){
			var listingRef = firebase.database().ref().child('requestListings').child(userID);

			var listing = $firebaseArray(listingRef);
		},


		// fetch user data
		getUser: function(userID){
			var ref = firebase.database().ref().child('profiles').child(userID);
			var theUser = $firebaseObject(ref);

			return theUser;
		},

		// logout
		logout: function(){
			return auth.$signOut();
		}

	};



	return Auth;
});