var Q     = require('q');
var agent = require('superagent');

function SunTzu(options) {
  var access_key  = options && options.access_key || process.env.CW_ACCESS_KEY;
  var currentUser = options && options.username   || process.env.CW_USERNAME;
  
  this.getCurrentUser = function () {
    return this.getUser(currentUser);
  };
  
  this.getUser = function (username) {
    var deferred = Q.defer();
    
    agent
      .get('https://www.codewars.com/api/v1/users/' + username)
      .set('Authorization', access_key)
      .end(function (err, rs) {
        if (err) {  return deferred.reject(err); }
        deferred.resolve(rs.body);
      });
    
    return deferred.promise;
  };
  
  this.getChallenge = function (slug) {
  };
  
  this.train = function () {
	  
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

module.exports = SunTzu;