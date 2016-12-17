angular.module('app.controllers')
.controller('RequestClassCtrl', ['$scope', '$stateParams', 'LoadingService', 
	'ToastService', 'ProfessoresList','$location', '$ionicPopup', 'CoursesOfferedList',
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, LoadingService, ToastService, ProfessoresList, 
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
		requestClassCtrl.allCourses = CoursesOfferedList.all();
		LoadingService.hideLoading();
	}
	requestClassCtrl.updateCoursesList();

	// TODO 
	// Upload the request to server
	requestClassCtrl.requestClass = function(){
		console.log("requestClass function");

		// if(requestClassCtrl.request.location.search("Brazil") == - 1 ){
		// 	ToastService.showToast("O endereço deve ser válido", 'long', 'bottom');
		// }
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

}]);