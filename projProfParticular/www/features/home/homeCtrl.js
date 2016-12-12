angular.module('app.controllers')
.controller('HomeCtrl', ['$scope', '$stateParams', 'LoadingService', 'ToastService', 'ProfessoresList','$location', 
// The following is the constructor function for this page's controller. 
// See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, LoadingService, ToastService, ProfessoresList, $location) {
	var homeCtrl = this;

	homeCtrl.database = firebase.database();

	
}])