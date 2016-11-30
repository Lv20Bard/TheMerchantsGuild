angular.module('merchantsGuild').factory('StoreItem',function($firebaseArray, $firebaseObject){

	var storeItemRef = firebase.database().ref().child("storeItems");

	var StoreItem = {

		storeItems: [],

		addNewStoreItem: function(newStoreItem){
			return StoreItem.storeItems.$add(newStoreItem);
		},

		getStoreItems: function(){
			return StoreItem.storeItems;
		},

		getStoreItem: function(storeItemID){
			var individualStoreItemRef = storeItemRef.child(storeItemID);
			return $firebaseObject(individualStoreItemRef);
		},

		saveStoreItem: function(thisStoreItem){
			return thisStoreItem.$save();
		},


		deleteStoreItem: function(thisStoreItem){
			return thisStoreItem.$remove();
		},

	


	};

	StoreItem.storeItems = $firebaseArray(storeItemRef);

	return StoreItem;


});