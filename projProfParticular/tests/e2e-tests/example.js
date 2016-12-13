var Nightmare = require('nightmare');
var expect = require('chai').expect; // jshint ignore:line
var should = require('chai').should; // jshint ignore:line

describe('demo', function() {
  this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds

  var url = 'http://google.com';

  describe('Start page', function () {
          it('should show form when loaded', function () {
              new Nightmare() 
                  .goto(url)
                  .evaluate(function() {
                    return document.querySelectorAll('form').length;
                  })
                  .run(function(err, result){
                    result.should.equal(1);
                  });
          });
      });
});