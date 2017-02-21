angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  $stateProvider
    
  

  .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'features/home/home.html',
        controller: 'HomeCtrl as homeCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", '$state', function(Auth, $state) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn().then([], function(error){
              return $state.go('login')
            });
          }]
        }
      }
    }
  })

  .state('menu.professores', {
    url: '/professores',
    views: {
      'side-menu21': {
        templateUrl: 'features/professores/professores.html',
        controller: 'ProfessoresCtrl as professoresCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      }
    }
  })

  .state('menu.profile', {
    url: '/profile',
    views: {
      'side-menu21': {
        templateUrl: 'features/profile/profile.html',
        controller: 'ProfileCtrl as profileCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      }
    }
  })

  .state('menu.chooseClass', {
    url: '/chooseClass',
    views: {
      'side-menu21': {
        templateUrl: 'features/chooseClass/chooseClass.html',
        controller: 'ChooseClassCtrl as chooseClassCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      }
    }
  })

  .state('menu.requestClass', {
    url: '/requestClass',
    views: {
      'side-menu21': {
        templateUrl: 'features/requestClass/requestClass.html',
        controller: 'RequestClassCtrl as requestClassCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      }
    }
  })

  .state('menu.scheduledClass', {
    url: '/scheduledClass',
    views: {
      'side-menu21': {
        templateUrl: 'features/scheduledClass/scheduledClass.html',
        controller: 'ScheduledClassCtrl as scheduledClassCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      }
    }
  })

  .state('menu.payment', {
    url: '/payment',
    views: {
      'side-menu21': {
        templateUrl: 'features/payment/payment.html',
        controller: 'PaymentCtrl as paymentCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      }
    }
  })

  .state('menu.history', {
    url: '/history',
    views: {
      'side-menu21': {
        templateUrl: 'features/history/history.html',
        controller: 'HistoryCtrl as historyCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      }
    }
  })

  .state('menu.about', {
    url: '/about',
    views: {
      'side-menu21': {
        templateUrl: 'features/about/about.html',
        controller: 'AboutCtrl as aboutCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      }
    }
  })

  .state('menu.professor', {
    url: '/professores/:professorUID',
    views: {
      'side-menu21': {
        templateUrl: 'features/professores/professor.html',
        controller: 'ProfessorCtrl as professorCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      }
    }
  })


  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'features/menu/menu.html',
    controller: 'MenuCtrl as menuCtrl',
    resolve: {
      // controller will not be loaded until $waitForSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory
      'currentAuth': ['Auth', '$state', function(Auth, $state){
        // $waitForSignIn returns a promise so the resolve waits for it to complete
        return Auth.$waitForSignIn().then(function(auth){
          user = auth; 
          //if(user == null) return $state.go('login');
        }, function(error){
          console.log("Menu Resolve| Não consegui autenticar vou para o login");
          return $state.go('login')
        });
      }]
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'features/auth/login.html',
    controller: 'LoginCtrl as loginCtrl'
  })

  .state('loading', {
    url: '/loading',
    templateUrl: 'features/loading/loading.html',
    controller: 'LoadingCtrl as loadingCtrl',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", '$state', function(Auth, $state) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn().then([], function(error){
          return $state.go('login');
        });
      }]
    }
  })

$urlRouterProvider.otherwise('/loading')

  

});