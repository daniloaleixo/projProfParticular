describe('ScheduledClassCtrl', function(){
    var scope,
        deferred,
        scheduledClassCtrl = null,
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

        scheduledClassCtrl = $controller('ScheduledClassCtrl', {
            $scope: scope,
            $stateParams: stateParamsMock,
            LoadingService: loadingServiceMock,
            MyScheduledClassesList: MyScheduledClassesListMock
        });



    }))

    // beforeEach(inject(function(_$q_, _$timeout_) {
    //         // Set `$q` and `$timeout` before tests run
    //         $q = _$q_;56
    //         $timeout = _$timeout_;
    //     }));

    // beforeEach(inject(function(){
    //     spyOn(MyScheduledClassesListMock, 'myScheduledClasses').and.callFake(function(myParam) {
    //         return params[myParam];
    //     });
    // }));

    xdescribe('Smoke test - ', function(){
    	it('should have started the controller', function(){
            user.uid = "54366";
            expect(scheduledClassCtrl).not.toBe(null);
    	});
    });


});