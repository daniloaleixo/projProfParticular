appProf
.controller('HomeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	var homeCtrl = this;

	var database = firebase.database();

	homeCtrl.materias = new Array();

	homeCtrl.showChoicesNivel = true;
	homeCtrl.nivel = '';
	homeCtrl.showChoicesMaterias = false;
	homeCtrl.materia = '';

	homeCtrl.professores = new Array();
	homeCtrl.errorMessage = '';
	homeCtrl.filterBarInstance;

	// set the rate and max variables
	homeCtrl.rating = {
		'max': 5,
		'readOnly': true
	}
	
	//console.log("home Ctrl:");
	console.log("HomeCtrl| : email: " + user.email);

	homeCtrl.getMaterias = function(){

		if(homeCtrl.nivel != ''){
			console.log("HomeCtrl| vou pegar infos do database");
		} else {
			console.log("HomeCtrl| primeiro precisa escolhjer o nivel");
		}
	}

	homeCtrl.getProfessores = function()
	{
		if(homeCtrl.nivel === '') console.log("HomeCtrl| escolha um  nivel");
		else {
			if(homeCtrl.materia === '') console.log("HomeCtrl| escolha uma materia");
			else{
				console.log("HomeCtrl| vou pegar os professores");
				homeCtrl.showChoicesMaterias = false;
				homeCtrl.showChoicesNivel = false;			
			}
		}

	}

}])