xdescribe('LoginCtrl', function(){
    var scope,
        deferred,
        loginCtrl = null,
        stateParamsMock,
        locationMock,
        loadingServiceMock,
        toastServiceMock,
        loginCtrlMock,
        firebaseMock;

    beforeEach(module('app.controllers'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();

        stateParamsMock = jasmine.createSpyObj('$stateParams spy', ['go'])

        locationMock = jasmine.createSpyObj('$location spy', ['path'])

        loadingServiceMock = jasmine.createSpyObj('LoadingService spy', ['showLoadingSpinner', 'hideLoading'])

        toastServiceMock = jasmine.createSpyObj('ToastService spy', ['showToast']);

        firebaseMock = jasmine.createSpyObj('firebase spy', ['auth', 'createUserWithEmailAndPassword', 
                                                            'signInWithEmailAndPassword']);

        loginCtrl = $controller('LoginCtrl', {
            $scope: scope,
            $stateParams: stateParamsMock,
            $location: locationMock,
            LoadingService: loadingServiceMock,
            ToastService: toastServiceMock
        });

    }))

    beforeEach(inject(function(_$q_, _$timeout_) {
            // Set `$q` and `$timeout` before tests run
            $q = _$q_;
            $timeout = _$timeout_;
        }));

    describe('Smoke test - ', function(){
    	it('should have started the controller', function(){ 
            expect(loginCtrl).not.toBe(null);
    	});
    });

    describe('Login function - ', function(){
        it('should detect when password is too short and throw a Toast', function(){
            loginCtrl.user.password = '1234';
            loginCtrl.login();
            expect(toastServiceMock.showToast)
            .toHaveBeenCalledWith("A senha deve ter mais de 6 caracteres", 'long', 'bottom');
    	});
    	it('should go to register funcion when user is trying to sign up', function(){
            spyOn(loginCtrl, 'register');
            loginCtrl.signingUp = true;
            loginCtrl.login();
            expect(loginCtrl.register).toHaveBeenCalled();
    	});
    	it('should try to login on firebase', function(){
            loginCtrl.signingUp = false;
            loginCtrl.user.email = 'bla@hotmail.com';
            loginCtrl.user.password = '123456';
            loginCtrl.login();
            expect(loginCtrl.trySign).not.toBe(null);
            expect(loadingServiceMock.showLoadingSpinner).toHaveBeenCalled();
    	});
    	describe('when login is executed ', function(){
    		it('if valid update user and change location to home', function(){
                loginCtrl.user.email = 'bla@hotmail.com';
                loginCtrl.user.password = '123456';
                loginCtrl.login();
                deferred = $q.defer();
                deferred.promise.then(function(){
                    expect(loadingServiceMock.hideLoading).toHaveBeenCalled();
                    expect(locationMock.path).toHaveBeenCalledWith('/home');
                })
    		});
    		it('if not valid should throw a Toast', function(){
    			loginCtrl.user.email = 'naoentra@hotmail.com';
                loginCtrl.user.password = '123456';
                loginCtrl.login();
                deferred = $q.defer();
                deferred.promise.then(function(){
                    expect(toastServiceMock.showToast)
                    .toHaveBeenCalledWith("Não consegui realizar o login, por favor tente novamente", 
                                                        'long', 'bottom');
                    expect(loadingServiceMock.hideLoading).toHaveBeenCalled();
                })
    		});
    	})
    });

    describe('Register function - ', function(){
    	it('should detect when password is too short and throw a Toast', function(){
            loginCtrl.user.password = '1234';
            loginCtrl.user.password2 = '1234';
            loginCtrl.register();
            expect(toastServiceMock.showToast)
            .toHaveBeenCalledWith("A senha deve ter mais de 6 caracteres", 'long', 'bottom');
        });
    	it('should detect when the two passwords are different', function(){
            loginCtrl.user.password = '1234567';
            loginCtrl.user.password2 = '123456';
            loginCtrl.register();
            expect(toastServiceMock.showToast)
            .toHaveBeenCalledWith("As senhas não coincidem", 'long', 'bottom');
    	});
    	xit('should try to register on firebase', function(){
            loginCtrl.signingUp = true;
            loginCtrl.user.email = 'bla@hotmail.com';
            loginCtrl.user.password = '123456';
            loginCtrl.register();
            expect(loginCtrl.tryRegister).not.toBe(null);
            expect(loadingServiceMock.showLoadingSpinner).toHaveBeenCalled();
    	});
    	xdescribe('when register is executed ', function(){
    		it('if valid go to login function', function(){
    			//show call hideLoading
    		});
    		it('if not valid should throw a Toast', function(){
    			//should call hideLoading
    		});
    	})
    });

    xdescribe('Google login function - ', function(){
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