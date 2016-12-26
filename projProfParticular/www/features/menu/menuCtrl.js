angular.module('app.controllers')
.controller('MenuCtrl', ['$scope', '$stateParams', '$location', 'UserInfos',
							'$ionicSideMenuDelegate', 'ToastService', 
							'MyScheduledClassesList', 'ProfessoresList', 'CoursesOfferedList',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location, UserInfos, $ionicSideMenuDelegate, 
	ToastService, MyScheduledClassesList, ProfessoresList, CoursesOfferedList) {
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
		CoursesOfferedList.all();
	}

	console.log("entrei no menuCtrl");
	menuCtrl.updateVariables();


	menuCtrl.logout = function(){
		firebase.auth().signOut().then(function() {
		  	user = null;
		  	resetAllVariables();
		  	$location.path('/login');
		  	$ionicSideMenuDelegate.toggleLeft();
		  	return true;
		}, function(error) {
		  	ToastService.showToast("Não consegui fazer o logout", 'long', 'bottom');
		  	return false;
		});
	}


	var resetAllVariables = function(){
		ProfessoresList.reset();
		MyScheduledClassesList.reset();
		UserInfos.reset();
		CoursesOfferedList.reset();
	}

}])