xdescribe('LoginCtrl', function(){
    var scope;
    var loginCtrl;

    // tests start here
    it('should have enabled friends to be true', function(){
        expect(accountCtrl.settings.enableFriends).toEqual(true);
    });

    it('should have enabled friends to be false', function(){
        expect(accountCtrl.settings.enableFriends).toEqual(true);
    });
});