var Session = require('./Session');

function Challenge (name, language) {
  "use strict";
  this.name = name;
  this.language = language;
  this.code = '';
  this.session = new Session();
}

module.exports = Challenge;