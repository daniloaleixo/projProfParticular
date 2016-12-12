describe('ProfessorCtrl', function(){
    var scope,
        deferred,
        professorCtrl = null,
        stateParamsMock,
        locationMock,
        loadingServiceMock,
        toastServiceMock,
        userInfosMock,
        firebaseMock;

    beforeEach(module('app.controllers'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();

        stateParamsMock = jasmine.createSpyObj('$stateParams spy', ['go']);

        professoresListMock = jasmine.createSpyObj('ProfessoresList spy', ['getProfessorByUID'])

        loadingServiceMock = jasmine.createSpyObj('LoadingService spy', ['showLoadingSpinner', 'hideLoading'])

        professorCtrl = $controller('ProfessorCtrl', {
            $scope: scope,
            $stateParams: stateParamsMock,
            ProfessoresList: professoresListMock,
            LoadingService: loadingServiceMock
        });

    }))

    beforeEach(inject(function(_$q_, _$timeout_) {
            // Set `$q` and `$timeout` before tests run
            $q = _$q_;
            $timeout = _$timeout_;
        }));

    describe('Smoke test - ', function(){
    	it('should have started the controller', function(){
    		expect(professorCtrl).not.toBe(null);
    	});

    	it('should have gotten the professor by UID', function(){
    		expect(professoresListMock.getProfessorByUID).toHaveBeenCalledWith(stateParamsMock.professorUID);
    	});
    });



});