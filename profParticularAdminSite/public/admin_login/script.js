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

app.controller('deleteProfessorController', function($scope) {

    // create a message to display in our view
    $scope.message = '';
    $scope.professors = [];


    $scope.getProfessors = function(){
      //get all professors
      firebase.database().ref().child('professors')
        .once('value').then(function(snapshot){

        Object.keys(snapshot.val()).forEach(function(professor){
          if(professor) {
            var temp = snapshot.val()[professor];
            $scope.professors
              .push(temp);
          }
        });
        console.log("Agora foi");
        $scope.$digest();
      }, function(error){
        console.log("Deu erro");
      }); 
    }

    $scope.getProfessors();

    $scope.deleteProfessor = function(professorUID){
      // firebase.database().ref().child('professors').child(professorUID).remove();
    }
});

app.controller('includeProfessorController', function($scope) {

    var storageRef = firebase.storage().ref();



    $scope.isGoogleLogin = false;
    $scope.zoneCheckBox = ['','','','','',''];
    $scope.courseStatusRadioButton = ['',''];
    $scope.classesCheckBox = {
      fundamental: ['','','','','','','','',''],
      medio:['','','','','','','','',''],
      superior:['','','','','','','','','']
    }
    $scope.message = '';
    // $scope.page = 1;
    // $scope.page = 2;
    $scope.page = 1;

    $scope.input = {
      email: '',
      password1: '',
      password2:''
    };

    $scope.professor = {
      uid:'',
      // uid:'32432',
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
        $scope.isGoogleLogin = true;

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
          uploadProfessorInFirebase();
          $scope.page = 3;
        });
      }
      else{
        setCheckBoxInTheProfessorInfo();
        console.log($scope.professor);
        uploadProfessorInFirebase();
        $scope.page = 3;
      }
    }

    $scope.resetVariables = function(){
      $scope.professor = {
      uid:'',displayName:'',email:'',photoURL:'',cellphone:'',professorLevel:'1',
      courses:{        show:[],level1:{},level2:{},level3:{} },
      locations:{        main:{
          address:'',number:'',complement:''}, zone:[]      },
      curriculum:{        about:'',formation:{college:{
            institute:'',status:'',course:''}}},
      assessments:{quantity: 0,teaching:5,knowledge:5,sympathy:5} };
      $scope.page = 1;
      $scope.isGoogleLogin = false;
      $scope.zoneCheckBox = ['','','','','',''];
      $scope.courseStatusRadioButton = ['',''];
      $scope.classesCheckBox = {fundamental: ['','','','','','','','',''],
        medio:['','','','','','','','',''],
        superior:['','','','','','','','','']}
      $scope.message = '';
      $scope.input = {email: '',password1: '',password2:''};
    }

    var setCheckBoxInTheProfessorInfo = function(){
      var coursesRef = firebase.database().ref().child('courses');
      var professorUID = $scope.professor.uid;

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
      var fundamentalLevelRef = coursesRef.child('level1');
      for(var i = 0; i < $scope.classesCheckBox.fundamental.length; i++){
        if($scope.classesCheckBox.fundamental[i].length > 0){
          // Put the class in the respective place
          $scope.professor.courses.level1['1-'+ (i+1)] = $scope.classesCheckBox.fundamental[i];
          // If this class is not in the show list, we put it in
          if($scope.professor.courses.show.indexOf($scope.classesCheckBox.fundamental[i]) < 0)
            $scope.professor.courses.show.push($scope.classesCheckBox.fundamental[i]);
          // Upload the professor to the course
          var classNumber = '1-'+ (i+1);
          var newProfessorRef = fundamentalLevelRef.child(classNumber).child('professors').push();
          newProfessorRef.set(professorUID);
        }
      }
      // Classes Medio
      var medioLevelRef = coursesRef.child('level2');
      for(var i = 0; i < $scope.classesCheckBox.medio.length; i++){
        if($scope.classesCheckBox.medio[i].length > 0){
          // Put the class in the respective place
          $scope.professor.courses.level2['2-'+ (i+1)] = $scope.classesCheckBox.medio[i];
          // If this class is not in the show list, we put it in
          if($scope.professor.courses.show.indexOf($scope.classesCheckBox.medio[i]) < 0)
            $scope.professor.courses.show.push($scope.classesCheckBox.medio[i]);
          // Upload the professor to the course
          var classNumber = '2-'+ (i+1);
          var newProfessorRef = medioLevelRef.child(classNumber).child('professors').push();
          newProfessorRef.set(professorUID);
        }
      }
      // Classes Superior
      var superiorLevelRef = coursesRef.child('level3');
      for(var i = 0; i < $scope.classesCheckBox.superior.length; i++){
        if($scope.classesCheckBox.superior[i].length > 0){
          // Put the class in the respective place
          $scope.professor.courses.level3['3-'+ (i+1)] = $scope.classesCheckBox.superior[i];
          // If this class is not in the show list, we put it in
          if($scope.professor.courses.show.indexOf($scope.classesCheckBox.superior[i]) < 0)
            $scope.professor.courses.show.push($scope.classesCheckBox.superior[i]);
          // Upload the professor to the course
          var classNumber = '3-'+ (i+1);
          var newProfessorRef = superiorLevelRef.child(classNumber).child('professors').push();
          newProfessorRef.set(professorUID);
        }
      }
      $scope.professor.courses.show.sort();
      $scope.professor.locations.main.address = 
          $scope.professor.locations.main.address.formatted_address;
    }
    var uploadProfessorInFirebase = function(){
      var professorsRef = firebase.database().ref().child('professors');
      professorsRef.child($scope.professor.uid).set($scope.professor);
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

  .state('deleteProfessor', {
    url: '/deleteProfessor',
    templateUrl: 'pages/deleteProfessor.html',
    controller: 'deleteProfessorController'
  })


  $urlRouterProvider.otherwise('/home');

});

