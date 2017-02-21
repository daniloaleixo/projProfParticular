angular.module('app.controllers')
.controller('LoadingCtrl', ['$scope', '$stateParams', 'UserInfos', 'LoadingService', 'ToastService', 
				'MyScheduledClassesList', 'ProfessoresList', 
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UserInfos, LoadingService, ToastService, 
				MyScheduledClassesList, ProfessoresList) {
	var loadingCtrl = this;
	var scheduledClassesOK = false;
	
	$scope.getServerInfos = function(){
		getScheduledClasses();
	}
	
	var getProfessorsList = function(){
		setTimeout(function(){
			MyScheduledClassesList.myScheduledClassesAsPromise(user.uid).then(function(result){
				console.log("Tela do loading pegou infos do scheduledClasses");
				scheduledClassesOK = true;
			});
		}, 2000);
	}

	var getScheduledClasses = function(){
		setTimeout(function(){
			MyScheduledClassesList.myScheduledClassesAsPromise(user.uid).then(function(result){
				console.log("Tela do loading pegou infos do scheduledClasses");
				scheduledClassesOK = true;
			});
		}, 2000);
	}


	$scope.getServerInfos();

}])