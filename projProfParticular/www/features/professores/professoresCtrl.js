angular.module('app.controllers')
.controller('ProfessoresCtrl', ['$scope', '$stateParams', 
	'ratingConfig', 'LoadingService','$ionicFilterBar','ProfessoresList', '$location',
  // The following is the constructor function for this page's controller. 
  //See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,ratingConfig, LoadingService, 
									$ionicFilterBar, ProfessoresList, $location) {

	professoresCtrl = this;

	var database = firebase.database();
	professoresCtrl.professors = new Array();
	professoresCtrl.errorMessage = '';
	professoresCtrl.filterBarInstance;

	// set the rate and max variables
	professoresCtrl.rating = {
		'max': 5,
		'readOnly': true
	}

	professoresCtrl.atualizaListaProfessores = function(){
		LoadingService.showLoadingSpinner();
		//get all professors
		database.ref().child('professors').once('value').then(function(snapshot){

			console.log(snapshot.val());
			console.log("aqui");
			Object.keys(snapshot.val()).forEach(function(professor){
				console.log(professor);
				console.log(snapshot.val()[professor]);
				if(professor) professoresCtrl.professors.push(snapshot.val()[professor]);
			})

			LoadingService.hideLoading();

			if(professoresCtrl.professors.length == 0) 
				professoresCtrl.errorMessage = 'Desculpe não consegui encontrar nenhum professor'
			else { 
				professoresCtrl.errorMessage = '';
				console.log("estou aqui");
				ProfessoresList.updateProfessoresList(professoresCtrl.professors);
			}

		}, function(error){
			professoresCtrl.errorMessage = error;
			LoadingService.hideLoading();
		});	
	}

	professoresCtrl.atualizaListaProfessores();


	professoresCtrl.showFilterBar = function(){
		filterBarInstance = $ionicFilterBar.show({
			items: professoresCtrl.professors,
			update: function(filteredItems) {
				professoresCtrl.professors = filteredItems;
			},
			filterProperties: 'displayName'
		});
	};

	professoresCtrl.showProfessorDetails = function(UID){
		//console.log("ProfessoresCtrl| cliquei " + UID);
		$location.path('/side-menu21/professores/' + UID);
	}


}])