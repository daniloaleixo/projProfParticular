angular.module('app.controllers')
.controller('ProfileCtrl', ['$scope', '$stateParams', '$location', 'LoadingService', 
		'UserInfos', '$cordovaCamera','ToastService', 'KeyboardService',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location, LoadingService, UserInfos, $cordovaCamera, 
	ToastService, KeyboardService) {
	var profileCtrl = this;
	var storage = firebase.storage();

	// Points to the root reference
	var storageRef = firebase.storage().ref();

	// Points to 'images'
	var imagesRef = storageRef.child('images');

	var userImagesRef = imagesRef.child(user.uid);


	profileCtrl.user = {
		displayName: '',
		photoURL: '',
		email: '',
		cellphone: '',
		location: {
			address : '',
			number: '',
			complement: ''
		}
	};

	profileCtrl.newUserInfos = {
		displayName: '',
		photoURL: '',
		email: '',
		cellphone: '',
		location: {
			address : '',
			number: '',
			complement: ''
		}
	};


	profileCtrl.updateVariables = function(){
		LoadingService.showLoadingSpinner();
		// UserInfos.getUserInfos().then(function(result){
		// 	console.log(result);
		// 	profileCtrl.user = result;
		// 	LoadingService.hideLoading();
		// }, function(error){
		// 	ToastService.showToast("Desculpe não consegui obter as informações do usuário", 
		// 						'long', 'bottom');
		// 	console.log(error);
		// 	LoadingService.hideLoading();
		// });
		profileCtrl.user = UserInfos.getUserInfos();
		LoadingService.hideLoading();
	}

	profileCtrl.updateVariables();



	profileCtrl.updateUserInfo = function(){

		console.log("cliquei");

		if(user != null && 
			profileCtrl.newUserInfos.displayName != ''){

			LoadingService.showLoadingUpdating();

			// user.updateProfile({
			// 	displayName: profileCtrl.newUserInfos.displayName 
			// 					|| profileCtrl.user.displayName,
			// 	email: profileCtrl.newUserInfos.email
			// 					|| profileCtrl.user.email,
			// 	cellphone: profileCtrl.newUserInfos.cellphone
			// 					|| profileCtrl.user.cellphone
			// 	// TODO colocar a localizacao
			// 	// location: profileCtrl.newUserInfos.displayName
			// }).then(function(){
			// 	KeyboardService.hide();
			// 	ToastService.showToast("Seu nome de usuário foi atualizado com sucesso!", 'long', 'bottom');
			// 	// cordova.plugins.Keyboard.close();
			// 	profileCtrl.resetNewVariables();
			// 	profileCtrl.updateVariables();
			// 	$scope.$digest();
			// 	LoadingService.hideLoading();
			// }, function(error){
			// 	console.log("ProfileCtrl |Erro ao atualizar Display Name");
			// 	ToastService.showToast("Erro ao atualizar seu nome de usuário!", 'long', 'bottom');
			// 	profileCtrl.resetNewVariables();
			// 	profileCtrl.updateVariables();
			// 	LoadingService.hideLoading();
			// });
		}
	};

	profileCtrl.uploadImage = function() {

	       var options = {
	           quality : 75,
	           destinationType : Camera.DestinationType.DATA_URL,
	           sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
	           allowEdit : true,
	           encodingType: Camera.EncodingType.JPEG,
	           targetWidth: 500,
	           targetHeight: 500
	       };

	       $cordovaCamera.getPicture(options)
	       		.then(profileCtrl.uploadImageFirebase, profileCtrl.uploadError);


	       /*.then(function(imageData) {
	       		console.log("ProfileCtrl| Consegui pegar a imagem");

	       		//showLoading();

	       		// Upload the image to Firebase Storage.
	       		ToastService.showToast("Vou tentar subir a imagem", 'long', 'bottom');

				ToastService.showToast(imageData.type, 'long', 'bottom');	       		


	       		var uploadTask = userImagesRef.ref('/' + imageData.name)
   		        					.put(imageData, {contentType: 'image/jpeg'});



   		        /*
   		        .then(function(snapshot) {
   		        	ToastService.showToast("To aqui no then", 'long', 'bottom');
   		            // Get the file's Storage URI
   		            var imagePath = snapshot.metadata.fullPath;
   		            // Falta atualizar 
   		          //  hideLoading();
   		            ToastService.showToast("Imagem atualizada com sucesso", 'long', 'bottom');
   		        }, function(error) {
   		        	//hideLoading();
   		          	ToastService.showToast("Erro ao fazer o upload da imagem", 'long', 'bottom');
   		        });*


	       }, function(error) {
	           console.error(error);
	       });*/
	   }



   /* Funcoes auxiliares */

   
   	profileCtrl.uploadImageFirebase = function(imagePath){
   		var sourceDir = imagePath.substring(0, imagePath.lastIndexOf('/') + 1),
		        sourceFile = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length),
		        fileName = new Date().valueOf() + sourceFile;


		    $cordovaFile.readAsArrayBuffer(sourceDir, sourceFile)
		        .then(function(success) {
		            var blob = new Blob([success], {type: 'image/jpeg'});
		            ToastService.showToast("Consegui o blob", 'long', 'bottom');
		            //enviarFirebase(blob, nombreParaGuardar);
		        }, function (error) {
		            console.error(error);
		        });
   	}

   	profileCtrl.uploadError = function(error){
   		console.log("Erro");
   	}

   	profileCtrl.resetNewVariables = function(){
   		profileCtrl.newUserInfos = {
   			displayName: '',
   			photoURL: '',
   			email: '',
   			cellphone: '',
   			location: ''
   		};
   	}



}])