xdescribe('LoginCtrl', function(){
    var scope;
    var loginCtrl;

    describe('Smoke test - ', function(){
    	it('should have started the controller', function(){

    	});
    });

    describe('Login function - ', function(){
    	it('should have restarted global variable user', function(){

    	});
    	it('should detect when password is too short and throw a Toast', function(){

    	});
    	it('should go to register funcion when user is trying to sign up', function(){

    	});
    	it('should try to login on firebase', function(){
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

    describe('Register function - ', function(){
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

    describe('Google login function - ', function(){
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