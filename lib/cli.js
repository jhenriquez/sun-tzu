var fs   = require('fs');
var path = require('path');
var Q    = require('q');

var CONFIGURATION_FILENAME = '.sun-tzu';

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
  var configFilePath = path.join(process.cwd(), CONFIGURATION_FILENAME);
  var forceOverwrite = !!(options && options.force);
  
  try {
    
    fs.readFileSync(configFilePath, { encoding: 'utf8' });
    
    if (forceOverwrite) {
      writeContent(configFilePath, content, deferred);
      return deferred.promise;
    }
    
    deferred.reject(new Error('Warning: configuration file already exists. Use "force" to overwrite.'));
  } catch (err) { /* all good file does not exist */ }
   
  if (deferred.promise.isPending()) {
    writeContent(configFilePath, content, deferred);
  }
  
  return deferred.promise;
}

function train (cfg) {
  "use strict";
  var deferred = Q.defer();
  var language = cfg.language;
  var languageDir = path.join(process.cwd(), language);
  
  try {
    var pathInfo = fs.statSync(languageDir);  
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
       fs.mkdirSync(languageDir);
      } catch (error) {
       return deferred.reject(error);
      }
    }
  }
  
  deferred.resolve(); // folder created.
  
  return deferred.promise;
}

module.exports = {
  init: init,
  train: train
};

module.exports.CONFIGURATION_FILENAME = CONFIGURATION_FILENAME;