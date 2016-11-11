appProf
.controller('ProfileCtrl', ['$scope', '$stateParams', '$location', '$ionicLoading', 
		'UserInfos', '$cordovaCamera','ToastService', 'KeyboardService',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $location, $ionicLoading, UserInfos, $cordovaCamera, 
	ToastService, KeyboardService) {
	var profileCtrl = this;
	var storage = firebase.storage();

	// Points to the root reference
	var storageRef = firebase.storage().ref();

	// Points to 'images'
	var imagesRef = storageRef.child('images');

	var userImagesRef = imagesRef.child(user.uid);

	//console.log("ProfileCtrl| "+ userImagesRef);


	profileCtrl.user = {
		displayName: '',
		photoURL: '',
		email: ''
	};

	//console.log("ProfileCtrl | Vou imprimir do service" + UserInfos.getDisplayName());

	profileCtrl.newUserInfos = {
		displayName: '',
		photoURL: '',
		email: ''
	};

	var showLoading = function(){
		$ionicLoading.show({
			template: 'Atualizando...',
			noBackdrop: true
		});
	}

	var hideLoading = function(){
		$ionicLoading.hide();
	}


	profileCtrl.updateVariables = function(){
		if(user != null){
			profileCtrl.user = UserInfos.getUserInfos();
		}
	}

	profileCtrl.updateVariables();

	profileCtrl.changeDisplayName = function(){
		console.log("ProfileCtrl| changeDisplayName - > Estou aqui");

		if(profileCtrl.newUserInfos.displayName != '' && user != null){
			showLoading();
			user.updateProfile({
				displayName: profileCtrl.newUserInfos.displayName
			}).then(function(){
				KeyboardService.hide();
				ToastService.showToast("Seu nome de usuário foi atualizado com sucesso!", 'long', 'bottom');
				// cordova.plugins.Keyboard.close();
				profileCtrl.newUserInfos.displayName = '';
				profileCtrl.updateVariables();
				$scope.$digest();
				hideLoading();
			}, function(error){
				console.log("ProfileCtrl |Erro ao atualizar Display Name");
				ToastService.showToast("Erro ao atualizar seu nome de usuário!", 'long', 'bottom');
				profileCtrl.updateVariables();
				hideLoading();
			});
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


}])