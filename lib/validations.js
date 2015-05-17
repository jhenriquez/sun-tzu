var Joi = require('joi');

var SolutionAttemptSchema = Joi.object().keys({
	project: Joi.string().alphanum().required(),
	solution: Joi.string().alphanum().required(),
	code: Joi.string().required()
}).required();

var FinalizeAttemptSchema = Joi.object().keys({
	project: Joi.string().alphanum().required(),
	solution: Joi.string().alphanum().required()
}).required();

module.exports.validateAttempt = function (attempt) {
  return SolutionAttemptSchema.validate(attempt);	
};

module.exports.validateFinalize = function (attempt) {
  return FinalizeAttemptSchema.validate(attempt);	
};