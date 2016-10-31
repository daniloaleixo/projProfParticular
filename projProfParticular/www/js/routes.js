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
            console.log("Home Resolve| estou aqui");
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn().then(function(){
              console.log("Home Resolve| deu certo wait for sigj in");
            }, function(error){
              console.log("Home Resolve| erro vou para a pagina de login");
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
          console.log("Menu Resolve|esrou aqui");
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

$urlRouterProvider.otherwise('/side-menu21/home')

  

});