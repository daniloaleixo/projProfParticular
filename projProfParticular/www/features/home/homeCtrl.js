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

	homeCtrl.professores = [
		{
			"UID": "8B1eYE4JZ8MYTpVjYBZFlhGJBO52",
			"displayName":"Danilo Aleixo",
			"photoURL":"https://lh6.googleusercontent.com/-sjP2tqfdCTw/AAAAAAAAAAI/AAAAAAAADF8/pQqKYkuBcE4/photo.jpg",
			"materias":{
				"resumo":["matematica", "fisica"],
				"fundamental":["matematica", "fisica"],
				"medio":["matematica", "fisica"],
				"superior":[]
			},
			"localizacoes":{
				"principal": {
					"logradouro": "Rua xyz, 180",
					"cidade": "São Paulo ",
					"estado":"SP",
					"CEP": "05454555"
				},
				"secundararias" : []
			},
			"curriculo": {
				"sobre":"Sou muito legal",
				"formacao":{
					"graduacao":{
						"instituicao": "USP",
						"status":"Cursando",
						"curso":"Ciencia da Computacao"
					},
					"posGraduacoes":[]
				}
			},
			"avaliacoes":{
				"quantidade": 0,
				"didatica":5,
				"conhecimento":5,
				"simpatia":5
			},
			"horariosDisponiveis":{
				"segunda":{
					"8-9":true,
					"9-10":true,
					"10-11":false
				},
				"terca":{

				}
			},
			"agenda":[]
		},
		{
			"UID": "ZyEKlWn4tDh2esPRV8sGYGf77jq1",
			"displayName":"Bla  3",
			"photoURL":"",
			"materias":{
				"resumo":["historia", "geografia"],
				"fundamental":["historia", "geografia"],
				"medio":["historia", "geografia"],
				"superior":[]
			},
			"localizacoes":{
				"principal": {
					"logradouro": "Rua xyz, 180",
					"cidade": "Campinas",
					"estado":"SP",
					"CEP": "05454555"
				},
				"secundararias" : []
			},
			"curriculo": {
				"sobre":"Dou aulas particulares há 5 anos e ja fiz isso e isso e isso, sempre estou presente na vida da galera e quero um texto longo",
				"formacao":{
					"graduacao":{
						"instituicao": "USP",
						"status":"Cursando",
						"curso":"História"
					},
					"posGraduacoes":[]
				}
			},
			"avaliacoes":{
				"quantidade": 0,
				"didatica":3.5,
				"conhecimento":5,
				"simpatia":5
			},
			"horariosDisponiveis":{
				"segunda":{
					"8-9":true,
					"9-10":true,
					"10-11":false
				},
				"terca":{

				}
			},
			"agenda":[]
		}
	];
	homeCtrl.errorMessage = '';
	homeCtrl.showProfessores = false;
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
				homeCtrl.showProfessores = true;		
			}
		}

	}

}])