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

    var storageRef = firebase.storage().ref();


    $scope.zoneCheckBox = ['','','','','',''];
    $scope.courseStatusRadioButton = ['',''];
    $scope.classesCheckBox = {
      fundamental: ['','','','','','','','',''],
      medio:['','','','','','','','',''],
      superior:['','','','','','','','','']
    }
    $scope.message = '';
    $scope.page = 1;
    // $scope.page = 2;

    $scope.input = {
      email: '',
      password1: '',
      password2:''
    };

    $scope.professor = {
      uid:'',
      // uid:'12345',
      displayName:'',
      email:'',
      photoURL:'',
      // photoURL:'dsdsdff',
      cellphone:'',
      professorLevel:'1',
      courses:{
        show:[],
        level1:{},
        level2:{},
        level3:{}
      },
      locations:{
        main:{
          address:'',
          number:'',
          complement:''
        },
        zone:[]
      },
      curriculum:{
        about:'',
        formation:{
          college:{
            institute:'',
            status:'',
            course:''
          }
        }
      },
      assessments:{
        quantity: 0,
        teaching:5,
        knowledge:5,
        sympathy:5
      }
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

      // Upload Profile picture
      if($scope.professor.photoURL.length <= 0 && $scope.professor.uid.length > 0){
        var f = document.getElementById('image').files[0];
        console.log(f);
        var fileRef = storageRef.child('images').child($scope.professor.uid).child('profile.jpg');
        var uploadTask = fileRef.put(f);
        uploadTask.on('state_changed', function(snapshot){
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
        }, function(error) {
          // Handle unsuccessful uploads
        }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          var downloadURL = uploadTask.snapshot.downloadURL;
          $scope.professor.photoURL = downloadURL;
          setCheckBoxInTheProfessorInfo();
        });
      }
      else{
        setCheckBoxInTheProfessorInfo();
        console.log($scope.professor);
      }
    }

    var setCheckBoxInTheProfessorInfo = function(){
      // Zone checkbox
      for(var i = 0; i < $scope.zoneCheckBox.length; i++){
        if($scope.zoneCheckBox[i].length > 0) 
          $scope.professor.locations.zone.push($scope.zoneCheckBox[i]);
      }
      // Course Status
      for(var i = 0; i < $scope.courseStatusRadioButton.length; i++){
        if($scope.courseStatusRadioButton[i].length > 0) 
          $scope.professor.curriculum.formation.college.status = $scope.courseStatusRadioButton[i];
      }
      // Classes Fundamental
      for(var i = 0; i < $scope.classesCheckBox.fundamental.length; i++){
        if($scope.classesCheckBox.fundamental[i].length > 0){
          // Put the class in the respective place
          $scope.professor.courses.level1['1-'+ (i+1)] = $scope.classesCheckBox.fundamental[i];
          // If this class is not in the show list, we put it in
          if($scope.professor.courses.show.indexOf($scope.classesCheckBox.fundamental[i]) < 0)
            $scope.professor.courses.show.push($scope.classesCheckBox.fundamental[i]);
        }
      }
      // Classes Medio
      for(var i = 0; i < $scope.classesCheckBox.medio.length; i++){
        if($scope.classesCheckBox.medio[i].length > 0){
          // Put the class in the respective place
          $scope.professor.courses.level2['2-'+ (i+1)] = $scope.classesCheckBox.medio[i];
          // If this class is not in the show list, we put it in
          if($scope.professor.courses.show.indexOf($scope.classesCheckBox.medio[i]) < 0)
            $scope.professor.courses.show.push($scope.classesCheckBox.medio[i]);
        }
      }
      // Classes Superior
      for(var i = 0; i < $scope.classesCheckBox.superior.length; i++){
        if($scope.classesCheckBox.superior[i].length > 0){
          // Put the class in the respective place
          $scope.professor.courses.level3['3-'+ (i+1)] = $scope.classesCheckBox.superior[i];
          // If this class is not in the show list, we put it in
          if($scope.professor.courses.show.indexOf($scope.classesCheckBox.superior[i]) < 0)
            $scope.professor.courses.show.push($scope.classesCheckBox.superior[i]);
        }
      }
      $scope.professor.courses.show.sort();
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

