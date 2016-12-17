angular.module('app.controllers')
.controller('MenuCtrl', ['$scope', '$stateParams', '$location', 'UserInfos',
							'$ionicSideMenuDelegate', 'ToastService', 
							'MyScheduledClassesList', 'ProfessoresList', 
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location, UserInfos, $ionicSideMenuDelegate, 
	ToastService, MyScheduledClassesList, ProfessoresList) {
	var menuCtrl = this;

	// menuCtrl.user = {
	// 	displayName: '',
	// 	photoURL: '',
	// 	email: ''
	// };

	menuCtrl.updateVariables = function(){
		// menuCtrl.user = UserInfos.getUserInfos();

		// Agora o menu vai chamar todos os requests para o DB assim quando o usuario estiver 
		// entrando na pagina que necessita essa info nao precisará fazer outra requisicao
		UserInfos.getUserInfos();
		MyScheduledClassesList.myScheduledClasses(user.uid);
		ProfessoresList.all();
	}

	menuCtrl.updateVariables();

	menuCtrl.logout = function(){
		firebase.auth().signOut().then(function() {
		  	user = null;
	  	  	menuCtrl.user.displayName = null;
	  		menuCtrl.user.photoURL = null;
	  		menuCtrl.user.email = null;
		  	$location.path('/login');
		  	$ionicSideMenuDelegate.toggleLeft();
		  	return true;
		}, function(error) {
		  	ToastService.showToast("Não consegui fazer o logout", 'long', 'bottom');
		  	return false;
		});
	}

}])