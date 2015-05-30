var ChallengeRepository = require('../lib/Repositories/ChallengeRepository');
var path                = require('path'); 
var rimraf              = require('rimraf');
var chai                = require('chai');
var dirtyChai           = require('dirty-chai');

describe('list - Command-Line Interface', function () {
  var languageDir = path.join(process.cwd(),'javascript');
  
  before(function () {
	 chai.use(dirtyChai);
	 chai.should(); 
  });
  
  describe('Listing all languages', function () {
    
  });
  
  describe('Listing chanllenges by language', function () {
    
  });
});