angular.module('app.controllers')
.controller('ProfileCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$ionicPopup', 'LoadingService', 
		'UserInfos', '$cordovaCamera','ToastService', 'KeyboardService',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $stateParams, $location, $ionicPopup, LoadingService, UserInfos, $cordovaCamera, 
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

	profileCtrl.oldUserInfos = {
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
		UserInfos.getUserInfos().then(function(result){
			profileCtrl.user = result;
			profileCtrl.oldUserInfos = result;
			LoadingService.hideLoading();
		})
		// profileCtrl.user = UserInfos.getUserInfos();
		// profileCtrl.oldUserInfos = UserInfos.getUserInfos();
	}

	profileCtrl.updateVariables();



	profileCtrl.updateUserInfo = function(){

		console.log("cliquei");
		console.log(profileCtrl.user);

		if(user != null && 
			profileCtrl.user.displayName.length != 0 &&
			profileCtrl.user.email.length != 0 && 
			profileCtrl.user.cellphone.length != 0 && 
			profileCtrl.user.location.address.length != 0 &&
			profileCtrl.user.location.number.length != 0){

			LoadingService.showLoadingUpdating();
			user.updateProfile({
				displayName: profileCtrl.user.displayName,
				email: profileCtrl.user.email
			}).then(function(){
				KeyboardService.hide();
				ToastService.showToast("Seu usuário foi atualizado com sucesso!", 'long', 'bottom');


				firebase.database().ref().child('students').child(user.uid).
				set({
					displayName: profileCtrl.user.displayName,
					email: profileCtrl.user.email,
					cellphone: profileCtrl.user.cellphone,
					locations:{
						main: {
							address: profileCtrl.user.location.address,
							number: profileCtrl.user.location.number,
							complement: profileCtrl.user.location.complement
						}
					}
				});


				UserInfos.getUserInfosForce();
				$scope.$digest();
				LoadingService.hideLoading();
			}, function(error){
				ToastService.showToast("Erro ao atualizar seu usuário!", 'long', 'bottom');
				UserInfos.getUserInfosForce();
				LoadingService.hideLoading();
			});

			LoadingService.hideLoading();
		} else {
			ToastService.showToast("Por favor complete as informações necessárias", 
				'long', 'bottom');
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

   	// profileCtrl.resetNewVariables = function(){
   	// 	profileCtrl.newUserInfos = {
   	// 		displayName: '',
   	// 		photoURL: '',
   	// 		email: '',
   	// 		cellphone: '',
   	// 		location: ''
   	// 	};
   	// };


   	//Show a popup with autocomplete in the address
   	profileCtrl.showPopup = function() {
   		console.log("showPopup");
   	  	$scope.data = {};

   	  	// An elaborate, custom popup
   	  	var myPopup = $ionicPopup.show({
   	    	template: "<ion-google-place ng-model='data.location'>",
   	    	title: 'Digite o endereço',
   	    	scope: $scope,
   	   		 buttons: [
   	      		{ text: 'Cancel' },
   	      		{
   	        		text: '<b>Save</b>',
   	        		type: 'button-positive',
   	        		onTap: function(e) {
   	          			return $scope.data.location;	      
   	        		}
   	      		}
   	    	]
   	 	});

   	  	myPopup.then(function(res) {
   	    	console.log('Tapped!', res);
   	    	profileCtrl.user.location.address = res;
   	  	});
   	};



   	// 
	// 			EVENTS
	// 
	$rootScope.$on('LogoutEvent', function(event, args) {
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

		profileCtrl.oldUserInfos = {
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
	});

	$rootScope.$on('LogInEvent', function(event, args) {
		profileCtrl.updateVariables();
	});




}])