describe('UserInfosService', function(){

    var UserInfosService = null;

    beforeEach(module('app.services'));

    beforeEach(inject(function(){
        var $injector = angular.injector(['app.services']);
        UserInfosService = $injector.get('UserInfos');
    }))

    xdescribe('Smoke test - ', function(){
    	it('should have started the service', function(){
            expect(UserInfosService).not.toBe(null);
    	});
    });


    xdescribe('updateUser function - ', function(){
        beforeEach(inject(function(){
            UserInfosService.getUserInfos();
        }))

    	it('should have updated the user infos', function(){

    	})
        it('should get the user infos', function(){
            
        })
    })


});