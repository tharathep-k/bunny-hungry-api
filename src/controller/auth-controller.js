const {
  validateRegister,
  validateLogin,
} = require("../validator/auth-validator");
const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");
const { user } = require("../models");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    value.password = await bcryptService.hash(value.password);

    const User = await user.create(value);

    const accessToken = tokenService.sign({ id: User.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const {mobile, password} =  validateLogin(req.body)
    console.log(mobile,password)

    
    const User = await user.findOne({where: {mobile}});
    if (!User) {
      createError("invalid credential", 400);
    }

    const isCorrect = await bcryptService.compare(
      password,
      User.password,
    );
    if (!isCorrect) {
      createError("invalid credential", 400);
    }

    const accessToken = tokenService.sign({ id: User.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
