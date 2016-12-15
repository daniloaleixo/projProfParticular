angular.module('app.services', [])

.factory('Auth', ['$firebaseAuth',
	function($firebaseAuth){
		return $firebaseAuth();
}])

.factory('UserInfos',[ 'Auth', 'ToastService', 'LoadingService', '$q', '$timeout',
	function(Auth, ToastService, LoadingService, $q, $timeout){
		var servUser = {
			displayName: '',
			email: '',
			photoURL: '',
			cellphone: '',
			location: ''
		};

		var updateUser = function(){
			servUser.displayName = user.displayName || user.email;
			servUser.photoURL = user.photoURL || 'img/null-avatar.png';
			servUser.email = user.email || '';
			if(servUser.cellphone.length == 0 && servUser.location.length == 0){
				// LoadingService.showLoadingSpinner();
				//Let's get the cellphone and location at the database

				firebase.database().ref()
				.child('students').child(user.uid)
						.once('value').then(function(snapshot){
							servUser.cellphone = snapshot.val().cellphone || ''; 
							servUser.location = snapshot.val().location || '';
							// LoadingService.hideLoading();
						}, function(error){
							ToastService
							.showToast("Tive problemas para me conectar com o servidor", 
												'long', 'bottom');
							// LoadingService.hideLoading();
						})
			}
			return servUser;

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
				var deferred = $q.defer();
				$timeout(function(){
					deferred.resolve(updateUser());
				}, 2000);
				// updateUser();
				return deferred.promise;
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
						});
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



.factory('MyScheduledClassesList', ['LoadingService','ToastService', '$q', '$timeout',
	function(LoadingService, ToastService, $q, $timeout){
		var MyScheduledClassesList = this;
		MyScheduledClassesList.scheduledClasses = [];

		var updateClasses = function(uid){
			if(MyScheduledClassesList.scheduledClasses.length == 0)
			{
				LoadingService.showLoadingSpinner();
				//Search for all the scheduled classes that starts with the user uid
				firebase.database().ref().child('scheduledClasses').orderByKey()
				.startAt(uid).once('value').then(function(snapshot){

					Object.keys(snapshot.val()).forEach(function(scheduledClass){
						// Go through each scheduledClass in the hash
						MyScheduledClassesList.scheduledClasses
							.push(snapshot.val()[scheduledClass])
					});
					sortByDate();
					LoadingService.hideLoading();
				}, function(error){
					ToastService.showToast("Tive problemas para me conectar com o servidor", 
										'long', 'bottom');
					LoadingService.hideLoading();
				});	
			}

			return MyScheduledClassesList.scheduledClasses;
		}

		var sortByDate = function(){
			//Transform in dateTime object
			for(var i = 0; i < MyScheduledClassesList.scheduledClasses.length; i++){
				MyScheduledClassesList.scheduledClasses[i].hour = 
					new Date(MyScheduledClassesList.scheduledClasses[i].hour);
				console.log(MyScheduledClassesList.scheduledClasses[i].hour);
			}
			//Sort by day
			MyScheduledClassesList.scheduledClasses.sort(function(a,b) {
			    return a.hour - b.hour;
			});
		}

		return {
			myScheduledClasses: function(uid){

				var deferred = $q.defer();
				$timeout(function(){
					deferred.resolve(updateClasses(uid));
				}, 2000);
				return deferred.promise;
			}
		}
}])



