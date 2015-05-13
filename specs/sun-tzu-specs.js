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
    
    it('#getCurrentUser - should match the configured (on environment) username', function (done) {
  		 tzu.getCurrentUser()
  		   .then(function (user) {
  		      user.username.should.eql('some_user');
  			  done();
  		   }, function (e) {
  			 done(new Error('Unexpected Error: ' + e));
  		   });
  	});
    
    it('#key - should match the configured (on environment)', function () {
      tzu.key.should.eql(process.env.CW_ACCESS_KEY);
    });
  });
  
  describe('Setup - Constructor', function () {
    before(function () {
      dotenv.load();
      tzu = new Tzu({ username: 'constructor_user', access_key: 'constructor_access_key' });  
    });
    
    it('#getCurrentUser - should match configured (by construction) username', function (done) {
      tzu.getCurrentUser()
       .then(function (user) {
          user.username.should.eql('constructor_user');
        done();
       }, function (e) {
         done(new Error('Unexpected Error: ' + e));
       });
    });
    
    it('#key - should match the configured (by constructor)', function () {
      tzu.key.should.eql('constructor_access_key');
    });
  });
});