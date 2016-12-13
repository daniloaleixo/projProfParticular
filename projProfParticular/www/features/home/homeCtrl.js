angular.module('app.controllers')
.controller('HomeCtrl', ['$scope', '$stateParams', 'UserInfos',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UserInfos) {
	var homeCtrl = this;

	homeCtrl.user = {
		displayName: '',
		email: '',
		photoURL: '',
		cellphone: '',
		location: ''
	}

	

	homeCtrl.user = UserInfos.getUserInfos();

	// console.log(homeCtrl.user);

	// if(homeCtrl.user.cellphone.length == 0 && homeCtrl.user.location.length == 0){
		
	// }
	

	
}])