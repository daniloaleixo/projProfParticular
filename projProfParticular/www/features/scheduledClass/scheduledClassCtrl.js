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

	var scheduledOK = false, toConfirmOK = false;


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
	
	scheduledClassCtrl.init();


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