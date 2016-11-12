appProf
.controller('LoginCtrl', ['$scope', '$stateParams','$location', 'LoadingService', 'ToastService', 
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location, LoadingService, ToastService) {
	
	var loginCtrl = this;

	loginCtrl.user = {
		email: '',
		password: '',
		password2: ''
	};
	loginCtrl.signingUp = false;
	loginCtrl.error = '';



	loginCtrl.login = function(){
		loginCtrl.error = '';

		//restart global variable user
		user = null;

		// Firebase password must've at least 6 characters
		if(loginCtrl.user.password.length < 6 && loginCtrl.user.password.length != 0) {
			ToastService.showToast("A senha deve ter mais de 6 caracteres", 'long', 'bottom');
			return ;
		}	

		if(loginCtrl.signingUp) loginCtrl.register();
		else {
			var trySignIn = firebase.auth().signInWithEmailAndPassword(loginCtrl.user.email, loginCtrl.user.password);
			LoadingService.showLoadingSpinner();

			trySignIn.then(function(auth){
				user = auth;
				LoadingService.hideLoading();
				$location.path('/home');
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
			var tryRegister = firebase.auth().createUserWithEmailAndPassword(loginCtrl.user.email, 
																			loginCtrl.user.password);
			LoadingService.showLoadingSpinner();

			tryRegister.then(function(user){
				LoadingService.hideLoading();
				// Already registrated, just have to login
				loginCtrl.login();
			},function(error){
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

		  	LoadingService.hideLoading();
		  	$location.path('/home');

		}).catch(function(error){
			// Handle Errors here.
		  	/*var errorCode = error.code;
		  	loginCtrl.error = error.message;*/
		  	ToastService.showToast("Não consegui realizar o login, por favor tente novamente", 
		  								'long', 'bottom');
		  	LoadingService.hideLoading();
		});
	};



}]);