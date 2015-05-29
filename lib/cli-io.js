var fs = require('fs');
var Q  = require('q');

module.exports.readGlobalSettings = function readGlobalSettings (settingsFilePath) {
  if (!settingsFilePath) {
    var cli = require('./cli');
    var path = require('path');
    settingsFilePath = path.join(process.cwd(),cli.CONFIGURATION_FILENAME);
  }
  
  var settings_content = fs.readFileSync(settingsFilePath);
  return JSON.parse(settings_content);
};

module.exports.writeContent = function writeContent (contentPath, content) {
  "use strict";
  var deferred = Q.defer();
  
  fs.writeFile(contentPath, content, function (err) {
	  if (err) { return deferred.reject(err); }
	  deferred.resolve(content);
  });
  
  return deferred.promise;
};

module.exports.getLanguageExtension = function getLanguageExtension (language) {
  switch(language) {
    case 'javascript':
      return '.js'; 
    case 'ruby':
      return '.rb'; 
    default:
      return '';
  }
};

module.exports.fileExists = function fileExists (path) {
  if (!path) {
    return null;
  }
  
  try {
    fs.readFileSync(path);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    return null;
  }
};

module.exports.directoryExists = function directoryExists (path) {
  if (!path) { return null; }
  try {
    var stat = fs.statSync(path);
    if (stat.isDirectory()) { return true; }
    return null;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    return null;
  }
};