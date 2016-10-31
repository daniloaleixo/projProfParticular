appProf
.controller('ProfessorCtrl', ['$scope', '$stateParams','ProfessoresList','$ionicLoading',
  // The following is the constructor function for this page's controller. 
  //See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, ProfessoresList, $ionicLoading) {
	professorCtrl = this;
	console.log("ProfessorCtrl| estou aqui");


	professorCtrl.user = {
		displayName: 'Blaaa',
		photoURL: 'img/null-avatar.png',
		email: 'bla@hot'
	};

	var showLoading = function(){
		$ionicLoading.show({
			template: '<ion-spinner icon="spiral"></ion-spinner>',
			noBackdrop: true
		});
	}

	var hideLoading = function(){
		$ionicLoading.hide();
	}

	console.log("ProfessorCtrl| " + $stateParams.professorUID);

	showLoading();

	professorCtrl.professor = ProfessoresList.getProfessorByUID($stateParams.professorUID);

	hideLoading();


	// set the rate and max variables
	professorCtrl.rating = {
		'max': 5,
		'readOnly': true
	}





}])