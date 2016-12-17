angular.module('app.services', [])

.factory('Auth', ['$firebaseAuth',
	function($firebaseAuth){
		return $firebaseAuth();
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



// ***************************************************************
// 
// 			Services that uses the database
// 			they're all called in the menuCtrl
// 
// ***************************************************************

.factory('ProfessoresList', ['LoadingService','ToastService',
	function(LoadingService, ToastService){
		var ProfessoresList = this;
		ProfessoresList.professors = [];

		return {
			all: function(){
				if(ProfessoresList.professors.length == 0) {
					console.log("Chamei o servico de ProfessoresList");
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


.factory('MyScheduledClassesList', ['LoadingService','ToastService', 
	function(LoadingService, ToastService){
		var MyScheduledClassesList = this;
		MyScheduledClassesList.scheduledClasses = [];

		var updateClasses = function(uid){
			if(MyScheduledClassesList.scheduledClasses.length == 0)
			{
				console.log("Chamei o servico de scheduledClasses");
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
				// console.log(MyScheduledClassesList.scheduledClasses[i].hour);
			}
			//Sort by day
			MyScheduledClassesList.scheduledClasses.sort(function(a,b) {
			    return a.hour - b.hour;
			});
		}

		return {
			myScheduledClasses: function(uid){
				return updateClasses(uid);
				// var deferred = $q.defer();
				// $timeout(function(){
				// 	deferred.resolve(updateClasses(uid));
				// }, 2000);
				// return deferred.promise;
			}
		}
}])

.factory('UserInfos',[ 'Auth', 'ToastService', 'LoadingService',
	function(Auth, ToastService, LoadingService){
		var servUser = {
			displayName: '',
			email: '',
			photoURL: '',
			cellphone: '',
			location: {
				address : '',
				number: '',
				complement: ''
			}
		};

		var updateUser = function(){
			servUser.displayName = user.displayName || user.email;
			servUser.photoURL = user.photoURL || 'img/null-avatar.png';
			servUser.email = user.email || '';
			if(servUser.cellphone.length == 0 && servUser.location.address.length == 0){
				console.log("Chamei o servico de UserInfos");
				LoadingService.showLoadingSpinner();

				//Let's get the cellphone and location at the database
				firebase.database().ref()
				.child('students').child(user.uid)
						.once('value').then(function(snapshot){
							servUser.cellphone = snapshot.val().cellphone || ''; 
							servUser.location = snapshot.val().locations.main || '';
							LoadingService.hideLoading();
						}, function(error){
							ToastService
							.showToast("Tive problemas para me conectar com o servidor", 
												'long', 'bottom');
							LoadingService.hideLoading();
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
				// var deferred = $q.defer();
				// $timeout(function(){
				// 	deferred.resolve(updateUser());
				// }, 2000);
				return updateUser();
				// return deferred.promise;
			}
		}
}])


.factory('CoursesOfferedList', ['LoadingService','ToastService',
	function(LoadingService, ToastService){
		var CoursesOfferedList = this;
		CoursesOfferedList.offeredCourses = {};

		var updateCourses = function(){
			if(Object.keys(CoursesOfferedList.offeredCourses).length == 0)
			{
				console.log("Chamei o servico de CoursesOfferedList");
				LoadingService.showLoadingSpinner();

				//Go through each level and get the list of courses offered 
				// only if there's professors at this course
				firebase.database().ref().child('courses')
					.once('value').then(function(snapshot){
						CoursesOfferedList.offeredCourses = snapshot.val();

						Object.keys(snapshot.val()).forEach(function(level){
							coursesOfferedForThisLevel = [];

							// Go through each level
							Object.keys(snapshot.val()[level]).forEach(function(course){
								var name = '';
								var professors = [];

								// Go through the childs of the couse, and if the course has 
								// professors then we add it to the list of courses for the level
								Object.keys(snapshot.val()[level][course])
									.forEach(function(childs){
									if(childs == 'professors')
										professors = snapshot.val()[level][course][childs];
									else
										name = snapshot.val()[level][course][childs];
								});

								if(professors.length != 0)
									coursesOfferedForThisLevel.push(name);
							});

							//Sort and then add the list of courses to the object
							coursesOfferedForThisLevel.sort();
							CoursesOfferedList.offeredCourses[level]['coursesList']
										= coursesOfferedForThisLevel;
						});

					LoadingService.hideLoading();

				}, function(error){
					ToastService
					.showToast("Tive problemas para me conectar com o servidor", 
										'long', 'bottom');
					LoadingService.hideLoading();
				});
				
			}
			return CoursesOfferedList.offeredCourses;
		}

		return {
			all: function(){
				return updateCourses();
			}
		}
}])