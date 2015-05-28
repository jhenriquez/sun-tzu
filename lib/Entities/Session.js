function Session () {
  this.project = '';
  this.solution = '';
}

Session.prototype.hasValidData = function hasValidData () {
  return this.project && this.solution;
};

module.exports = Session;