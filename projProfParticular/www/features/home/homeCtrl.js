angular.module('app.controllers')
.controller('HomeCtrl', ['$scope', '$stateParams', '$location', '$q', 'UserInfos', 'LoadingService',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location, $q, UserInfos, LoadingService) {
	var homeCtrl = this;

	homeCtrl.user = {
		displayName: '',
		email: '',
		photoURL: '',
		cellphone: '',
		location: ''
	}

	homeCtrl.getUserInfos = function(){
		LoadingService.showLoadingSpinner();

		UserInfos.getUserInfos().then(function(result){
			console.log("reuslt")
			console.log(result);
			homeCtrl.user = result;
			console.log("agora esperei");
			console.log(homeCtrl.user);
			if(homeCtrl.user.cellphone.length == 0 && homeCtrl.user.location.length == 0){
				console.log("estou aqui");
				console.log("celular " + homeCtrl.user.cellphone);
			}
			LoadingService.hideLoading();
		});
		


	}

	// homeCtrl.getUserInfos();

	// homeCtrl.user = UserInfos.getUserInfos();

	// console.log(homeCtrl.user);

	

	
}])