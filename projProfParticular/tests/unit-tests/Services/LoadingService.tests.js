describe('LoadingService', function(){

    var LoadingService = null;
    var ionicLoadingMock;

    beforeEach(function(){
        module(function($provide){
            $provide.service('$ionicLoading', function(){
                this.show = jasmine.createSpy('show');
                this.hide = jasmine.createSpy('hide');
            });
        });
      module('app.services');
    });

    beforeEach(inject(function(_LoadingService_, $ionicLoading){
        LoadingService = _LoadingService_;
        ionicLoadingMock = $ionicLoading;
    }));


    describe('Smoke test - ', function(){
    	it('should have started the service', function(){
            expect(LoadingService).not.toBe(null);
    	});
    });


    describe('showLoadingSpinner function - ', function(){
    	it('should call the ionicLoading witt spinner icon', function(){
            LoadingService.showLoadingSpinner();
            expect(ionicLoadingMock.show).toHaveBeenCalledWith({
                    template: '<ion-spinner icon="spiral"></ion-spinner>',
                    noBackdrop: true
                });
    	})
    })

    describe('showLoadingUpdating function - ', function(){
        it('should call the ionicLoading with <atualizando> text', function(){
            LoadingService.showLoadingUpdating();
            expect(ionicLoadingMock.show).toHaveBeenCalledWith({
                    template: 'Atualizando...',
                    noBackdrop: true
                });
        })
    })

    describe('hideLoading function - ', function(){
        it('should call the hide loading', function(){
            LoadingService.hideLoading();
            expect(ionicLoadingMock.hide).toHaveBeenCalled();
        })
    })


});