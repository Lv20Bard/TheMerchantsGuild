angular.module('merchantsGuild').factory('Requests',function($firebaseArray, $firebaseObject){

	var requestRef = firebase.database().ref().child("requests");

	var Request = {

		requests: [],

		addNewRequest: function(newRequest){
			return Request.requests.$add(newRequest);
		},

		getRequests: function(){
			return Request.requests;
		},

		getRequest: function(requestID){
			var individualRequestRef = requestRef.child(requestID);
			return $firebaseObject(individualRequestRef);
		},

		saveRequests: function(thisRequest){
			return thisRequest.$save();
		},

		saveSecondaryRequest: function(userID, requestID){
			var secondaryRef  = firebase.database().ref().child('requestListing').child(userID).child(requestID);
			var item = firebaseObject(secondaryRef);
			item.$save();
		},
	
		deleteRequest: function(thisRequest){
			return thisRequest.$remove();
		},

		deleteSecondary: function(userID){
			var secondaryRef  = firebase.database().ref().child('requestListing').child(userID).child(requestID);
			var item = firebaseObject(secondaryRef);
			item.$delete();
		}

	};

	Request.requests = $firebaseArray(requestRef);

	return Request;


});