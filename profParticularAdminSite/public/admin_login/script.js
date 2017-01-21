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

    // create a message to display in our view
    $scope.message = '';
    $scope.page = 1;

    $scope.professor = {};


    $scope.register = function(){
      $scope.page = 2;
    }
    $scope.googleLogin = function(){
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
        console.log($scope.professor);

    }).catch(function(error){
      // Handle Errors here.
        var errorCode = error.code;
        $scope.message = error.message;
        console.log("nao consegui");
    });
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

