var defaults = require('../defaults');

function ChallengeListing() { }

ChallengeListing.prototype.count = function () {  
  var self = this;
  return defaults.supportedLanguagesArray.reduce(function (total, language) {
    total += self[language] && self[language].length || 0;
    return total; 
  }, 0);
};

ChallengeListing.prototype.addChallenge = function addChallenge (challenge) {
  this[challenge.language] = this[challenge.language] || [];
  this[challenge.language].push(challenge); 	
};

ChallengeListing.prototype.addChallenges = function addChallenges (challenges) {
  challenges.forEach(ChallengeListing.prototype.addChallenge);
};

module.exports = ChallengeListing;