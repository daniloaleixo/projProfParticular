describe('Clicking on the login button ', function(){  
    var username, password, loginButton;

    beforeEach(function() {
        browser.get('/#/login');
        username = element(by.model('loginCtrl.user.email'));
        password = element(by.model('loginCtrl.user.password'));
        loginButton = element(by.id('loginButton'));

        browser.waitForAngular();
    });

    it('should validate the credentials for a successful login', function() {

        beforeEach(function(){
            username.sendKeys('bla@hotmail.com');
            password.sendKeys('123456');
            login.click().then();            
        })
        expect(browser.getLocationAbsUrl()).toMatch('/login');  
    });

    /*it('should display a popup for an unsuccessful login', function() {  
        username.sendKeys('gonehybrid@hotmail.com');
        password.sendKeys('idontknow');

        loginButton.click().then(function() {
            expect(browser.getLocationAbsUrl()).toMatch('/login');

            var popup = element(by.css('.popup-container.popup-showing.active'));
            expect(popup.isDisplayed()).toBeTruthy();
        });
    });*/
});