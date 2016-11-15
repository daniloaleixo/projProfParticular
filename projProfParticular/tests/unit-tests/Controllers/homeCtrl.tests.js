xdescribe('HomeCtrl', function(){
    var scope;
    var homeCtrl;

    describe('Smoke test - ', function(){
    	it('should have started the controller', function(){

    	});
    });

    describe('geMaterias function - ', function(){
    	it('should have restarted variables', function(){
            //should have refNivel ''
            //shoudl have materias []
            //should have showChoicesNivel = false
    	});
    	describe('when nivel was choosen', function(){
    		it('if choosen get courses from firebase', function(){
    			//should have called load
    			//should have called getReferenceLevel
    			//should have called firebase database
    		});
            describe('when database was caught', function(){
                it('if it is a valid database', function(){
                    //should be able to loop thourh
                    //should have called digest
                    //should hide load
                })
                it('if not valid should throw a Toast', function(){
                    //should call hideLoading
                    //showChoicesMaterias = false
                });
            })
    		it('if not choosen should throw a Toast', function(){
    			//should call hideLoading
                //showChoicesMaterias = false
    		});
    	})
    });

    describe('getProfessores function - ', function(){
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

    describe('showProfessorsDetails function - ', function(){
        it('should call professor page', function(){

        })
    })
 
    describe('getReferenceLevel function - ', function(){
        it('if fundamental return fundamental', function(){
            
        })
    })

});