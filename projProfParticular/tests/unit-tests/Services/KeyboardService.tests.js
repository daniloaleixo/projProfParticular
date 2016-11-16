describe('KeyboardService', function(){

	var KeyboardService = null;

	beforeEach(module('app.services'));

	beforeEach(inject(function(){
		var $injector = angular.injector(['app.services']);
		KeyboardService = $injector.get('KeyboardService');
	}))

    describe('Smoke test - ', function(){
    	it('should have started the service', function(){
    		expect(KeyboardService).not.toBe(null);
    	});
    });


    xdescribe('hide function - ', function(){
    	it('should call hide keyboard', function(){
    		KeyboardService.hide();
    	})
    })


});