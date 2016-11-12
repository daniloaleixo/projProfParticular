describe('Controllers', function(){
    var scope;
    var accountCtrl;

    // load the controller's module
    beforeEach(module('app.controllers'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        accountCtrl = $controller('AccountCtrl', {$scope: scope});
    }));

    // tests start here
    it('should have enabled friends to be true', function(){
        expect(accountCtrl.settings.enableFriends).toEqual(true);
    });
});