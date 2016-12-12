appProf
.controller('ChooseClassCtrl', ['$scope', '$stateParams', 'LoadingService', 'ToastService', 'ProfessoresList','$location', 
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, LoadingService, ToastService, ProfessoresList, $location) {
	var chooseClassCtrl = this;

	var database = firebase.database();

	chooseClassCtrl.materias = new Array();

	chooseClassCtrl.showChoicesNivel = true;
	chooseClassCtrl.nivel = '';
	chooseClassCtrl.showChoicesMaterias = false;
	chooseClassCtrl.materia = '';
	chooseClassCtrl.showProfessores = false;

	chooseClassCtrl.tempProfessores = new Array();
	chooseClassCtrl.professores = new Array();
	chooseClassCtrl.errorMessage = '';
	chooseClassCtrl.filterBarInstance;

	// set the rate and max variables
	chooseClassCtrl.rating = {
		'max': 5,
		'readOnly': true
	}


	// When the users chooses the level (fundamental, medio, superior) I have to bring courses from server
	chooseClassCtrl.getMaterias = function(){
		var refNivel = '';
		chooseClassCtrl.materias = [];
		chooseClassCtrl.showChoicesNivel = false;

		if(chooseClassCtrl.nivel != ''){
			LoadingService.showLoadingSpinner();

			//get the path to which level I'll search
			refNivel = getReferenceFromLevel(chooseClassCtrl.nivel.toLowerCase());

			//get all the materias from the leve selected
			database.ref('/materias/' + refNivel).once('value').then(function(snapshot){
				snapshot.forEach(function(childSnapshot){
					//Add courses to my vector of courses
					chooseClassCtrl.materias.push(childSnapshot.key);
				});
				//Refresh pages so the user can view the couses
				$scope.$digest();
				LoadingService.hideLoading();

			}, function(error){
				ToastService.showToast("Desculpe não consegui encontrar matérias", 'long', 'bottom');
				chooseClassCtrl.showChoicesMaterias = false;	
			});
		} 
		//If the user had not chosen a level yet
		else {
			ToastService.showToast("Escolha um nível", 'long', 'bottom');
			chooseClassCtrl.showChoicesMaterias = false;
			LoadingService.hideLoading();
		}

	}

	//After choosing level and courses we have to bring professors 
	chooseClassCtrl.getProfessores = function()
	{
		var refNivel = '';
		chooseClassCtrl.professores = [];
		chooseClassCtrl.tempProfessores = [];
		chooseClassCtrl.semProfessoresMessage = '';

		if(chooseClassCtrl.nivel === '') ToastService.showToast("Escolha um nível", 'long', 'bottom');
		else {
			if(chooseClassCtrl.materia === '') ToastService.showToast("Escolha uma matéria", 'long', 'bottom');
			else{

				LoadingService.showLoadingSpinner();

				chooseClassCtrl.showChoicesMaterias = false;
				chooseClassCtrl.showChoicesNivel = false;	
				chooseClassCtrl.showProfessores = true;

				//get the path to which level I'll search for
				refNivel = getReferenceFromLevel(chooseClassCtrl.nivel.toLowerCase());

				//get all professors which teaches that course
				database.ref('/materias/' + refNivel + '/' + chooseClassCtrl.materia).once('value')
					.then(function(snapshot){
						snapshot.forEach(function(childSnapshot){
							// Put all professors UIDs in the vector
							chooseClassCtrl.tempProfessores.push(childSnapshot.val());
						});

					//If none professors
					if(chooseClassCtrl.tempProfessores.length == 0) {
						chooseClassCtrl.semProfessoresMessage = 'Desculpe não encontrei nenhum professor perto';
						$scope.$digest();
						LoadingService.hideLoading();
					}
					else {
						//Now I'll get all the infos from professors from the UIDs vector
						database.ref('/professores/').once('value').then(function(snapshot){
							snapshot.val().forEach(function(professor){
								if(chooseClassCtrl.tempProfessores.indexOf(professor.UID) != -1){
									chooseClassCtrl.professores.push(professor);
								}

								//Update the global list of professors
								ProfessoresList.updateProfessoresList(chooseClassCtrl.professores);

								$scope.$digest();
								LoadingService.hideLoading();

							});
						}, function(error){
							ToastService.showToast("Desculpe tive problemas para me comunicar "
								+ "com o banco de dados", 'long', 'bottom');
						});

					}
					

				}, function(error){
					ToastService.showToast("Desculpe tive problemas para me comunicar" 
						+ " com o banco de dados", 'long', 'bottom');
				});
			}
		}

	}

	chooseClassCtrl.showProfessorDetails = function(UID){
		$location.path('/side-menu21/professores/' + UID);
	}

	var getReferenceFromLevel = function(level){
		if(level == 'fundamental') return 'fundamental';
		if(level == 'médio') return'medio';
		if(level == 'superior') return 'superior';	
	}

	
}])