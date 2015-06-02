module.exports.CONFIGURATION_FILENAME = '.sun-tzu';
module.exports.SESSION_FILENAME = '.session';
module.exports.supportedLanguages = { 
  "JavaScript": 'javascript',
  "CoffeeScript": 'coffeescript',
  "Ruby": 'ruby'
};

module.exports.supportedLanguagesArray = Object.keys(module.exports.supportedLanguages).map(function (language) {
  return module.exports.supportedLanguages[language];
});