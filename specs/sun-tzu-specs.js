var chai       = require('chai');
var dirtyChai  = require('dirty-chai'); 
var dotenv     = require('dotenv');
var superagent = require('superagent');
var Tzu        = require('../lib/sun-tzu');
var supermock  = require('superagent-mock');
var fixtures   = require('./response-fixtures');

supermock(superagent, fixtures);

describe('Sun-Tzu', function () {
  var tzu;
  
  before(function () {
  	chai.use(dirtyChai);
  	chai.should();
    dotenv.load();
  	tzu = new Tzu(undefined); 	
  });
  
  describe('#getCurrentUser', function () {
	  it('should match the fixed username', function (done) {
		 tzu.getCurrentUser()
		   .then(function (user) {
		      user.username.should.eql('some_user');
			  done();
		   }, function (e) {
			 done(new Error('Unexpected Error: ' + e));
		   });
	  });
  });
});