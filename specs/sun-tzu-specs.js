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
  });
  
  describe('Setup - Environment', function () {
    before(function () {
      dotenv.load();
      tzu = new Tzu(undefined);  
    });
    
    it('#getCurrentUser - should match the fixed username', function (done) {
  		 tzu.getCurrentUser()
  		   .then(function (user) {
  		      user.username.should.eql('some_user');
  			  done();
  		   }, function (e) {
  			 done(new Error('Unexpected Error: ' + e));
  		   });
  	  });
  });
  
  describe('Setup - Constructor', function () {
    before(function () {
      dotenv.load();
      tzu = new Tzu({ username: 'constructor_user' });  
    });
    
  it('#getCurrentUser - should match the fixed username', function (done) {
    tzu.getCurrentUser()
     .then(function (user) {
        user.username.should.eql('constructor_user');
      done();
     }, function (e) {
       done(new Error('Unexpected Error: ' + e));
     });
    });
  });
  
  
});