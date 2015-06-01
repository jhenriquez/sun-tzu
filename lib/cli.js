var fs                  = require('fs');
var path                = require('path');
var Q                   = require('q');
var defaults            = require('./defaults');
var Tzu                 = require('../lib/sun-tzu');
var IOHelpers           = require('./cli-io');
var Challenge           = require('./Entities/Challenge');
var ChallengeRepository = require('./Repositories/ChallengeRepository'); 

var settingsFilePath = path.join(process.cwd(), defaults.CONFIGURATION_FILENAME);

function createChallenge(kata, language) {
  var challenge = new Challenge(kata.slug, language);
  challenge.session.project = kata.session && kata.session.projectId;
  challenge.session.solution = kata.session && kata.session.solutionId;
  challenge.code = kata.session && kata.session.setup;
  return challenge;
}

function init (cfg, options) {
  "use strict";
  
  var content = JSON.stringify(cfg);
  var forceOverwrite = !!(options && options.force);
  
  try {
    
    fs.readFileSync(settingsFilePath, { encoding: 'utf8' });
    
    if (forceOverwrite) {
      return IOHelpers.writeContent(settingsFilePath, content);
    }
    
    return Q.reject(new Error('Warning: configuration file already exists. Use "force" to overwrite.'));
  } catch (err) { /* all good file does not exist */ }
   
  return IOHelpers.writeContent(settingsFilePath, content);
}

function train (params) {
  "use strict";
  
  params = params || {};
    
  var globalSettings = IOHelpers.readGlobalSettings(settingsFilePath);
  
  
  var language = params && params.language || globalSettings.language;
  
  if (!language) {
    return Q.reject(new Error('Was not able to determine the language.'));
  }
  
  var languageDir = path.join(process.cwd(), language);
  
  var api = new Tzu({
    username: globalSettings && globalSettings.username,
    access_key: globalSettings && globalSettings.access_key
  });
  
  try {
    fs.statSync(languageDir);  
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        fs.mkdirSync(languageDir);
      } catch (error) {
        return Q.reject(error);
      }
    }
  }
  
  var deferred = Q.defer();
  
  api
    .train({
      language: language,
      peek: params.peek
    })
    .then(function (kata) {      
      var challenge = createChallenge(kata, language);
      
      ChallengeRepository
        .save(challenge)
        .then(deferred.resolve, deferred.reject);
          
    }, deferred.reject);
    
  return deferred.promise;
}

module.exports = {
  init: init,
  train: train
};