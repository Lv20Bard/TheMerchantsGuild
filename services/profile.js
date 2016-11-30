angular.module('merchantsGuild').factory('Profile',function($firebaseArray, $firebaseObject){

	var profileRef = firebase.database().ref().child("profiles");


	var Profile = {

		profiles: [],

		addNewProfile: function(newProfile){
			return Profile.profiles.$add(newProfile);
		},

		getProfiles: function(){
			return Profile.profiles;
		},

		getProfile: function(userID){
			var individualProfileRef = profileRef.child(userID);
			return $firebaseObject(individualProfileRef);
		},

		saveProfile: function(thisProfile){
			return thisProfile.$save();
		}


	
	};

	Profile.profiles = $firebaseArray(profileRef);

	return Profile;
});