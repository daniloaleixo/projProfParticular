angular.module('app.controllers')
.controller('ChooseClassCtrl', ['$scope', '$stateParams', 'LoadingService', 'ToastService', 'ProfessoresList','$location', 
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, LoadingService, ToastService, ProfessoresList, $location) {
	var chooseClassCtrl = this;

	var database = firebase.database();

	chooseClassCtrl.courses = new Array();

	chooseClassCtrl.showChoicesLevel = true;
	chooseClassCtrl.level = '';

	chooseClassCtrl.showCoursesChoices = false;
	chooseClassCtrl.course = '';
	chooseClassCtrl.showProfessors = false;

	chooseClassCtrl.tempProfessors = new Array();
	chooseClassCtrl.professors = new Array();

	chooseClassCtrl.errorMessage = '';
	chooseClassCtrl.filterBarInstance;

	// set the rate and max variables
	chooseClassCtrl.rating = {
		'max': 5,
		'readOnly': true
	}


	// I have to bring courses from server
	// When the users chooses the level (fundamental, medio, superior) 
	chooseClassCtrl.getCourses = function(){
		var refNivel = '';

		chooseClassCtrl.courses = [];
		chooseClassCtrl.showChoicesLevel = false;

		if(chooseClassCtrl.level != ''){
			LoadingService.showLoadingSpinner();

			//get the path to which level I'll search
			refNivel = chooseClassCtrl.getReferenceFromLevel(chooseClassCtrl.level.toLowerCase());

			// console.log("RefNivel " + refNivel);

			//get all the courses from the leve selected
			database.ref('/courses/' + refNivel).once('value').then(function(snapshot){
				snapshot.forEach(function(childSnapshot){
					//Add courses to my vector of courses
				
					chooseClassCtrl.courses.push({
						"key": childSnapshot.key,
						"name": childSnapshot.val().name,
						"professors": childSnapshot.val().professors
					});
				});
				//Refresh pages so the user can view the couses
				chooseClassCtrl.courses.sort();
				$scope.$digest();
				LoadingService.hideLoading();

			}, function(error){
				ToastService.showToast("Desculpe não consegui encontrar matérias", 'long', 'bottom');
				chooseClassCtrl.showCoursesChoices = false;	
			});
		} 
		//If the user had not chosen a level yet
		else {
			ToastService.showToast("Escolha um nível", 'long', 'bottom');
			chooseClassCtrl.showCoursesChoices = false;
			LoadingService.hideLoading();
		}

	}



	//After choosing level and courses we have to bring professors 
	chooseClassCtrl.getProfessors = function()
	{
		var refNivel = '';
		chooseClassCtrl.professors = [];
		chooseClassCtrl.tempProfessors = [];
		chooseClassCtrl.semProfessoresMessage = '';

		if(chooseClassCtrl.level === '') ToastService.showToast("Escolha um nível", 'long', 'bottom');
		else {
			if(chooseClassCtrl.course === '') ToastService.showToast("Escolha uma matéria", 'long', 'bottom');
			else{

				LoadingService.showLoadingSpinner();

				chooseClassCtrl.showCoursesChoices = false;
				chooseClassCtrl.showChoicesLevel = false;	
				chooseClassCtrl.showProfessors = true;

				//get the path to which level I'll search for
				refNivel = chooseClassCtrl.getReferenceFromLevel(chooseClassCtrl.level.toLowerCase());


				//Search for the course and get the array of professors
				chooseClassCtrl.courses.forEach(function(course){
					if(course.name == chooseClassCtrl.course){
						chooseClassCtrl.tempProfessors = course.professors;
					}
				})

				// console.log(chooseClassCtrl.tempProfessors);

				//If none professors
				if(chooseClassCtrl.tempProfessors.length == 0) {
					ToastService.showToast("Desculpe não encontrei nenhum professor perto", 
										'long', 'bottom');
					$scope.$digest();
					LoadingService.hideLoading();
				}
				else {

					// console.log("aqui");



					//Now I'll get all the infos from professors from the UIDs vector
					database.ref().child('/professors/').once('value').then(function(snapshot){
						console.log(snapshot.val());

						chooseClassCtrl.tempProfessors.forEach(function(professor){
							chooseClassCtrl.professors.push(snapshot.child(professor).val());
						});

						// //Update the global list of professors
						ProfessoresList.updateProfessoresList(chooseClassCtrl.professors);

						$scope.$digest();
						LoadingService.hideLoading();

					}, function(error){
						ToastService.showToast("Desculpe tive problemas para me comunicar "
							+ "com o banco de dados", 'long', 'bottom');
					});

				}
			}
		}

	}

	chooseClassCtrl.showProfessorDetails = function(UID){
		$location.path('/side-menu21/professors/' + UID);
	}

	chooseClassCtrl.getReferenceFromLevel = function(level){
		if(level == 'fundamental') return 'level1';
		if(level == 'médio') return'level2';
		if(level == 'superior') return 'level3';	
	}

	chooseClassCtrl.getReferenceFromCourse = function(level){
		if(level == 'fundamental') return 'level1';
		if(level == 'médio') return'level2';
		if(level == 'superior') return 'level3';	
	}
	
}])