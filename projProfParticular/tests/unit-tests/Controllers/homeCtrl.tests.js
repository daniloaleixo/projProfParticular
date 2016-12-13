describe('HomeCtrl', function(){
    var scope,
        deferred,
        homeCtrl = null,
        stateParamsMock,
        loadingServiceMock,
        userInfosMock;

    beforeEach(module('app.controllers'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();

        stateParamsMock = jasmine.createSpyObj('$stateParams spy', ['go']);

        loadingServiceMock = jasmine.createSpyObj('LoadingService spy', 
                            ['showLoadingSpinner', 'hideLoading']);

        userInfosMock = jasmine.createSpyObj('UserInfos spy', ['getUserInfos']);

        homeCtrl = $controller('HomeCtrl', {
            $scope: scope,
            $stateParams: stateParamsMock,
            LoadingService: loadingServiceMock,
            UserInfos: userInfosMock
        });

    }))

    // beforeEach(inject(function(_$q_, _$timeout_) {
    //         // Set `$q` and `$timeout` before tests run
    //         $q = _$q_;
    //         $timeout = _$timeout_;
    //     }));

    describe('Smoke test - ', function(){
    	it('should have started the controller', function(){
            expect(homeCtrl).not.toBe(null);
    	});
    });


});