describe('LoginCtrl', function() {

    var controller, 
        deferredLogin,
        dinnerServiceMock,
        stateMock,
        ionicPopupMock;

    //Load the App Module
    beforeEach(module('app', ['firebase']));  

    // TODO: Instantiate the Controller and Mocks
    beforeEach(inject(function($controller, $q) {  
        deferredLogin = $q.defer();

        // mock $state
        stateMock = jasmine.createSpyObj('$state spy', ['go']);

        // mock $ionicPopup
        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

        // instantiate LoginController
        controller = $controller('LoginCtrl', { 
                        '$ionicPopup': ionicPopupMock, 
                        '$state': stateMock }
                     );
    }));

    describe('loginCtrl.login', function() {

        // TODO: Call doLogin on the Controller

        it('should call login on FirebaseService', function() {
            expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledWith('test1', 'password1'); 
        });

        describe('when the login is executed,', function() {
            it('if successful, should change state to home', function() {

                // TODO: Mock the login response from DinnerService

                expect(stateMock.go).toHaveBeenCalledWith('home');
            });

            it('if unsuccessful, should show a popup', function() {

                // TODO: Mock the login response from DinnerService

                expect(ionicPopupMock.alert).toHaveBeenCalled();
            });
        });
    })
});