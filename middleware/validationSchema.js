const Joi = require("joi");

exports.getImageSchema = Joi.object({
  name: Joi.alternatives().try(
    Joi.string().trim().email(), // Check if it's an email
    Joi.string()
      .trim()
      .uri({ scheme: ["http", "https"] }) // Check if it's a website URL
  ),
});

exports.getTextSchema = Joi.object({
  sentence: Joi.string().trim().required(),
});
