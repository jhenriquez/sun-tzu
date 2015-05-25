var fs   = require('fs');
var path = require('path');
var Q    = require('q');

var CONFIGURATION_FILENAME = '.sun-tzu';

var settingsFilePath = path.join(process.cwd(), CONFIGURATION_FILENAME);
var globalSettings;

function loadGlobalSettings() {
  try {
    var settings_content = fs.readFileSync(settingsFilePath);
    globalSettings = JSON.parse(settings_content);
  } catch (err) {
    console.log(err);
  }
}

function writeContent(contentPath, content, deferred) {
  "use strict";
  fs.writeFile(contentPath, content, function (err) {
	  if (err) { return deferred.reject(err); }
	  deferred.resolve(content);
  });
}

function init (cfg, options) {
  "use strict";
  var deferred = Q.defer();
  var content = JSON.stringify(cfg);
  var forceOverwrite = !!(options && options.force);
  
  try {
    
    fs.readFileSync(settingsFilePath, { encoding: 'utf8' });
    
    if (forceOverwrite) {
      writeContent(settingsFilePath, content, deferred);
      return deferred.promise;
    }
    
    return Q.reject(new Error('Warning: configuration file already exists. Use "force" to overwrite.'));
  } catch (err) { /* all good file does not exist */ }
   
  writeContent(settingsFilePath, content, deferred);
  
  return deferred.promise;
}

function train (cfg) {
  "use strict";
  
  loadGlobalSettings();
  
  var deferred = Q.defer();
  var language = cfg && cfg.language || globalSettings.language;
  
  if (!language) {
    return Q.reject(new Error('Was not able to determine the language.'));
  }
  
  var languageDir = path.join(process.cwd(), language);
  
  try {
    var pathInfo = fs.statSync(languageDir);  
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        fs.mkdirSync(languageDir);
        deferred.resolve();
      } catch (error) {
        return Q.reject(error);
      }
    }
  }
  
  return deferred.promise;
}

module.exports = {
  init: init,
  train: train
};

module.exports.CONFIGURATION_FILENAME = CONFIGURATION_FILENAME;
