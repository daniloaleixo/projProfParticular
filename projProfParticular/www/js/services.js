angular.module('app.services', [])

.factory('Auth', ['$firebaseAuth',
	function($firebaseAuth){
		return $firebaseAuth();
}])

.factory('UserInfos',[ 'Auth',
	function(Auth){
		var servUser = {
			displayName: '',
			email: '',
			photoURL: ''
		};

		var updateUser = function(){
			servUser.displayName = user.displayName || user.email;
			servUser.photoURL = user.photoURL || 'img/null-avatar.png';
			servUser.email = user.email || '';
		}

		return {
			getDisplayName: function(){
				updateUser();
				return servUser.displayName;
			},
			getPhotoURL: function(){
				updateUser();
				return servUser.photoURL;
			},
			getEmail: function(){
				updateUser();
				return servUser.email;
			},
			getUserInfos: function(){
				updateUser();
				return {
					displayName: servUser.displayName ,
					email: servUser.email,
					photoURL: servUser.photoURL
				}
			}
		}
}])

.factory('ToastService', ['$cordovaToast',
	function($cordovaToast){
		return {
			showToast: function(message, duration, location){
				$cordovaToast.show(message, duration, location).then(function(success) {
				   console.log("The toast was shown");
				}, function (error) {
				   console.log("The toast was not shown due to " + error);
				});
			}
		}
}])

.factory('KeyboardService', [
	function(){
		return {
			hide: function(){
				cordova.plugins.Keyboard.close();
			}
		}
}])

.factory('ProfessoresList', [
	function(){
		var ProfessoresList = this;
		ProfessoresList.professores = [];

		return {
			all: function(){
				return ProfessoresList.professores;
			},
			updateProfessoresList: function(newProfessoresList){
				ProfessoresList.professores = [];
				newProfessoresList.forEach(function(professor){
					if(professor) ProfessoresList.professores.push(professor);
				})
			},
			getProfessorByUID: function(UID){

				for(var i = 0; i < ProfessoresList.professores.length; i++){
					if(UID.localeCompare(ProfessoresList.professores[i].UID) == 0) 
						return ProfessoresList.professores[i];
				}
				return null;
			}
		}
}])


.factory('LoadingService', [ '$ionicLoading',
	function($ionicLoading){
		return {
			showLoadingSpinner: function(){
				$ionicLoading.show({
					template: '<ion-spinner icon="spiral"></ion-spinner>',
					noBackdrop: true
				});
			},
			showLoadingUpdating: function(){
				$ionicLoading.show({
					template: 'Atualizando...',
					noBackdrop: true
				});
			},
			hideLoading: function() {
				$ionicLoading.hide();
			}
		}
}])





