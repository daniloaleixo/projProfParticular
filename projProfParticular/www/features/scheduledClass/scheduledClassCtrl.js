angular.module('app.controllers')
.controller('ScheduledClassCtrl', ['$scope', '$rootScope', '$stateParams', 
	'MyScheduledClassesList','LoadingService', 'RequestForClassesService',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $stateParams, MyScheduledClassesList, LoadingService,
			RequestForClassesService) {
	var scheduledClassCtrl = this;
	scheduledClassCtrl.myScheduledClasses = [];
	scheduledClassCtrl.toConfirmClasses = [];


	scheduledClassCtrl.myScheduledClasses = [{
			"status": "Pendente",
			"UIDRequested":"MqhNsmQB69XOR8uUjGKXtvEoP002",
			"students":{
				"MqNhsmQB69XOR8uUjGKXtvEoP002":{
					"displayName":"Bla",
					"photoURL":""
				}
			},
			"date":"Mon Sep 7 2017 19:00:00 GMT-0300 (BRT)",
			"duration":"2",
			"location":{
				"address":"Av. Senador Vergueiro - Anchieta, São Bernardo do Campo - State of São Paulo, Brazil",
				"number":"180",
				"complement":"142A"
			},
			"course":{
				"2-7":"História"
			},
			"description":"Quero aprender sobre história do Brasil"
		},
		{
			"status": "Pendente",
			"UIDRequested":"MqhNsmQB69XOR8uUjGKXtvEoP002",
			"students":{
				"MqNhsmQB69XOR8uUjGKXtvEoP002":{
					"displayName":"Bla",
					"photoURL":""
				}
			},
			"date":"Mon Sep 8 2017 19:00:00 GMT-0300 (BRT)",
			"duration":"2",
			"location":{
				"address":"Av. Senador Vergueiro - Anchieta, São Bernardo do Campo - State of São Paulo, Brazil",
				"number":"180",
				"complement":"142A"
			},
			"course":{
				"2-7":"História"
			},
			"description":"Quero aprender sobre história da America"
		}];
	scheduledClassCtrl.toConfirmClasses = [{
	      "UIDRequested" : "MqhNsmQB69XOR8uUjGKXtvEoP002",
	      "course" : {
	        "courseCode" : "Física"
	      },
	      "date" : "Sat Apr 01 2017 16:00:00 GMT-0300 (BRT)",
	      "description" : "dasdsaasdasda",
	      "duration" : "2",
	      "location" : {
	        "address" : "Av. Senador Vergueiro - Anchieta, São Bernardo do Campo - State of São Paulo, Brazil",
	        "number" : 32213
	      },
	      "professor" : {
	        "UID" : "8B1eYE4JZ8MYTpVjYBZFlhGJBO52",
	        "displayName" : "Danilo Aleixo",
	        "photoURL" : "https://lh6.googleusercontent.com/-sjP2tqfdCTw/AAAAAAAAAAI/AAAAAAAADF8/pQqKYkuBcE4/photo.jpg"
	      },
	      "status" : "Aguardando confirmação do aluno",
	      "students" : {
	        "MqhNsmQB69XOR8uUjGKXtvEoP002" : {
	          "displayName" : "blaaa1234"
	        }
	      }
	    }];


	var scheduledOK = false, toConfirmOK = false;


	scheduledClassCtrl.moreInfoClassToConfirm = function(){
		console.log("cliquei na funcao moreInfoClassToConfirm");
	}

	scheduledClassCtrl.buttonOne = function(){
		console.log("cliquei na funcao buttonOne");
	}


	scheduledClassCtrl.init = function(){
		LoadingService.showLoadingSpinner();
		//Get scheduled classes
		MyScheduledClassesList.myScheduledClasses(user.uid).then(function(result){
			scheduledClassCtrl.myScheduledClasses = result;	
			scheduledOK = true;
			checkIfItsOver();
		});
		//Get to confirm classes
		RequestForClassesService.myRequestedClasses(user.uid).then(function(result){
			scheduledClassCtrl.toConfirmClasses = result;
			console.log(scheduledClassCtrl.toConfirmClasses);
			toConfirmOK = true;
			checkIfItsOver();
		});
	}
	
	//scheduledClassCtrl.init();


	var checkIfItsOver = function() {
		if(scheduledOK && toConfirmOK)
			LoadingService.hideLoading();
	}


	// 
	// 			EVENTS
	// 
	$rootScope.$on('LogoutEvent', function(event, args) {
		scheduledClassCtrl.myScheduledClasses = [];
		scheduledClassCtrl.toConfirmClasses = [];
		scheduledOK = false; 
		toConfirmOK = false;
	});

	$rootScope.$on('LogInEvent', function(event, args) {
		scheduledClassCtrl.init();
	});


}])