describe('ProfessoresListService', function(){

    var ProfessoresListService = null;

    beforeEach(module('app.services'));

    beforeEach(inject(function(){
        var $injector = angular.injector(['app.services']);
        ProfessoresListService = $injector.get('ProfessoresList');
    }))

    describe('Smoke test - ', function(){
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