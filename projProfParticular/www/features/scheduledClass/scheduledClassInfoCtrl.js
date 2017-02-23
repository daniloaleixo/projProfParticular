angular.module('app.controllers')
.controller('ScheduledClassInfoCtrl', ['$scope', '$stateParams', '$rootScope',
		'LoadingService', 'RequestForClassesService', 'MyScheduledClassesList',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, LoadingService, RequestForClassesService,
		MyScheduledClassesList) {
	var scheduledClassInfoCtrl = this;
	$scope.showButtons = false;

	if($stateParams.typeClass == 'confirm')
		$scope.showButtons = true;
	else 
		$scope.showButtons = false;



	$scope.class = {};
	$scope.class['hour'] = "1/1";

	LoadingService.showLoadingSpinner();

	if($stateParams.typeClass == 'confirm')
	{
		console.log("Confirm");
		RequestForClassesService.classToConfimByIndex($stateParams.index).then(function(result){
			$scope.class = result;
			LoadingService.hideLoading();
		})
	}
	else {
		MyScheduledClassesList.scheduledClassByIndex($stateParams.index).then(function(result){
			$scope.class = result;
			LoadingService.hideLoading();
		})
	}

	$scope.class['hour'] = new Date($scope.class.date);
	

}])

