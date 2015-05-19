var fs   = require('fs');
var path = require('path');
var Q    = require('q');

var CONFIGURATION_FILENAME = '.sun-tzu';

function writeContent(contentPath, content, deferred) {
  fs.writeFile(contentPath, content, function (err) {
	  if (err) { return deferred.reject(err); }
	  deferred.resolve(content);
  });
}

module.exports.init = function init (cfg, options) {
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
  
  writeContent(configFilePath, content, deferred);
  
  return deferred.promise;
};

module.exports.CONFIGURATION_FILENAME = CONFIGURATION_FILENAME;