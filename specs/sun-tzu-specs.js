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
    
    it('#getChallenge - should return requested challenge name', function (done) {
      var slug = 'valid-braces';
      tzu.getChallenge(slug)
        .then(function (challenge) {
          challenge.slug.should.eql(slug);
          challenge.name.should.exist();
          challenge.description.should.exist();
          done();
        }, function (err) {
          done(err);
        });
    });
    
    it.only('#train (random - peek) - should return a new challenge without starting a session', function (done) {
      tzu.train(Tzu.languages.JavaScript, Tzu.trainStrategies.random, true)
        .then(function (challenge) {
          challenge.name.should.exist();
          challenge.description.should.exist();
          chai.expect(challenge.session).to.not.exist();
          done();
        }, function (err) {
          done(err);
        });
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