appProf
.controller('ProfessorCtrl', ['$scope', '$stateParams',
  // The following is the constructor function for this page's controller. 
  //See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	professorCtrl = this;

	console.log("ProfessorCtrl| estou aqui");


	professorCtrl.user = {
		displayName: 'Blaaa',
		photoURL: 'img/null-avatar.png',
		email: 'bla@hot'
	};

	professorCtrl.professor = {
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
	};

	// set the rate and max variables
	professorCtrl.rating = {
		'max': 5,
		'readOnly': true
	}


	


}])