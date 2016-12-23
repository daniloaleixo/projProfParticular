describe('HomeCtrl', function(){
    var scope,
        deferred,
        homeCtrl = null,
        stateParamsMock,
        locationMock,
        loadingServiceMock,
        userInfosMock,
        toastServiceMock;

    beforeEach(module('app.controllers'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();

        stateParamsMock = jasmine.createSpyObj('$stateParams spy', ['go']);

        locationMock = jasmine.createSpyObj('$location spy', ['path']);

        loadingServiceMock = jasmine.createSpyObj('LoadingService spy', 
                            ['showLoadingSpinner', 'hideLoading']);

        userInfosMock = jasmine.createSpyObj('UserInfos spy', ['getUserInfos']);

        toastServiceMock = jasmine.createSpyObj('ToastService spy', ['showToast']);

        homeCtrl = $controller('HomeCtrl', {
            $scope: scope,
            $stateParams: stateParamsMock,
            $location: locationMock,
            LoadingService: loadingServiceMock,
            UserInfos: userInfosMock,
            ToastService: toastServiceMock
        });

    }))

    // beforeEach(inject(function(_$q_, _$timeout_) {
    //         // Set `$q` and `$timeout` before tests run
    //         $q = _$q_;
    //         $timeout = _$timeout_;
    //     }));

    xdescribe('Smoke test - ', function(){

        beforeEach(inject(function(){
            homeCtrl.user = {
                displayName: '',
                email: '',
                photoURL: '',
                cellphone: '54355656456',
                location: {
                        address : 'bla',
                        number: '',
                        complement: ''
                    }
            }
        }));

    	it('should have started the controller', function(){
            expect(homeCtrl).not.toBe(null);
    	});
    });


});