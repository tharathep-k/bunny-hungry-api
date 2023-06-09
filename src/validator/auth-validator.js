const Joi = require("joi");

const validate = require("./validate");

const registerSchema = Joi.object({
  firstname: Joi.string().trim().required(),
  lastname: Joi.string().trim().required(),
  mobile: Joi.string().pattern(/^[0-9]{10}$/),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .trim()
    .required(),
  confirmpassword: Joi.string().valid(Joi.ref("password")).strip(),
});

exports.validateRegister = validate(registerSchema);
