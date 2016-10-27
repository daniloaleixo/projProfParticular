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
	           sourceType : Camera.PictureSourceType.CAMERA,
	           allowEdit : true,
	           encodingType: Camera.EncodingType.JPEG,
	           popoverOptions: CameraPopoverOptions,
	           targetWidth: 500,
	           targetHeight: 500,
	           saveToPhotoAlbum: false
	       };

	       $cordovaCamera.getPicture(options).then(function(imageData) {
	       		console.log("ProfileCtrl| Consegui pegar a imagem");
	       		ToastService.showToast("Consegui pegar a imagem", 'long', 'bottom');

	       }, function(error) {
	           console.error(error);
	       });
	   }


}])