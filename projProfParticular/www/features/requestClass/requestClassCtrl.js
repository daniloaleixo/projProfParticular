angular.module('app.controllers')
.controller('RequestClassCtrl', ['$scope', '$rootScope', '$stateParams', 'LoadingService', 
	'ToastService', 'ProfessoresList','$location', '$ionicPopup', 'CoursesOfferedList',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $stateParams, LoadingService, ToastService, ProfessoresList, 
	$location, $ionicPopup, CoursesOfferedList) {
	var requestClassCtrl = this;

	var database = firebase.database();

	requestClassCtrl.courses = new Array();
	requestClassCtrl.allCourses = {};

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
		location_number: '',
		location_compl: '',
		description: ''
	};

	//Get the list of courses
	requestClassCtrl.updateCoursesList = function(){
		LoadingService.showLoadingSpinner();
		CoursesOfferedList.all().then(function(result){
			requestClassCtrl.allCourses = result;	
			LoadingService.hideLoading();
		})
		// requestClassCtrl.allCourses = CoursesOfferedList.all();
	}
	requestClassCtrl.updateCoursesList();

	// TODO 
	// Upload the request to server
	requestClassCtrl.requestClassButton = function(){

		if(checkAllFieldsFilled()){
			if(requestClassCtrl.request.location.search("Brazil") != -1 ){

				LoadingService.showLoadingSpinner();

				var day = requestClassCtrl.request.day.substring(0,2);
				var month = requestClassCtrl.request.day.substring(3,5);
				var year = requestClassCtrl.request.day.substring(6,10);
				var hour = requestClassCtrl.request.hour.substring(0,2);
				var minutes = requestClassCtrl.request.hour.substring(3,5);
				var classDatetime = new Date(year, month - 1, day, hour, minutes);
				classDatetime = classDatetime.toString();
				var userUID = user.uid;

				// console.log(requestClassCtrl.request);
				// console.log(requestClassCtrl.allCourses);
				var courseCode = getCourseSelected(requestClassCtrl.level, requestClassCtrl.course);
				


				// Send request to the server
				var newRequestsRef = firebase.database().ref().child('requestForClasses').push();

				// Build the Object we're gonna upload in database
				var requestJSON = {
					status: "Pendente",
					UIDRequested: userUID,
					students:{},
					date:classDatetime, 
					duration:requestClassCtrl.request.duration,
					location:{
						address:requestClassCtrl.request.location,
						number:requestClassCtrl.request.location_number,
						complement:requestClassCtrl.request.location_compl
					},
					course:{
						courseCode:requestClassCtrl.course
					},
					description:requestClassCtrl.request.description
				};
				requestJSON.students[userUID] = {
							displayName:user.displayName,
							photoURL:user.photoURL
				};

				// Upload at firebase
				newRequestsRef.set(requestJSON);
				LoadingService.hideLoading();

				// TODO 
				//  O que vamos fazer depois: vai mostrar uma tela dizendo que 
				// vai entrar em contato?
				console.log("Corretamente marcado essa aula");
				$location.path('/side-menu21/home');

			} else {
				console.log("O endereço deve ser válido");
				ToastService.showToast("O endereço deve ser válido", 'long', 'bottom');
			}
		} else {
			console.log("Por favor preencha todos os campos");
			ToastService.showToast("Por favor preencha todos os campos", 'long', 'bottom');
		}

	}

	var getCourseSelected = function(level, course){
		if(level == "Fundamental") var realLevel = 'level1';
		else if(level == "Médio") var realLevel = 'level2';
		else if(level == "Superior") var realLevel = 'level3';
		
		Object.keys(requestClassCtrl.allCourses[realLevel]).forEach(function(actualCourse){
			if(actualCourse != 'coursesList'){
				if(requestClassCtrl.allCourses[realLevel][actualCourse].name == course)
					return actualCourse;
			}
		});

	}

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

			requestClassCtrl.courses = requestClassCtrl.allCourses[refNivel]['coursesList'];

			// For showing in the screen when there's no course
			if(requestClassCtrl.courses.length == 0)
				requestClassCtrl.course = 'Desculpe, mas não temos oferecimento';

			LoadingService.hideLoading();
		} 
		//If the user had not chosen a level yet
		else {
			ToastService.showToast("Escolha um nível", 'long', 'bottom');
			requestClassCtrl.showCoursesChoices = false;
			LoadingService.hideLoading();
		}

	}


	requestClassCtrl.getReferenceFromLevel = function(level){
		if(level == 'fundamental') return 'level1';
		if(level == 'médio') return'level2';
		if(level == 'superior') return 'level3';	
	}

	//Show a popup with autocomplete in the address
	requestClassCtrl.showPopup = function() {
	  	$scope.data = {};

	  	// An elaborate, custom popup
	  	var myPopup = $ionicPopup.show({
	    	template: "<ion-google-place ng-model='data.location'>",
		    title: 'Digite o endereço',
		    scope: $scope,
		    buttons: [
			    { text: 'Cancel' },
			    {
			        text: '<b>Save</b>',
			        type: 'button-positive',
			        onTap: function(e) {
			          return $scope.data.location;	      
			        }
			    }
		    ]
	  	});

	  	myPopup.then(function(res) {
	    	console.log('Tapped!', res);
	    	requestClassCtrl.request.location = res;
	  	});
	};

	var checkAllFieldsFilled = function()
	{
		// TODO
		// It's not working right now

	 	// if(requestClassCtrl.request.level.length > 0 && 
	 	// 	requestClassCtrl.request.course.length > 0 && 
	 	// 	requestClassCtrl.request.day.length > 0 && 
	 	// 	requestClassCtrl.request.hour.length > 0 &&
	 	// 	requestClassCtrl.request.duration.length > 0 && 
	 	// 	requestClassCtrl.request.location.length > 0 && 
	 	// 	requestClassCtrl.request.location_number.length > 0 && 
	 	// 	requestClassCtrl.request.description.length > 0)
	 		return true;
	 	// else
	 	// 	return false;
	}


	// 
	// 			EVENTS
	// 
	$rootScope.$on('LogoutEvent', function(event, args) {
		requestClassCtrl.courses = new Array();
			requestClassCtrl.allCourses = {};

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
				location_number: '',
				location_compl: '',
				description: ''
			};
	});

	$rootScope.$on('LogInEvent', function(event, args) {
		requestClassCtrl.updateCoursesList();
	});

}]);