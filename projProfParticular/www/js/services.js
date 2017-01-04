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
			}, 
			reset: function(){
				ProfessoresList.professors = [];
				console.log("Resetando professores " + ProfessoresList.professors.length);
			}
		}
}])


.factory('MyScheduledClassesList', ['LoadingService','ToastService', 
	function(LoadingService, ToastService){
		var MyScheduledClassesList = this;
		MyScheduledClassesList.allScheduledClasses = [];
		MyScheduledClassesList.scheduledClasses = [];
		MyScheduledClassesList.historyClasses = [];

		var updateClasses = function(uid){
			if(MyScheduledClassesList.allScheduledClasses.length == 0)
			{
				console.log("Chamei o servico de scheduledClasses");
				LoadingService.showLoadingSpinner();
				//Search for all the scheduled classes that starts with the user uid
				firebase.database().ref().child('scheduledClasses').orderByKey()
				.startAt(uid).once('value').then(function(snapshot){

					//Iterate through each combination user and professor
					if(snapshot.val() != null){
						Object.keys(snapshot.val()).forEach(function(user_prof) {

							//Then iterate for every date that the user had classes 
							// with that professor
							Object.keys(snapshot.val()[user_prof]).forEach(function(id){

								// Go through each scheduledClass in the hash
								var scheduledClassObject = snapshot.val()[user_prof][id];
								scheduledClassObject['hour'] = new Date(snapshot.val()[user_prof][id].date);
								MyScheduledClassesList.allScheduledClasses
									.push(scheduledClassObject);
							});
						});
					}

					sortByDate();
					separeIntoHistoryAndToCome();
					// console.log(MyScheduledClassesList.scheduledClasses);
					// console.log(MyScheduledClassesList.historyClasses);
					LoadingService.hideLoading();
				}, function(error){
					ToastService.showToast("Tive problemas para me conectar com o servidor", 
										'long', 'bottom');
					LoadingService.hideLoading();
				});	
			}

			// return MyScheduledClassesList.allScheduledClasses;
		}

		var sortByDate = function(){
			//Sort by day
			MyScheduledClassesList.allScheduledClasses.sort(function(a,b) {
			    return a.hour - b.hour;
			});
		}

		var separeIntoHistoryAndToCome = function(){
			MyScheduledClassesList.allScheduledClasses.forEach(function(scheduledClass){
				if(scheduledClass.hour.valueOf() > Date.now().valueOf())
					MyScheduledClassesList.scheduledClasses.push(scheduledClass);
				else
					MyScheduledClassesList.historyClasses.push(scheduledClass);
			});
		}

		return {
			myScheduledClasses: function(uid){
				updateClasses(uid);
				return MyScheduledClassesList.scheduledClasses;
				// var deferred = $q.defer();
				// $timeout(function(){
				// 	deferred.resolve(updateClasses(uid));
				// }, 2000);
				// return deferred.promise;
			},
			myHistoryClasses: function(uid){
				updateClasses(uid);
				return MyScheduledClassesList.historyClasses;
			},
			getNextScheduledClass:function(uid){
				if(MyScheduledClassesList.scheduledClasses.length == 0){
					var deferred = $q.defer();
					$timeout(function(){
						deferred.resolve(updateClasses(uid));
					}, 2000);
					// Even after waiting for the server the user dont have classes scheduled
					//  then we return null
					if(MyScheduledClassesList.scheduledClasses.length == 0) return null;
					else return MyScheduledClassesList.scheduledClasses[0];
				}
				else
					return MyScheduledClassesList.scheduledClasses[0];
			}, 
			reset: function(){
				MyScheduledClassesList.allScheduledClasses = [];
				MyScheduledClassesList.scheduledClasses = [];
				MyScheduledClassesList.historyClasses = [];
				console.log("Resetando aulas " + MyScheduledClassesList.allScheduledClasses.length);
			}
		}
}])

.factory('UserInfos',[ 'Auth', 'ToastService', 'LoadingService', '$q', '$timeout',
	function(Auth, ToastService, LoadingService, $q, $timeout){
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

		var force = false;

		var updateUser = function(){
			servUser.displayName = user.displayName || user.email;
			servUser.photoURL = user.photoURL || 'img/null-avatar.png';
			servUser.email = user.email || '';
			if(
				(servUser.cellphone.length == 0 && servUser.location.address.length == 0)
				|| force == true){
				console.log("Chamei o servico de UserInfos");
				LoadingService.showLoadingSpinner();

				//Let's get the cellphone and location at the database
				firebase.database().ref()
				.child('students').child(user.uid)
						.once('value').then(function(snapshot){
							
							if(snapshot.hasChild('cellphone'))
								servUser.cellphone = snapshot.val().cellphone;
							else
								servUser.cellphone = ''; 

							if(snapshot.hasChild('locations'))
								servUser.location = snapshot.val().locations.main;
							else
								servUser.location = {address : '',number: '',complement: ''}


							force = false;
							LoadingService.hideLoading();
						}, function(error){
							ToastService
							.showToast("Tive problemas para me conectar com o servidor", 
												'long', 'bottom');
							LoadingService.hideLoading();
						})
			}
			if(force == false) return servUser;
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
				return updateUser();
			},
			getUserInfosForce: function(){
				force = true;
				return updateUser();
			},
			getUserInfosAsPromise: function(){
				force = true;
				var deferred = $q.defer();
				$timeout(function(){
					deferred.resolve(updateUser());
				}, 2000);
				return deferred.promise;
			},
			reset: function(){
				servUser = {
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
				console.log("Resetando usuario " + servUser);
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
			},
			reset: function(){
				CoursesOfferedList.offeredCourses = {};
				console.log("Resetando cursos oferecidos " + CoursesOfferedList.offeredCourses);
			}
		}
}])