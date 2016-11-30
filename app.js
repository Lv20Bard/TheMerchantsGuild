
var app = angular.module('merchantsGuild',[
	'ngRoute',
	'ngAnimate',
	'ngTouch',
	'firebase'
]);



app.config(function($routeProvider){
	$routeProvider

	// Sweet launch page
	.when('/',{
		templateUrl:'pages/launchpage.html',
		controller: 'StoreController',
		resolve: {
			AuthWaitForLogged: function(Auth){
				return Auth.getAuth().$waitForSignIn();
			}
		}

	})

	// the main store page for buying items
	.when('/store',{
		templateUrl:'pages/store.html',
		controller:'StoreController',
		resolve: {
			AuthWaitForLogged: function(Auth){
				return Auth.getAuth().$waitForSignIn();
			}
		}
	})

	// This is the requests section, like the store but to ask 
	//to have items made rather then sell items you made
	.when('/requests',{
		templateUrl: 'pages/requests.html',
		controller:'RequestsController',
		resolve:{
			AuthWaitForLogged:function(Auth){
				return Auth.getAuth().$waitForSignIn();
			}
		}
	})

	//Page for the individual store items, uses a key as the url
	.when('/storeitem/:itemID',{
		templateUrl: 'pages/itempage.html',
		controller:'StoreController',
		resolve:{
			AuthWaitForLogged:function(Auth){
				return Auth.getAuth().$waitForSignIn();
			}
		}
	})


	.when('/requestitem/:requestID',{
		templateUrl:'pages/requestpage.html',
		controller:'RequestsController',
		resolve:{
			AuthWaitForLogged:function(Auth){
				return Auth.getAuth().$waitForSignIn();
			}
		}
	})


	.when('/profile/:userID',{
		templateUrl:'pages/profilepage.html',
		controller:'ProfileController',
		resolve:{
			AuthWaitForLogged:function(Auth){
				return Auth.getAuth().$waitForSignIn();
			}
		}
	})




	.otherwise('/')

});





