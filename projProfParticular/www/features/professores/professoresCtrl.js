
appProf
.controller('ProfessoresCtrl', ['$scope', '$stateParams', 'FIREBASE_CONFIG',
	'ratingConfig', 'LoadingService','$ionicFilterBar','ProfessoresList', '$location',
  // The following is the constructor function for this page's controller. 
  //See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, FIREBASE_CONFIG, ratingConfig, LoadingService, 
									$ionicFilterBar, ProfessoresList, $location) {

	professoresCtrl = this;

	var database = firebase.database();
	professoresCtrl.professores = new Array();
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
		database.ref('/professores/').once('value').then(function(snapshot){
			snapshot.val().forEach(function(professor){
				if(professor) professoresCtrl.professores.push(professor);
			})
			LoadingService.hideLoading();

			if(professoresCtrl.professores.length == 0) 
				professoresCtrl.errorMessage = 'Desculpe não consegui encontrar nenhum professor'
			else { 
				professoresCtrl.errorMessage = '';
				ProfessoresList.updateProfessoresList(professoresCtrl.professores);
			}

		}, function(error){
			professoresCtrl.errorMessage = error;
			LoadingService.hideLoading();
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


}])