describe('LoginCtrl', function(){
    var scope,
        loginCtrl = null,
        stateParamsMock,
        locationMock,
        loadingServiceMock,
        toastServiceMock;

    beforeEach(module('app.controllers'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();

        stateParamsMock = jasmine.createSpyObj('$stateParams spy', ['go'])

        locationMock = jasmine.createSpyObj('$location spy', ['path'])

        loadingServiceMock = jasmine.createSpyObj('LoadingService spy', ['showLoadingSpinner', 'hideLoading'])

        toastServiceMock = jasmine.createSpyObj('ToastService spy', ['showToast']);

        loginCtrl = $controller('LoginCtrl', {
            $scope: scope,
            $stateParams: stateParamsMock,
            $location: locationMock,
            LoadingService: loadingServiceMock,
            ToastService: toastServiceMock
        });

    }))

    describe('Smoke test - ', function(){
    	it('should have started the controller', function(){ 
            expect(loginCtrl).not.toBe(null);
    	});
    });

    describe('Login function - ', function(){
        it('should detect when password is too short and throw a Toast', function(){
            loginCtrl.user.password = '1234';
            loginCtrl.login();
            expect(toastServiceMock.showToast).toHaveBeenCalledWith("A senha deve ter mais de 6 caracteres", 'long', 'bottom');
    	});
    	it('should go to register funcion when user is trying to sign up', function(){
            loginCtrl.signingUp = true;
            expect(loginCtrl.register()).toHaveBeenCalled();
    	});
    	xit('should try to login on firebase', function(){
    		//should call loading service
    	});
    	xdescribe('when login is executed ', function(){
    		it('if valid update user and change location to home', function(){
    			//should have a valid user now
    			//show call hideLoading
    			//should go to home
    		});
    		it('if not valid should throw a Toast', function(){
    			//should call hideLoading
    		});
    	})
    });

    xdescribe('Register function - ', function(){
    	it('should detect when password is too short', function(){

    	});
    	it('should detect when the two passwords are different', function(){

    	});
    	it('should try to register on firebase', function(){
    		//should call loading service
    	});
    	describe('when register is executed ', function(){
    		it('if valid go to login function', function(){
    			//show call hideLoading
    		});
    		it('if not valid should throw a Toast', function(){
    			//should call hideLoading
    		});
    	})
    });

    xdescribe('Google login function - ', function(){
    	it('should have restarted global variable user', function(){

    	});
    	it('should try to login with Google', function(){
    		//should have called a provider
    		//should have tried to login with google provider
    		//should call loading service
    	});
    	describe('when login is executed ', function(){
    		it('if valid update user and change location to home', function(){
    			//should have a valid user now
    			//show call hideLoading
    			//should go to home
    		});
    		it('if not valid should throw a Toast', function(){
    			//should call hideLoading
    		});
    	})
    });


});