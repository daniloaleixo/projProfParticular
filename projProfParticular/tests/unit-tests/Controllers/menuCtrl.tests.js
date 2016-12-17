xdescribe('MenuCtrl', function(){
    var scope,
        deferred,
        menuCtrl = null,
        stateParamsMock,
        locationMock,
        loadingServiceMock,
        toastServiceMock,
        userInfosMock,
        firebaseMock,
        MyScheduledClassesListMock, 
        ProfessoresListMock;

    beforeEach(module('app.controllers'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();

        stateParamsMock = jasmine.createSpyObj('$stateParams spy', ['go']);

        locationMock = jasmine.createSpyObj('$location spy', ['path']);

        userInfosMock = jasmine.createSpyObj('UserInfos spy', ['getUserInfos']);

        ionicSideMenuDelegateMock = jasmine.createSpyObj('$ionicSideMenuDelegate spy', ['toggleLeft'])

        toastServiceMock = jasmine.createSpyObj('ToastService spy', ['showToast']);

        MyScheduledClassesListMock = jasmine
                .createSpyObj('MyScheduledClassesList spy', ['showToast']);

        ProfessoresListMock = jasmine.createSpyObj('ProfessoresList spy', ['showToast']);

        menuCtrl = $controller('MenuCtrl', {
            $scope: scope,
            $stateParams: stateParamsMock,
            $location: locationMock,
            UserInfos: userInfosMock,
            $ionicSideMenuDelegate: ionicSideMenuDelegateMock,
            ToastService: toastServiceMock
        });

    }))

    beforeEach(inject(function(_$q_, _$timeout_) {
            // Set `$q` and `$timeout` before tests run
            $q = _$q_;
            $timeout = _$timeout_;
        }));


    describe('Smoke test - ', function(){
    	it('should have started the controller', function(){
            expect(menuCtrl).not.toBe(null);
    	});
    });

    describe('updateVariables function - ', function(){
        it('should call UserInfos.getUserInfos', function(){
            menuCtrl.updateVariables();
            expect(userInfosMock.getUserInfos).toHaveBeenCalled();
            deferred = $q.defer();
                deferred.promise.then(function(){
                    expect(menuCtrl.user.displayName).not.toBe('');
                })
        })
    })

    describe('updateVariables function - ', function(){

        beforeEach(inject(function(){
            menuCtrl.user = {
                displayName: 'bla',
                email: 'blaaa',
                photoURL:'blaaaa'
            }
            menuCtrl.logout();
        }))
        
        it('if logout is successful', function(){
            deferred = $q.defer();
                deferred.promise.then(function(){
                    expect(menuCtrl.user.displayName).toBe(null);
                    expect(menuCtrl.user.photoURL).toBe(null);
                    expect(menuCtrl.user.email).toBe(null);
                    expect(locationMock.path).toHaveBeenCalledWith('/login');
                    expect(ionicSideMenuDelegateMock.toggleLeft).toHaveBeenCalled();
                })
            //user == null
            //menuCtrl.user null
            //location path
        })
        it('if not throw a Toast', function(){
            deferred = $q.defer();
                deferred.promise.catch(function(){
                    expect(toastServiceMock.showToast)
                    .toHaveBeenCalledWith("Não consegui fazer o logout", 'long', 'bottom');
                })
        })
    })



});