describe('ProfessoresCtrl', function(){
    var scope,
        deferred,
        professoresCtrl = null,
        stateParamsMock,
        locationMock,
        loadingServiceMock,
        toastServiceMock,
        professoresListMock,
        firebaseMock;

    beforeEach(module('app.controllers'));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();

        stateParamsMock = jasmine.createSpyObj('$stateParams spy', ['go'])

        locationMock = jasmine.createSpyObj('$location spy', ['path'])

        loadingServiceMock = jasmine.createSpyObj('LoadingService spy', ['showLoadingSpinner', 'hideLoading'])

        toastServiceMock = jasmine.createSpyObj('ToastService spy', ['showToast']);

        professoresListMock = jasmine.createSpyObj('ProfessoresList spy', ['updateProfessoresList'])

        ionicFilterBarMock = jasmine.createSpyObj('$ionicFilterBar spy', ['show'])

        ratingConfigMock = jasmine.createSpyObj('ratingConfig spy', ['dontknow'])


        professoresCtrl = $controller('ProfessoresCtrl', {
            $scope: scope,
            $stateParams: stateParamsMock,
            ratingConfig: ratingConfigMock,
            LoadingService: loadingServiceMock,
            $ionicFilterBar: ionicFilterBarMock,
            ProfessoresList: professoresListMock,
            $location: locationMock,
            ToastService: toastServiceMock,
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

    describe('atualizaListaProfessores function - ', function(){
        beforeEach(inject(function(){
            professoresCtrl.atualizaListaProfessores();
        }));

    	it('should call the firebase database', function(){
            expect(loadingServiceMock.showLoadingSpinner).toHaveBeenCalled();
    	});
    	describe('when connecting with firebase database', function(){
    		it('if successful', function(){
    			deferred = $q.defer();
                    deferred.promise.then(function(){
                        expect(loadingServiceMock.hideLoading).toHaveBeenCalled();
                    })
    		})
            it('if not successful', function(){
                deferred = $q.defer();
                    deferred.promise.catch(function(){
                        expect(professoresCtrl.errorMessage.length).not.toBe(0);
                        expect(loadingServiceMock.hideLoading).toHaveBeenCalled();
                    })
            })
    		describe('when successful', function(){
    			it('if there is professors at database', function(){
                    deferred = $q.defer();
                    deferred.promise.then(function(){
                        expect(professoresCtrl.errorMessage).toBe('');
                        expect(professoresListMock.updateProfessoresList)
                        .toHaveBeenCalledWith(professoresCtrl.professores);
                    })
    			})
    			it('if there is no professors at database', function(){
    				deferred = $q.defer();
                    deferred.promise.then(function(){
                        professoresCtrl.professores = {};
                        expect(professoresCtrl.errorMessage)
                        .toBe('Desculpe não consegui encontrar nenhum professor');
                    })
    			})
    		})
    	})
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