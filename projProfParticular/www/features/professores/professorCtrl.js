angular.module('app.controllers')
.controller('ProfessorCtrl', ['$scope', '$stateParams','ProfessoresList','LoadingService',
  // The following is the constructor function for this page's controller. 
  //See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, ProfessoresList, LoadingService) {
	professorCtrl = this;

	LoadingService.showLoadingSpinner();

	professorCtrl.professor = ProfessoresList.getProfessorByUID($stateParams.professorUID);

	LoadingService.hideLoading();


	// set the rate and max variables
	professorCtrl.rating = {
		'max': 5,
		'readOnly': true
	}



}])