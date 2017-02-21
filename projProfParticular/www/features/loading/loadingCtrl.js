angular.module('app.controllers')
.controller('LoadingCtrl', ['$scope', '$stateParams', 'UserInfos', 'LoadingService', 'ToastService', 
				'MyScheduledClassesList', 'ProfessoresList', 'CoursesOfferedList',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UserInfos, LoadingService, ToastService, 
				MyScheduledClassesList, ProfessoresList, CoursesOfferedList) {
	var loadingCtrl = this;
	var professorsListOK = false,
		scheduledClassesOK = false,
		userInfosOK = false,
		coursesOfferedOK = false;
	
	$scope.getServerInfos = function(){
		getProfessorsList();
		getScheduledClasses();
		getUserInfos();
		getCoursesOffered();
	}

	var getProfessorsList = function(){
		setTimeout(function(){
			MyScheduledClassesList.myScheduledClassesAsPromise(user.uid).then(function(result){
				console.log("Tela do loading pegou infos do ProfessoresList");
				professorsListOK = true;
				checkIfItsOver();
			});
		}, 2000);
	}

	var getScheduledClasses = function(){
		setTimeout(function(){
			MyScheduledClassesList.myScheduledClassesAsPromise(user.uid).then(function(result){
				console.log("Tela do loading pegou infos do scheduledClasses");
				scheduledClassesOK = true;
				checkIfItsOver();
			});
		}, 2000);
	}

	var getUserInfos = function(){
		setTimeout(function(){
			UserInfos.getUserInfosAsPromise().then(function(result){
				console.log("Tela do loading pegou infos do UserInfos");
				userInfosOK = true;
				checkIfItsOver();
			});
		}, 2000);
	}

	var getCoursesOffered = function(){
		setTimeout(function(){
			CoursesOfferedList.allAsPromise().then(function(result){
				console.log("Tela do loading pegou infos do CoursesOfferedList");
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
		}
	}
	$scope.getServerInfos();



}])