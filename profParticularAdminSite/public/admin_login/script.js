// Initialize Firebase
var config = {
  apiKey: "AIzaSyDRXTIuWMxl73q9aNrAUaxR7MMtSMXq32E",
  authDomain: "projprofparticular.firebaseapp.com",
  databaseURL: "https://projprofparticular.firebaseio.com",
  storageBucket: "projprofparticular.appspot.com",
  messagingSenderId: "240797807247"
};
firebase.initializeApp(config);


// create the module and name it scotchApp
var app = angular.module('adminSite', ['ui.router', 'google.places', 'firebase']);

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

app.controller('contactController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Contact';
});

app.controller('includeProfessorController', function($scope) {

    $scope.message = '';
    $scope.page = 2;

    $scope.input = {
      email: '',
      password1: '',
      password2:''
    };

    $scope.professor = {
      uid:'',
      displayName:'',
      email:'',
      photoURL:''
    };


    $scope.register = function(){
      $scope.message = '';

      if($scope.input.password1 == $scope.input.password2){
        firebase.auth()
        .createUserWithEmailAndPassword($scope.input.email, $scope.input.password1)
        .then(function(user){

          $scope.professor.uid = user.uid;
          $scope.professor.email = user.email;
          
          console.log($scope.professor);

        },function(error){
          if(error.code == 'auth/email-already-in-use')
            $scope.message = "O email escolhido já esta em uso";
          else
            $scope.message = "Não consegui realizar o cadastro, por favor tente novamente";
        });

        $scope.page = 2;
      } else {
        $scope.message = 'As senhas devem ser iguais';
      }

    }

    $scope.googleLogin = function(){
      $scope.message = '';

      var provider = new firebase.auth.GoogleAuthProvider();
      var tryGoogleSignIn = firebase.auth().signInWithPopup(provider);
      tryGoogleSignIn.then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        $scope.professor.uid = result.user.uid;
        $scope.professor.displayName = result.user.displayName;
        $scope.professor.email = result.user.email;
        $scope.professor.photoURL = result.user.photoURL;
        // console.log($scope.professor);

        $scope.page = 2;

      }).catch(function(error){
        // Handle Errors here.
          var errorCode = error.code;
          $scope.message = error.message;
          console.log("nao consegui");
      });
    }

    $scope.saveInfos = function(){

      // Upload the image
      var f = document.getElementById('image').files[0],
        r = new FileReader();
        r.onloadend = function(e){
          var data = e.target.result;
          //send your binary data via $http or $resource or do anything else with it
          console.log(data);
      }
      r.readAsBinaryString(f);



      console.log("dsadasdasd");
      console.log($scope.professor.photoURL);
    }
});

    


app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'pages/home.html',
    controller: 'mainController'
  })

  .state('includeProfessor', {
    url: '/includeProfessor',
    templateUrl: 'pages/includeProfessor.html',
    controller: 'includeProfessorController'
  })

  .state('contact', {
    url: '/contact',
    templateUrl: 'pages/contact.html',
    controller: 'contactController'
  })


  $urlRouterProvider.otherwise('/home');

});

