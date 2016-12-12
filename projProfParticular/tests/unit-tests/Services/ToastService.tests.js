describe('ToastService', function(){

	var ToastService = null;
    var cordovaToastMock;
    var deferred;



    beforeEach(function(){
        module(function($provide){
            $provide.service('$cordovaToast', function(){
                this.show = jasmine.createSpy('show');
            });
        });
      module('app.services');
    });

    beforeEach(inject(function(_ToastService_, $cordovaToast){
        ToastService = _ToastService_;
        cordovaToastMock = $cordovaToast;
    }));

    beforeEach(inject(function(_$q_, _$timeout_) {
            // Set `$q` and `$timeout` before tests run
            $q = _$q_;
            $timeout = _$timeout_;
        }));

    describe('Smoke test - ', function(){
    	it('should have started the service', function(){
    		expect(ToastService).not.toBe(null);
    	});
    });


    xdescribe('showToast function - ', function(){
    	it('should call toast', function(){
    		ToastService.showToast("bla", 'long', 'bottom');
    		deferred = $q.defer();
    		    deferred.promise.then(function(){
    		    	expect(cordovaToastMock.show).toHaveBeenCalled();
    		    });
    		// expect(cordovaToastMock.show).toHaveBeenCalledWith("bla", 'long', 'bottom');
    	})
    })


});