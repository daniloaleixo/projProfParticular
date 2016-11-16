describe('LoadingService', function(){

    var LoadingService = null;
    var ionicLoadingMock;

    beforeEach(function(){
        module(function($provide){
            $provide.service('$ionicLoading', function(){
                this.show = jasmine.createSpy('show');
            });
        });
      module('app.services');
    });

    beforeEach(inject(function($window, modalSvc, sampleSvc){
        mockWindow=$window;
        sampleSvcObj=sampleSvc;
    }));

    // beforeEach(module('app.services'));

    // beforeEach(inject(function(){
    //     var $injector = angular.injector(['app.services']);
    //     LoadingService = $injector.get('LoadingService');
    // }))


    describe('Smoke test - ', function(){
    	it('should have started the service', function(){
            expect(LoadingService).not.toBe(null);
    	});
    });


    xdescribe('showLoadingSpinner function - ', function(){
    	it('should call the ionicLoading witt spinner icon', function(){

    	})
    })

    xdescribe('showLoadingUpdating function - ', function(){
        it('should call the ionicLoading with <atualizando> text', function(){

        })
    })

    xdescribe('hideLoading function - ', function(){
        it('should call the hide loading', function(){

        })
    })


});