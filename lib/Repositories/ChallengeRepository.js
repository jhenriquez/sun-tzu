var fs        = require('fs');
var path      = require('path');
var Q         = require('q');
var IOHelpers = require('../cli-io');
var defaults  = require('../defaults'); 

function ChallengeRepository() { }

function createChallengeDirectory(challenge) {
  var challengeDir = path.join(process.cwd(),challenge.language, challenge.name);
  try {
    var challengeStat = fs.statSync(challengeDir);
    if (!challengeStat.isDirectory()) {
      return Q.reject(new Error('Something that is not a directory is on the challenges place.'));
    }
    return Q.resolve(challenge);
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        fs.mkdirSync(challengeDir);
        return Q.resolve(challenge);
      } catch (error) {
        return Q.reject(error);
      }
    }
  }
}

function saveChallengeCode(challenge) {
  var codeFilename = challenge.name + IOHelpers.getLanguageExtension(challenge.language);
  
  codeFilename = path.join(process.cwd(), challenge.language, challenge.name, codeFilename);
  
  if (IOHelpers.fileExists(codeFilename)) {
    return Q.resolve(challenge);
  }
  
  var deferred = Q.defer();
  
  IOHelpers
    .writeContent(codeFilename, challenge.code)
    .then(function () { deferred.resolve(challenge); }, deferred.reject);
    
  return deferred.promise;
}

function saveChallengeSession(challenge) {  
  var deferred = Q.defer();
  
  var sessionFilePath = path.join(process.cwd(), challenge.language, challenge.name, defaults.SESSION_FILENAME);
  
  IOHelpers
    .writeContent(sessionFilePath, JSON.stringify(challenge.session))
    .then(function () { deferred.resolve(challenge); }, deferred.reject);
    
  return deferred.promise;
}

ChallengeRepository.prototype.save = function (challenge) {
  
  if (!challenge.session.hasValidData()) {
    return Q.resolve(challenge);
  }
  
  var deferred = Q.defer();
  
  createChallengeDirectory(challenge)
    .then(saveChallengeSession)
    .then(saveChallengeCode)
    .then(deferred.resolve, deferred.reject);
           
  return deferred.promise;
};

module.exports = new ChallengeRepository();