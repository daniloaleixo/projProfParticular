appProf
.controller('HomeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	var homeCtrl = this;

	homeCtrl.showChoices = true;
	homeCtrl.nivel = '';
	
	//console.log("home Ctrl:");
	console.log("HomeCtrl| : email: " + user.email);

}])