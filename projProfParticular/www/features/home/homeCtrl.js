angular.module('app.controllers')
.controller('HomeCtrl', ['$scope', '$stateParams', '$location', '$q', 'UserInfos', 
	'LoadingService', 'ToastService',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location, $q, UserInfos, LoadingService, ToastService) {
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

	homeCtrl.getUserInfos = function(){
		LoadingService.showLoadingSpinner();
		homeCtrl.user = UserInfos.getUserInfos();

		if(homeCtrl.user.cellphone.length == 0 || homeCtrl.user.location.address.length == 0){
			console.log(homeCtrl.user);
			console.log("O usuario nao tem celular ou address");

			// ToastService.showToast("Por favor preencha as informações", 
			// 									'long', 'bottom');
			$location.path('/side-menu21/profile');

		}

		LoadingService.hideLoading();
		


	}

	homeCtrl.getUserInfos();

	// homeCtrl.user = UserInfos.getUserInfos();

	// console.log(homeCtrl.user);

	

	
}])