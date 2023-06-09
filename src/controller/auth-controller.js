const { validateRegister } = require("../validator/auth-validator");
const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");
const { user } = require("../models");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    value.password = await bcryptService.hash(value.password);

console.log(value)

    const User = await user.create(value);

    console.log(User)

    const accessToken = tokenService.sign({id: User.id})
    res.status(200).json(({accessToken}))
  } catch (err) {
    next(err);
  }
};
