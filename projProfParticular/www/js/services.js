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

.factory('ProfessoresList', ['LoadingService','ToastService',
	function(LoadingService, ToastService){
		var ProfessoresList = this;
		ProfessoresList.professors = [];

		return {
			all: function(){
				if(ProfessoresList.professors.length == 0) {
					LoadingService.showLoadingSpinner();
					//get all professors
					firebase.database().ref().child('professors')
						.once('value').then(function(snapshot){

						Object.keys(snapshot.val()).forEach(function(professor){
							if(professor) {
								var temp = snapshot.val()[professor];
								// Add UID to the hash
								temp["UID"] = professor;
								ProfessoresList.professors
									.push(temp);
							}
						})
						LoadingService.hideLoading();
					}, function(error){
						ToastService.showToast("Tive problemas para me conectar com o servidor", 
											'long', 'bottom');
						LoadingService.hideLoading();
					});	
				}
				return ProfessoresList.professors;
			},
			updateProfessoresList: function(newProfessoresList){
				ProfessoresList.professors = [];
				newProfessoresList.forEach(function(professor){
					if(professor) ProfessoresList.professors.push(professor);
				})
			},
			getProfessorByUID: function(UID){

				for(var i = 0; i < ProfessoresList.professors.length; i++){
					if(UID.localeCompare(ProfessoresList.professors[i].UID) == 0) 
						return ProfessoresList.professors[i];
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





