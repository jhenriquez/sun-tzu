var ChallengeRepository = require('../lib/Repositories/ChallengeRepository');
var path                = require('path'); 
var rimraf              = require('rimraf');
var chai                = require('chai');
var dirtyChai           = require('dirty-chai');
var cli                 = require('../lib/cli');

describe('list - Command-Line Interface', function () {
  var languageDir = path.join(process.cwd(),'javascript');
  
  before(function () {
	 chai.use(dirtyChai);
	 chai.should(); 
  });
  
  it('should list all languages if none specified', function (done) {
    cli
      .list()
      .then(function (challengeListing) {
        
      }, done);
  });
  
  it('should list a single language when one specified');
});