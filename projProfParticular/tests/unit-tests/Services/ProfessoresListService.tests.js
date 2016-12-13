describe('ProfessoresList', function(){

    var ProfessoresList = null;
    var LoadingServiceMock,
        ToastServiceMock;

    beforeEach(function(){
        module(function($provide){
            $provide.service('LoadingService', function(){
                this.showLoadingSpinner = jasmine.createSpy('showLoadingSpinner');
                this.hideLoading = jasmine.createSpy('hideLoading');
            });
            $provide.service('ToastService', function(){
                this.showToast = jasmine.createSpy('showToast');
            });
        });
      module('app.services');
    });

    beforeEach(inject(function(_ProfessoresList_, _ToastService_, _LoadingService_){
        ProfessoresList = _ProfessoresList_;
        ToastServiceMock = ToastService;
        LoadingServiceMock = LoadingService;
    }));


    xdescribe('Smoke test - ', function(){
    	it('should have started the service', function(){
            expect(ProfessoresListService).not.toBe(null);
    	});
    });

    xdescribe('all function - ', function(){
        beforeEach(inject(function(){
            ProfessoresListService.professores = [1, 2, 3];
        }))
    	it('should get all professors', function(){
            var profs = ProfessoresListService.all();
            expect(profs.length).toEqual(3);
    	})
    })

    xdescribe('updateProfessoresList function - ', function(){
    	it('should include the professors in the list', function(){
            var profs = [4, 5, 6];
            ProfessoresListService.updateProfessoresList(profs);
            expect(ProfessoresListService.professores.length).toEqual(3);
    	})
    })

    xdescribe('getProfessorByUID function - ', function(){
    	it('should get the professor by UID', function(){

    	})
    })


});