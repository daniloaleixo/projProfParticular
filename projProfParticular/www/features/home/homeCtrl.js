angular.module('app.controllers')
.controller('HomeCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$q', 'UserInfos', 
	'LoadingService', 'ToastService', 'MyScheduledClassesList', 'RequestForClassesService',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $stateParams, $location, $q, UserInfos, LoadingService, ToastService, 
				MyScheduledClassesList, RequestForClassesService) {
	var homeCtrl = this;

	homeCtrl.user = {
		displayName: '',
		email: '',
		photoURL: '',
		cellphone: '',
		location: {
				address : '',
				number: '',
				complement: ''
			}
	}

	homeCtrl.nextClass = {};
	homeCtrl.classesToConfirm = false;

	homeCtrl.init = function(){
		LoadingService.showLoadingSpinner();

		UserInfos.getUserInfos().then(function(result){
			console.log("Esperei pelas infos do usuario");
			homeCtrl.user = result;
			console.log(homeCtrl.user);
			//Verify if the user need to fill the other infos
			if( (homeCtrl.user.cellphone != undefined && homeCtrl.user.cellphone.length == 0) || 
			(homeCtrl.user.location.address != undefined && homeCtrl.user.location.address.length == 0)){
				console.log("O usuario nao tem celular ou address");

				ToastService.showToast("Por favor preencha as informações", 
													'long', 'bottom');
				$location.path('/side-menu21/profile');

			}
			// Get the user next class
			homeCtrl.nextClass = MyScheduledClassesList.getNextScheduledClass(user.uid);
			homeCtrl.classesToConfirm = RequestForClassesService.areThereClassesToConfirm();
			console.log(homeCtrl.classesToConfirm);
			LoadingService.hideLoading();
		}, function(error){
			console.log(error);
			LoadingService.hideLoading();
		})	


	}

	homeCtrl.init();

	homeCtrl.goToScheduledClassPage = function(){
		$location.path('/side-menu21/scheduledClass');
	}

	

	// 
	// 			EVENTS
	// 
	$rootScope.$on('LogoutEvent', function(event, args) {
		homeCtrl.user = {
				displayName: '',
				email: '',
				photoURL: '',
				cellphone: '',
				location: {
						address : '',
						number: '',
						complement: ''
					}
			}

			homeCtrl.nextClass = {};
			homeCtrl.classesToConfirm = false;
	});

	$rootScope.$on('LogInEvent', function(event, args) {
		homeCtrl.init();
	});
	

	
}])