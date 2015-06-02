var ChallengeRepository = require('../lib/Repositories/ChallengeRepository');
var ChallengeListing    = require('../lib/Values/ChallengeListing');
var path                = require('path'); 
var rimraf              = require('rimraf');
var chai                = require('chai');
var dirtyChai           = require('dirty-chai');
var cli                 = require('../lib/cli');
var defaults            = require('../lib/defaults');

describe('list - Command-Line Interface', function () {
  var languageDir = path.join(process.cwd(),'javascript');
  
  before(function () {
	 chai.use(dirtyChai);
	 chai.should(); 
  });
  
  beforeEach(function (done) {
    cli.init({
      username: 'specs_user',
      access_key: 'specs_access_key',
      language: 'javascript'
    })
    .then(function () {
       cli
        .train({ language: defaults.supportedLanguages.JavaScript })
        .then(function () {
          done();
        }, done);
    },done);
  });
  
  afterEach(function (done) {
    Object
      .keys(defaults.supportedLanguages)
      .map(function (language, index, arr) {
        rimraf(languageDir, function (err) {
          if(err) { done(err); }
          if (index === (arr.length - 1)) { 
            done(); // Only execute done if this is the last language being checked.
          }
        });
      });
  });
  
  it('should list all languages if none specified', function (done) {
    cli
      .list()
      .then(function (challengeListing) {
        chai.expect(challengeListing).to.be.ok();
        challengeListing.should.be.an.instanceof(ChallengeListing);
        challengeListing.count().should.be.above(0);

        done();
      }, done);
  });
});