var Q     = require('q');
var agent = require('superagent');

function SunTzu(options) {
  this.key         = options && options.access_key || process.env.CW_ACCESS_KEY;
  this.currentUser = options && options.username   || process.env.CW_USERNAME;
  
  this.getCurrentUser = function () {
    return this.getUser(this.currentUser);
  };
  
  this.getUser = function (username) {
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
  
  this.getChallenge = function (slug) {
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
  
  this.train = function (language, strategy, peek) {
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
  
  this.trainChallenge = function (slug) {
	  
  };
  
  this.attemptSolution = function (slug) {
	  
  };
  
  this.finializeSolution = function (slug) {
	  
  };
  
  this.getDeferred = function (dmid) {
	  
  };
}

SunTzu.languages = { 
  "JavaScript": 'javascript',
  "CoffeeScript": 'coffeescript',
  "Ruby": 'ruby'
};

SunTzu.trainStrategies = {
  "random": 'random'
};

module.exports = SunTzu;