var chai      = require('chai');
var dirtyChai = require('dirty-chai'); 
var dotenv    = require('dotenv');
var Tzu       = require('../lib/sun-tzu'); 

describe('Sun-Tzu', function () {
  var tzu;
  before(function () {
	chai.use(dirtyChai);
	chai.should();
	dotenv.load();
	tzu = new Tzu(); 	
  });
  
  describe('Environment Setup', function () {
	 it('Environment Variables CW_ACCESS_KEY and CW_USERNAME are properly set', function () {
		process.env.CW_ACCESS_KEY.should.exist();
		process.env.CW_USERNAME.should.exist();
	 });
  });
  
  describe('#getCurrentUser', function () {
	  it('returned username should match the currently configured username (CW_USERNAME)', function (done) {
		 tzu.getCurrentUser()
		   .then(function (user) {
		      user.username.should.eql(process.env.CW_USERNAME);
			  done();
		   }, function (e) {
			 done(new Error('Unexpected Error: ' + e));
		   });
	  });
  });
});