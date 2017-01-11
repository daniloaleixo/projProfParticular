// script.js

// create the module and name it scotchApp
var app = angular.module('adminSite', ['ui.router']);

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

app.controller('contactController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Contact';
});

app.controller('aboutController', function($scope) {

    // create a message to display in our view
    $scope.message = 'About';
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

  .state('about', {
    url: '/about',
    templateUrl: 'pages/about.html',
    controller: 'aboutController'
  })

  .state('contact', {
    url: '/contact',
    templateUrl: 'pages/contact.html',
    controller: 'contactController'
  })


  $urlRouterProvider.otherwise('/home');

});

