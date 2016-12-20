xdescribe('HistoryCtrl', function(){
    var scope,
        deferred,
        historyCtrl = null,
        stateParamsMock,
        loadingServiceMock,
        MyScheduledClassesListMock;

    beforeEach(module('app.controllers'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();

        stateParamsMock = jasmine.createSpyObj('$stateParams spy', ['go']);

        loadingServiceMock = jasmine.createSpyObj('LoadingService spy', 
                                ['showLoadingSpinner', 'hideLoading']);

        MyScheduledClassesListMock = jasmine.createSpyObj('MyScheduledClassesList spy', 
                                ['bla']);

        spyOn(MyScheduledClassesListMock, 'myScheduledClasses').and.callFake(function(myParam) {
            return params[myParam];
        });

        historyCtrl = $controller('HistoryCtrl', {
            $scope: scope,
            $stateParams: stateParamsMock,
            LoadingService: loadingServiceMock,
            MyScheduledClassesList: MyScheduledClassesListMock
        });

    }))

    // beforeEach(inject(function(_$q_, _$timeout_) {
    //         // Set `$q` and `$timeout` before tests run
    //         $q = _$q_;
    //         $timeout = _$timeout_;
    //     }));

    describe('Smoke test - ', function(){
    	it('should have started the controller', function(){
            expect(historyCtrl).not.toBe(null);
    	});
    });


});