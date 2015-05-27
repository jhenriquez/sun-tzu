var fs = require('fs');
var Q  = require('q');

module.exports.readGlobalSettings = function readGlobalSettings (settingsFilePath) {
  try {
    var settings_content = fs.readFileSync(settingsFilePath);
    return JSON.parse(settings_content);
  } catch (err) {
    console.log(err);
  }
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