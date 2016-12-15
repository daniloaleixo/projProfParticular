angular.module('app.controllers')
.controller('ScheduledClassCtrl', ['$scope', '$stateParams', 'MyScheduledClassesList','LoadingService',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, MyScheduledClassesList, LoadingService) {
	var scheduledClassCtrl = this;
	scheduledClassCtrl.myScheduledClasses = [];


	scheduledClassCtrl.getScheduledClasses = function(){
		LoadingService.showLoadingSpinner();
		MyScheduledClassesList.myScheduledClasses(user.uid).then(function(result){
			scheduledClassCtrl.myScheduledClasses = result;
			LoadingService.hideLoading();
		}, function(error){
			ToastService.showToast("Desculpe não consegui obter as próximas aulas", 
								'long', 'bottom');
			console.log(error);
			LoadingService.hideLoading();
		});
	}

	scheduledClassCtrl.getNextClasses = function(){
		scheduledClassCtrl.getScheduledClasses();
	}

	scheduledClassCtrl.getNextClasses();


}])