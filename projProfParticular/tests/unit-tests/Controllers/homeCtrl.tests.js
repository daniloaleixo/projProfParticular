describe('HomeCtrl', function(){
    var scope,
        deferred,
        homeCtrl = null,
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

        // firebaseMock = jasmine.createSpyObj('firebase spy', ['auth', 'createUserWithEmailAndPassword', 
                                                            // 'signInWithEmailAndPassword']);

        homeCtrl = $controller('HomeCtrl', {
            $scope: scope,
            $stateParams: stateParamsMock,
            $location: locationMock,
            LoadingService: loadingServiceMock,
            ToastService: toastServiceMock,
            ProfessoresList: professoresListMock
        });

    }))

    beforeEach(inject(function(_$q_, _$timeout_) {
            // Set `$q` and `$timeout` before tests run
            $q = _$q_;
            $timeout = _$timeout_;
        }));


    describe('Smoke test - ', function(){
    	it('should have started the controller', function(){
            expect(homeCtrl).not.toBe(null);
    	});
    });

    describe('geMaterias function - ', function(){
    	it('should have restarted variables', function(){
            homeCtrl.getMaterias();
            expect(homeCtrl.materias.length).toBe(0);
            expect(homeCtrl.showChoicesNivel).toBe(false);
    	});
    	describe('when nivel was choosen', function(){
            it('if not choosen should throw a Toast', function(){
                homeCtrl.nivel = '';
                homeCtrl.getMaterias();
                expect(toastServiceMock.showToast)
                .toHaveBeenCalledWith("Escolha um nível", 'long', 'bottom');
                expect(homeCtrl.showChoicesMaterias).toBe(false);
                expect(loadingServiceMock.hideLoading).toHaveBeenCalled();
            });
    		it('if choosen get courses from firebase', function(){
                homeCtrl.nivel = 'fundamental';
                spyOn(homeCtrl, 'getReferenceFromLevel');
                homeCtrl.getMaterias();
                expect(loadingServiceMock.showLoadingSpinner).toHaveBeenCalled();
                expect(homeCtrl.getReferenceFromLevel).toHaveBeenCalledWith(homeCtrl.nivel.toLowerCase());
    		});
            describe('when database was caught', function(){
                it('if it is a valid database', function(){
                    homeCtrl.nivel = 'fundamental';
                    homeCtrl.getMaterias();
                    spyOn(scope, '$digest');
                    deferred = $q.defer();
                    deferred.promise.then(function(){
                        expect(homeCtrl.materias.length).not.toBe(0);
                        expect(scope.$digest).toHaveBeenCalled();
                        expect(loadingServiceMock.hideLoading).toHaveBeenCalled();
                    })
                })
                it('if not valid should throw a Toast', function(){
                    homeCtrl.nivel = 'fundamental';
                    homeCtrl.getMaterias();
                    spyOn(scope, '$digest');
                    deferred = $q.defer();
                    deferred.promise.catch(function(){
                        expect(toastServiceMock.showToast)
                       .toHaveBeenCalledWith("Desculpe não consegui encontrar matérias", 'long', 'bottom');
                       expect(homeCtrl.showChoicesMaterias).toBe(false);
                    })
                });
            })
    	})
    });

    xdescribe('getProfessores function - ', function(){
        it('should have restarted variables', function(){
            //should have refNivel ''
            //shoudl have professores []
            //shoudl have tempProfessores []
            //should have sem professores message ''
        });
        describe('when nivel was choosen', function(){

            describe('when materia was choosen', function(){
                it('if choosen get professors from firebase', function(){

                });
                it('if not choosen should throw a Toast', function(){

                });
            })
            it('if not choosen should throw a Toast', function(){

            });
        })
    });

    xdescribe('showProfessorsDetails function - ', function(){
        it('should call professor page', function(){

        })
    })
 
    describe('getReferenceLevel function - ', function(){
        it('if fundamental return fundamental', function(){
            var x = homeCtrl.getReferenceFromLevel('fundamental');
            var y = homeCtrl.getReferenceFromLevel('médio');
            expect(x).toBe('fundamental');
            expect(y).toBe('medio');
        })
    })

});