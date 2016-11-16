xdescribe('ProfileCtrl', function(){
    var scope,
        deferred,
        profileCtrl = null,
        stateParamsMock,
        locationMock,
        loadingServiceMock,
        toastServiceMock,
        userInfosMock,
        cordovaCameraMock,
        keyboardServiceMock;

    beforeEach(module('app.controllers'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();

        stateParamsMock = jasmine.createSpyObj('$stateParams spy', ['go'])

        locationMock = jasmine.createSpyObj('$location spy', ['path'])

        loadingServiceMock = jasmine.createSpyObj('LoadingService spy', ['showLoadingSpinner', 'hideLoading'])

        toastServiceMock = jasmine.createSpyObj('ToastService spy', ['showToast']);

        userInfosMock = jasmine.createSpyObj('UserInfos spy', ['getUserInfos'])

        cordovaCameraMock = jasmine.createSpyObj('$cordovaCamera spy', ['getPicture'])

        keyboardServiceMock = jasmine.createSpyObj('KeyboardService spy', ['hide'])


        profileCtrl = $controller('ProfileCtrl', {
            $scope: scope,
            $stateParams: stateParamsMock,
            $location: locationMock,
            LoadingService: loadingServiceMock,
            UserInfos: userInfosMock,
            $cordovaCamera: cordovaCameraMock,
            ToastService: toastServiceMock,
            KeyboardService: keyboardServiceMock
        });

        module(function ($provide) {
            $provide.value('user');
        });

    }))

    beforeEach(inject(function(_$q_, _$timeout_) {
            // Set `$q` and `$timeout` before tests run
            $q = _$q_;
            $timeout = _$timeout_;
        }));

    describe('Smoke test - ', function(){
    	it('should have started the controller', function(){
            expect(profileCtrl).not.toBe(null);
    	});
    });

    xdescribe('updateVariables function - ', function(){
        it('should call UserInfos service', function(){

        })
    })

    xdescribe('changeDisplayName function - ', function(){
        it('check if the name is valid', function(){
            
        })
        describe('when DisplayName is valid', function(){
            it('should call firebase database with new DisplayName', function(){
                //check load
            })
            describe('when trying to connect', function(){
                it('if successful', function(){
                    //keyboard hide
                    //show toast
                    //call update variables
                    //digest
                    //hide load
                })
                it('not successful', function(){
                    //show toast
                    //update variabels
                    //hide load
                })
            })
        })
    })

    xdescribe('uploadImage function - ', function(){
        
    })


});