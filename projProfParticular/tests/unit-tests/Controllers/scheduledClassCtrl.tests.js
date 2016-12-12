describe('ScheduledClassCtrl', function(){
    var scope,
        deferred,
        scheduledClassCtrl = null,
        stateParamsMock;

    beforeEach(module('app.controllers'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();

        stateParamsMock = jasmine.createSpyObj('$stateParams spy', ['go'])

        scheduledClassCtrl = $controller('ScheduledClassCtrl', {
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
            expect(scheduledClassCtrl).not.toBe(null);
    	});
    });


});