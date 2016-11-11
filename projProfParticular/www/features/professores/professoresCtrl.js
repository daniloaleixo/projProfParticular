
appProf
.controller('ProfessoresCtrl', ['$scope', '$stateParams', 'FIREBASE_CONFIG',
	'ratingConfig', '$ionicLoading','$ionicFilterBar','ProfessoresList', '$location',
  // The following is the constructor function for this page's controller. 
  //See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, FIREBASE_CONFIG, ratingConfig, $ionicLoading, $ionicFilterBar, ProfessoresList, $location) {
	professoresCtrl = this;

	console.log("ProfessoresCtrl | estou aqui");

	var database = firebase.database();
	professoresCtrl.professores = new Array();
	professoresCtrl.errorMessage = '';
	professoresCtrl.filterBarInstance;

	// set the rate and max variables
	professoresCtrl.rating = {
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

	professoresCtrl.atualizaListaProfessores = function(){
		showLoading();
		database.ref('/professores/').once('value').then(function(snapshot){
			console.log("ProfessoresCtrl| consegui um snapshot");
			snapshot.val().forEach(function(professor){
				console.log(professor);
				if(professor) professoresCtrl.professores.push(professor);
			})
			hideLoading();

			if(professoresCtrl.professores.length == 0) 
				professoresCtrl.errorMessage = 'Desculpe não consegui encontrar nenhum professor'
			else { 
				professoresCtrl.errorMessage = '';
				ProfessoresList.updateProfessoresList(professoresCtrl.professores);
			}

		}, function(error){
			professoresCtrl.errorMessage = error;
			console.log(error);
			hideLoading();
		});	
	}

	professoresCtrl.atualizaListaProfessores();


	professoresCtrl.showFilterBar = function(){
		filterBarInstance = $ionicFilterBar.show({
			items: professoresCtrl.professores,
			update: function(filteredItems) {
				professoresCtrl.professores = filteredItems;
			},
			filterProperties: 'displayName'
		});
	};

	professoresCtrl.showProfessorDetails = function(UID){
		//console.log("ProfessoresCtrl| cliquei " + UID);
		$location.path('/side-menu21/professores/' + UID);
	}


	

	// console.log("vaiiii");
	// console.log(professoresCtrl.professores);

	//console.log("ProfessoresCtrl| estou aqui");
	//console.log("ProfessoresCtrl| " + database);


}])