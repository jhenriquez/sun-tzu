var Q         = require('q');
var agent     = require('superagent');
var validator = require('./validations');


function SunTzu(options) {
  this.key         = options && options.access_key || process.env.CW_ACCESS_KEY;
  this.currentUser = options && options.username   || process.env.CW_USERNAME;
}

SunTzu.prototype.getCurrentUser = function () {
  return this.getUser(this.currentUser);
};

SunTzu.prototype.getUser = function (username) {
  var deferred = Q.defer();
  
  agent
    .get('https://www.codewars.com/api/v1/users/' + username)
    .set('Authorization', this.key)
    .end(function (err, rs) {
      if (err) {  return deferred.reject(err); }
      deferred.resolve(rs.body);
    });
  
  return deferred.promise;
};

SunTzu.prototype.getChallenge = function (slug) {
  var deferred = Q.defer();
  
  agent
    .get('https://www.codewars.com/api/v1/code-challenges/' + slug)
    .set('Authorization', this.key)
    .end(function (err, rs) {
      if (err) {  return deferred.reject(err); }
      deferred.resolve(rs.body);
    });
  
  return deferred.promise;
};

SunTzu.prototype.train = function (language, strategy, peek) {
  var deferred = Q.defer();
  
  var url = 'https://www.codewars.com/api/v1/code-challenges/:language/train'.replace(':language', language);
  
  agent
    .post(url)
    .type('form')
    .send({ strategy: strategy, peek: !!peek })
    .set('Authorization', this.key)
    .end(function (err, rs) {
      if (err) {  return deferred.reject(err); }
      deferred.resolve(rs.body);
    });
  
  return deferred.promise;
};

SunTzu.prototype.trainChallenge = function (slug, language) {
  var deferred = Q.defer();
  
  var url = 'https://www.codewars.com/api/v1/code-challenges/:slug/:language/train'.replace(':language', language).replace(':slug',slug);
  
  agent
    .post(url)
    .type('form')
    .set('Authorization', this.key)
    .end(function (err, rs) {
      if (err) {  return deferred.reject(err); }
      deferred.resolve(rs.body);
    });
  
  return deferred.promise;
};

SunTzu.prototype.attemptSolution = function (solution) {
  var valid = validator.validateAttempt(solution);
  if (valid.error) {
    throw new Error('Invalid Arguments');
  }
};

SunTzu.prototype.finializeSolution = function (slug) {
  
};

SunTzu.prototype.getDeferred = function (dmid) {
  
};

SunTzu.languages = { 
  "JavaScript": 'javascript',
  "CoffeeScript": 'coffeescript',
  "Ruby": 'ruby'
};

SunTzu.trainStrategies = {
  "random": 'random',
  "reference": 'reference_workout',
  "beta": 'beta_workout',
  "retrain": 'retrain_workout',
  "algorithm": 'algorithm_retest',
  "kyu8": 'kyu_8_workout',
  "kyu7": 'kyu_7_workout',
  "kyu6": 'kyu_6_workout',
  "kyu5": 'kyu_5_workout',
  "kyu4": 'kyu_4_workout',
  "kyu3": 'kyu_3_workout',
  "kyu2": 'kyu_2_workout',
  "kyu1": 'kyu_1_workout'
};

module.exports = SunTzu;