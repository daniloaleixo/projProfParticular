angular.module('app.controllers')
.controller('LoginCtrl', ['$scope', '$rootScope', '$stateParams','$location', 'LoadingService', 'ToastService', 
				'MyScheduledClassesList', 'ProfessoresList', 'CoursesOfferedList', 'UserInfos',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $stateParams, $location, LoadingService, ToastService,
	MyScheduledClassesList, ProfessoresList, CoursesOfferedList, UserInfos) {
	
	var loginCtrl = this;

	var trySignIn = null;
	var tryRegister = null;

	loginCtrl.user = {
		email: '',
		password: '',
		password2: ''
	};
	loginCtrl.signingUp = false;
	loginCtrl.error = '';





	loginCtrl.login = function(){
		loginCtrl.error = '';

		// console.log("Chamei o login");

		//restart global variable user
		user = null;

		// Firebase password must've at least 6 characters
		if(loginCtrl.user.password.length < 6 && loginCtrl.user.password.length != 0) {
			ToastService.showToast("A senha deve ter mais de 6 caracteres", 'long', 'bottom');
			return ;
		}	

		if(loginCtrl.signingUp) loginCtrl.register();
		else {
			trySignIn = firebase.auth().signInWithEmailAndPassword(loginCtrl.user.email, loginCtrl.user.password);
			LoadingService.showLoadingSpinner();

			trySignIn.then(function(auth){
				user = auth;
				// updateVariables();
				LoadingService.hideLoading();
				$rootScope.$emit("LogInEvent", {});
				$location.path('/loading');
			}, function(error){
				ToastService.showToast("Não consegui realizar o login, por favor tente novamente", 
						  								'long', 'bottom');
				LoadingService.hideLoading();
			});
		}
	};

	loginCtrl.register = function(){

		// Verify if passwords are equal
		if(loginCtrl.user.password != loginCtrl.user.password2){
			ToastService.showToast("As senhas não coincidem", 'long', 'bottom');
		} else if(loginCtrl.user.password.length < 6 && loginCtrl.user.password.length != 0) {
			ToastService.showToast("A senha deve ter mais de 6 caracteres", 'long', 'bottom');
		}
		else {
			LoadingService.showLoadingSpinner();
			firebase.auth()
			.createUserWithEmailAndPassword(loginCtrl.user.email, loginCtrl.user.password)
			.then(function(user){
				LoadingService.hideLoading();
				// Already registrated, just have to login
				loginCtrl.signingUp = false;
				loginCtrl.login();
			},function(error){
				if(error.code == 'auth/email-already-in-use')
					ToastService.showToast("O email escolhido já esta em uso", 
											'long', 'bottom');
				else
					ToastService.showToast("Não consegui realizar o cadastro, por favor tente novamente", 
											'long', 'bottom');
				LoadingService.hideLoading();
			})
		} 
	};

	loginCtrl.googleLogin = function(){
		//restart global variable user
		user = null;

		var provider = new firebase.auth.GoogleAuthProvider();

  		var tryGoogleSignIn = firebase.auth().signInWithPopup(provider);
  		LoadingService.showLoadingSpinner();

  		tryGoogleSignIn.then(function(result) {
		  	// This gives you a Google Access Token. You can use it to access the Google API.
		  	var token = result.credential.accessToken;
		  	// The signed-in user info.
		  	user = result.user;
		  	// updateVariables();

		  	LoadingService.hideLoading();
		  	$rootScope.$emit("LogInEvent", {});
		  	$location.path('/loading');

		}).catch(function(error){
			// Handle Errors here.
		  	/*var errorCode = error.code;
		  	loginCtrl.error = error.message;*/
		  	console.log("nao consegui");

		  	ToastService.showToast("Não consegui realizar o login, por favor tente novamente", 
		  								'long', 'bottom');
		  	LoadingService.hideLoading();
		});
	};

	// Esta função esta deprecada, agora puxo as infos pela tela de Loading
	// var updateVariables = function(){
	// 	// menuCtrl.user = UserInfos.getUserInfos();

	// 	console.log("Estou no login e Vou puxar todas as infos");

	// 	// Agora o menu vai chamar todos os requests para o DB assim quando o usuario estiver 
	// 	// entrando na pagina que necessita essa info nao precisará fazer outra requisicao
	// 	UserInfos.getUserInfos();
	// 	MyScheduledClassesList.myScheduledClasses(user.uid);
	// 	ProfessoresList.all();
	// 	CoursesOfferedList.all();
	// }



}]);