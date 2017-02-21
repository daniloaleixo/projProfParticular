xdescribe('ProfessoresCtrl', function(){
    var $scope,
        $rootScope,
        deferred,
        professoresCtrl = null,
        stateParamsMock,
        locationMock,
        loadingServiceMock,
        toastServiceMock,
        professoresListMock,
        firebaseMock;

    beforeEach(module('app.controllers'));

    beforeEach(inject(function($controller, _$rootScope_){
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();

        stateParamsMock = jasmine.createSpyObj('$stateParams spy', ['go'])

        locationMock = jasmine.createSpyObj('$location spy', ['path'])

        loadingServiceMock = jasmine
            .createSpyObj('LoadingService spy', ['showLoadingSpinner', 'hideLoading'])

        professoresListMock = jasmine
            .createSpyObj('ProfessoresList spy', ['all', 'updateProfessoresList'])

        ionicFilterBarMock = jasmine.createSpyObj('$ionicFilterBar spy', ['show'])

        ratingConfigMock = jasmine.createSpyObj('ratingConfig spy', ['dontknow'])


        professoresCtrl = $controller('ProfessoresCtrl', {
            $scope: $scope,
            $rootScope: $rootScope,
            $stateParams: stateParamsMock,
            ratingConfig: ratingConfigMock,
            LoadingService: loadingServiceMock,
            $ionicFilterBar: ionicFilterBarMock,
            ProfessoresList: professoresListMock,
            $location: locationMock
        });

    }))

    beforeEach(inject(function(_$q_, _$timeout_) {
            // Set `$q` and `$timeout` before tests run
            $q = _$q_;
            $timeout = _$timeout_;
        }));

    describe('Smoke test - ', function(){
    	it('should have started the controller', function(){
            expect(professoresCtrl).not.toBe(null);                
    	});
    });

    describe('showFilterBar function -', function(){
    	it('should call filter bar to show', function(){
            professoresCtrl.showFilterBar();
            expect(ionicFilterBarMock.show).toHaveBeenCalled();
    	})
    })

    describe('showProfessoresDetails function -', function(){
    	it('should go to professors details page', function(){
            var UID = "8B1eYE4JZ8MYTpVjYBZFlhGJBO52";
    		professoresCtrl.showProfessorDetails(UID);
            expect(locationMock.path).toHaveBeenCalledWith('/side-menu21/professores/' + UID);
    	})
    })



});