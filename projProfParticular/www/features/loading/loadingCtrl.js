angular.module('app.controllers')
.controller('LoadingCtrl', ['$scope', '$rootScope', '$stateParams', 'UserInfos', 'LoadingService', 'ToastService', 
				'MyScheduledClassesList', 'ProfessoresList', 'CoursesOfferedList', '$location',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $stateParams, UserInfos, LoadingService, ToastService, 
				MyScheduledClassesList, ProfessoresList, CoursesOfferedList, $location) {
	var loadingCtrl = this;
	var professorsListOK = false,
		scheduledClassesOK = false,
		userInfosOK = false,
		coursesOfferedOK = false;
	
	loadingCtrl.getServerInfos = function(){
		getProfessorsList();
		getScheduledClasses();
		getUserInfos();
		getCoursesOffered();
	}

	var getProfessorsList = function(){
		setTimeout(function(){
			ProfessoresList.loadProfessorsList(user.uid).then(function(result){
				console.log("Tela do loading pegou infos do ProfessoresList");
				// ToastService.showToast("Tela do loading pegou infos do ProfessoresList", 
				// 						'long', 'bottom');
				professorsListOK = true;
				checkIfItsOver();
			});
		}, 2000);
	}

	var getScheduledClasses = function(){
		setTimeout(function(){
			MyScheduledClassesList.loadScheduledClasses(user.uid).then(function(result){
				console.log("Tela do loading pegou infos do scheduledClasses");
				// ToastService.showToast("Tela do loading pegou infos do scheduledClasses", 
				// 						'long', 'bottom');
				scheduledClassesOK = true;
				checkIfItsOver();
			});
		}, 2000);
	}

	var getUserInfos = function(){
		setTimeout(function(){
			UserInfos.loadUserInfos().then(function(result){
				console.log("Tela do loading pegou infos do UserInfos");
				// ToastService.showToast("Tela do loading pegou infos do UserInfos", 
				// 						'long', 'bottom');
				userInfosOK = true;
				checkIfItsOver();
			});
		}, 2000);
	}

	var getCoursesOffered = function(){
		setTimeout(function(){
			CoursesOfferedList.loadCoursesOffered().then(function(result){
				console.log("Tela do loading pegou infos do CoursesOfferedList");
				// ToastService.showToast("Tela do loading pegou infos do CoursesOfferedList", 
				// 						'long', 'bottom');
				coursesOfferedOK = true;
				checkIfItsOver();
			});
		}, 2000);
	}


	var checkIfItsOver = function()
	{
		if(professorsListOK && 
			scheduledClassesOK &&
			userInfosOK &&
			coursesOfferedOK){

			console.log("Acabou");
			$location.path('/side-menu21/home');
		}
	}
	loadingCtrl.getServerInfos();


	// 
	// 			EVENTS
	// 
	$rootScope.$on('LogoutEvent', function(event, args) {
		professorsListOK = false;
		scheduledClassesOK = false;
		userInfosOK = false;
		coursesOfferedOK = false;
	});

	$rootScope.$on('LogInEvent', function(event, args) {
		loadingCtrl.getServerInfos();
	});


}])