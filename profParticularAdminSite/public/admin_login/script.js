// script.js

// create the module and name it scotchApp
var app = angular.module('adminSite', ['ui.router', 'google.places']);

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
    $scope.message = 'About';
    $scope.page = 1;

    $scope.register = function(){
      $scope.page = 2;
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

