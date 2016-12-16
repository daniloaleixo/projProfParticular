angular.module('app.controllers')
.controller('RequestClassCtrl', ['$scope', '$stateParams', 'LoadingService', 'ToastService', 'ProfessoresList','$location', 
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, LoadingService, ToastService, ProfessoresList, $location) {
	var requestClassCtrl = this;

	var database = firebase.database();

	requestClassCtrl.courses = new Array();

	requestClassCtrl.showChoicesLevel = true;
	requestClassCtrl.level = '';

	requestClassCtrl.showCoursesChoices = false;
	requestClassCtrl.course = '';

	requestClassCtrl.errorMessage = '';
	requestClassCtrl.filterBarInstance;

	requestClassCtrl.request = {
		level: 0,
		course: '',
		day: '',
		hour: '',
		duration: '',
		location: '',
		description: ''
	};



	// I have to bring courses from server
	// When the users chooses the level (fundamental, medio, superior) 
	requestClassCtrl.getCourses = function(){
		var refNivel = '';

		requestClassCtrl.courses = [];
		requestClassCtrl.showChoicesLevel = false;

		if(requestClassCtrl.level != ''){
			LoadingService.showLoadingSpinner();

			//get the path to which level I'll search
			refNivel = requestClassCtrl.getReferenceFromLevel(requestClassCtrl.level.toLowerCase());

			// console.log("RefNivel " + refNivel);

			//get all the courses from the leve selected
			database.ref('/courses/' + refNivel).once('value').then(function(snapshot){
				snapshot.forEach(function(childSnapshot){
					//Add courses to my vector of courses
				
					requestClassCtrl.courses.push({
						"key": childSnapshot.key,
						"name": childSnapshot.val().name
					});
				});
				//Refresh pages so the user can view the couses
				requestClassCtrl.courses.sort();
				$scope.$digest();
				LoadingService.hideLoading();

			}, function(error){
				ToastService.showToast("Desculpe não consegui encontrar matérias", 'long', 'bottom');
				requestClassCtrl.showCoursesChoices = false;	
			});
		} 
		//If the user had not chosen a level yet
		else {
			ToastService.showToast("Escolha um nível", 'long', 'bottom');
			requestClassCtrl.showCoursesChoices = false;
			LoadingService.hideLoading();
		}

	}

	requestClassCtrl.requestClass = function(){
		console.log("function requestClass");
	}

	requestClassCtrl.yourLocationChangeCallback = function(){
		console.log(requestClassCtrl.request.location);
	}

	requestClassCtrl.getReferenceFromLevel = function(level){
		if(level == 'fundamental') return 'level1';
		if(level == 'médio') return'level2';
		if(level == 'superior') return 'level3';	
	}
	
}])