angular.module('app.controllers')
.controller('HistoryCtrl', ['$scope', '$rootScope', '$stateParams', 'LoadingService', 'MyScheduledClassesList',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $stateParams, LoadingService, MyScheduledClassesList) {
	var historyCtrl = this;
	historyCtrl.myHistoryClasses = [];


	historyCtrl.getHistory = function(){
		LoadingService.showLoadingSpinner();
		MyScheduledClassesList.myHistoryClasses(user.uid).then(function(result){
			historyCtrl.myHistoryClasses = result;	
			LoadingService.hideLoading();
		})
		// historyCtrl.myHistoryClasses = MyScheduledClassesList.myHistoryClasses(user.uid);
	}

	historyCtrl.getHistory();

	// 
	// 			EVENTS
	// 
	$rootScope.$on('LogoutEvent', function(event, args) {
		historyCtrl.myHistoryClasses = [];
	});

	$rootScope.$on('LogInEvent', function(event, args) {
		historyCtrl.getHistory();
	});

}])