var Joi = require('joi');

var SolutionAttemptSchema = Joi.object().keys({
	projectId: Joi.string().alphanum().required(),
	solutionId: Joi.string().alphanum().required(),
	code: Joi.string()
}).required();

module.exports.validateAttempt = function (attempt) {
  return SolutionAttemptSchema.validate(attempt);	
};