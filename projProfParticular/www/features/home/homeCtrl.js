appProf
.controller('HomeCtrl', ['$scope', '$stateParams', '$ionicLoading', 'ToastService', 'ProfessoresList','$location', 
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicLoading, ToastService, ProfessoresList, $location) {
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

	var showLoading = function(){
		$ionicLoading.show({
			template: '<ion-spinner icon="spiral"></ion-spinner>',
			noBackdrop: true
		});
	}

	var hideLoading = function(){
		$ionicLoading.hide();
	}
	
	//console.log("home Ctrl:");
	console.log("HomeCtrl| : email: " + user.email);

	homeCtrl.getMaterias = function(){
		var refNivel = '';
		homeCtrl.materias = [];
		homeCtrl.showChoicesNivel = false;

		if(homeCtrl.nivel != ''){
			showLoading();
			console.log("HomeCtrl| vou pegar infos do database");

			if(homeCtrl.nivel.toLowerCase() == 'fundamental') refNivel = 'fundamental';
			if(homeCtrl.nivel.toLowerCase() == 'médio') refNivel = 'medio';
			if(homeCtrl.nivel.toLowerCase() == 'superior') refNivel = 'superior';


			database.ref('/materias/' + refNivel).once('value').then(function(snapshot){
				console.log("HomeCtrl| consegui um snapshot");
				snapshot.forEach(function(childSnapshot){
					//console.log(childSnapshot.key);
					homeCtrl.materias.push(childSnapshot.key);
				});
				$scope.$digest();
				hideLoading();
			}, function(error){
				ToastService.showToast("Desculpe não consegui encontrar matérias", 'long', 'bottom');
				homeCtrl.showChoicesMaterias = false;	
			});
		} else {
			console.log("HomeCtrl| primeiro precisa escolher o nivel");
			ToastService.showToast("Escolha um nível", 'long', 'bottom');
			homeCtrl.showChoicesMaterias = false;
			hideLoading();
		}

	}

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

				showLoading();


				console.log("HomeCtrl| vou pegar os professores");
				homeCtrl.showChoicesMaterias = false;
				homeCtrl.showChoicesNivel = false;	
				homeCtrl.showProfessores = true;

				if(homeCtrl.nivel.toLowerCase() == 'fundamental') refNivel = 'fundamental';
				if(homeCtrl.nivel.toLowerCase() == 'médio') refNivel = 'medio';
				if(homeCtrl.nivel.toLowerCase() == 'superior') refNivel = 'superior';		

				// Acessa o database olhando a materia 
				database.ref('/materias/' + refNivel + '/' + homeCtrl.materia).once('value')
					.then(function(snapshot){
					console.log("HomeCtrl| consegui um snapshot");
					snapshot.forEach(function(childSnapshot){
						console.log("HomeCtrl| childSnapshot");
						console.log(childSnapshot.val());
						// Coloca no vetor todos os UIDs dos professores que dao essa materia */
						homeCtrl.tempProfessores.push(childSnapshot.val());
					});

					console.log("Vou imprimir os professores que achei nessa materia");
					console.log(homeCtrl.tempProfessores);

					if(homeCtrl.tempProfessores.length == 0) {
						homeCtrl.semProfessoresMessage = 'Desculpe não encontrei nenhum professor perto';
						$scope.$digest();
						hideLoading();
					}
					else {
						//O vetor tempProfessores tem o UID de todos os professores que dao certa materia
						// Agora precisamos pegar o vetor com os objetos professores de fato 
						database.ref('/professores/').once('value').then(function(snapshot){
							console.log("ProfessoresCtrl| consegui um snapshot");
							snapshot.val().forEach(function(professor){
								console.log("HomeCtrl| professor UID: " + professor.UID)
								console.log("HomeCtrl| indexOf: " + homeCtrl.tempProfessores.
									indexOf(professor.UID));
	
								if(homeCtrl.tempProfessores.indexOf(professor.UID) != -1){
									homeCtrl.professores.push(professor);
								}

								ProfessoresList.updateProfessoresList(homeCtrl.professores);


								$scope.$digest();
								hideLoading();

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
		//console.log("ProfessoresCtrl| cliquei " + UID);
		$location.path('/side-menu21/professores/' + UID);
	}

	
}])