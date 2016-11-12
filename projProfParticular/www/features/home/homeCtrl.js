appProf
.controller('HomeCtrl', ['$scope', '$stateParams', 'LoadingService', 'ToastService', 'ProfessoresList','$location', 
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, LoadingService, ToastService, ProfessoresList, $location) {
	var homeCtrl = this;

	var database = firebase.database();

	homeCtrl.materias = new Array();

	homeCtrl.showChoicesNivel = true;
	homeCtrl.nivel = '';
	homeCtrl.showChoicesMaterias = false;
	homeCtrl.materia = '';
	homeCtrl.showProfessores = false;

	homeCtrl.tempProfessores = new Array();
	homeCtrl.professores = new Array();
	homeCtrl.errorMessage = '';
	homeCtrl.filterBarInstance;

	// set the rate and max variables
	homeCtrl.rating = {
		'max': 5,
		'readOnly': true
	}


	// When the users chooses the level (fundamental, medio, superior) I have to bring courses from server
	homeCtrl.getMaterias = function(){
		var refNivel = '';
		homeCtrl.materias = [];
		homeCtrl.showChoicesNivel = false;

		if(homeCtrl.nivel != ''){
			LoadingService.showLoadingSpinner();

			//get the path to which level I'll search
			refNivel = getReferenceFromLevel(homeCtrl.nivel.toLowerCase());

			//get all the materias from the leve selected
			database.ref('/materias/' + refNivel).once('value').then(function(snapshot){
				snapshot.forEach(function(childSnapshot){
					//Add courses to my vector of courses
					homeCtrl.materias.push(childSnapshot.key);
				});
				//Refresh pages so the user can view the couses
				$scope.$digest();
				LoadingService.hideLoading();

			}, function(error){
				ToastService.showToast("Desculpe não consegui encontrar matérias", 'long', 'bottom');
				homeCtrl.showChoicesMaterias = false;	
			});
		} 
		//If the user had not chosen a level yet
		else {
			ToastService.showToast("Escolha um nível", 'long', 'bottom');
			homeCtrl.showChoicesMaterias = false;
			LoadingService.hideLoading();
		}

	}

	//After choosing level and courses we have to bring professors 
	homeCtrl.getProfessores = function()
	{
		var refNivel = '';
		homeCtrl.professores = [];
		homeCtrl.tempProfessores = [];
		homeCtrl.semProfessoresMessage = '';

		if(homeCtrl.nivel === '') ToastService.showToast("Escolha um nível", 'long', 'bottom');
		else {
			if(homeCtrl.materia === '') ToastService.showToast("Escolha uma matéria", 'long', 'bottom');
			else{

				LoadingService.showLoadingSpinner();

				homeCtrl.showChoicesMaterias = false;
				homeCtrl.showChoicesNivel = false;	
				homeCtrl.showProfessores = true;

				//get the path to which level I'll search for
				refNivel = getReferenceFromLevel(homeCtrl.nivel.toLowerCase());

				//get all professors which teaches that course
				database.ref('/materias/' + refNivel + '/' + homeCtrl.materia).once('value')
					.then(function(snapshot){
						snapshot.forEach(function(childSnapshot){
							// Put all professors UIDs in the vector
							homeCtrl.tempProfessores.push(childSnapshot.val());
						});

					//If none professors
					if(homeCtrl.tempProfessores.length == 0) {
						homeCtrl.semProfessoresMessage = 'Desculpe não encontrei nenhum professor perto';
						$scope.$digest();
						LoadingService.hideLoading();
					}
					else {
						//Now I'll get all the infos from professors from the UIDs vector
						database.ref('/professores/').once('value').then(function(snapshot){
							snapshot.val().forEach(function(professor){
								if(homeCtrl.tempProfessores.indexOf(professor.UID) != -1){
									homeCtrl.professores.push(professor);
								}

								//Update the global list of professors
								ProfessoresList.updateProfessoresList(homeCtrl.professores);

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

	homeCtrl.showProfessorDetails = function(UID){
		$location.path('/side-menu21/professores/' + UID);
	}

	var getReferenceFromLevel = function(level){
		if(level == 'fundamental') return 'fundamental';
		if(level == 'médio') return'medio';
		if(level == 'superior') return 'superior';	
	}

	
}])