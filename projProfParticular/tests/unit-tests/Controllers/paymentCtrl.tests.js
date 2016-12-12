describe('PaymentCtrl', function(){
    var scope,
        deferred,
        paymentCtrl = null,
        stateParamsMock;

    beforeEach(module('app.controllers'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();

        stateParamsMock = jasmine.createSpyObj('$stateParams spy', ['go'])

        paymentCtrl = $controller('PaymentCtrl', {
            $scope: scope,
            $stateParams: stateParamsMock
        });

    }))

    // beforeEach(inject(function(_$q_, _$timeout_) {
    //         // Set `$q` and `$timeout` before tests run
    //         $q = _$q_;
    //         $timeout = _$timeout_;
    //     }));

    describe('Smoke test - ', function(){
    	it('should have started the controller', function(){
            expect(paymentCtrl).not.toBe(null);
    	});
    });


});