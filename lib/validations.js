var Joi = require('joi');

var SolutionAttemptSchema = Joi.object().keys({
	project: Joi.string().alphanum().required(),
	solution: Joi.string().alphanum().required(),
	code: Joi.string()
}).required();

module.exports.validateAttempt = function (attempt) {
  return SolutionAttemptSchema.validate(attempt);	
};