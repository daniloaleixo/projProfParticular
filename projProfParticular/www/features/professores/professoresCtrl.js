angular.module('app.controllers')
.controller('ProfessoresCtrl', ['$scope', '$rootScope', '$stateParams', 
	'ratingConfig', 'LoadingService','$ionicFilterBar','ProfessoresList', '$location',
  // The following is the constructor function for this page's controller. 
  //See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $stateParams,ratingConfig, LoadingService, 
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
		ProfessoresList.all().then(function(result){
			professoresCtrl.professors = result;
			LoadingService.hideLoading();
		})
		// professoresCtrl.professors = ProfessoresList.all();
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
		// console.log("ProfessoresCtrl| cliquei " + UID);
		$location.path('/side-menu21/professores/' + UID);
	}

	// 
	// 			EVENTS
	// 
	$rootScope.$on('LogoutEvent', function(event, args) {
		professoresCtrl.professors = new Array();
		professoresCtrl.errorMessage = '';
		professoresCtrl.filterBarInstance;
	});

	$rootScope.$on('LogInEvent', function(event, args) {
		professoresCtrl.atualizaListaProfessores();
	});


}])