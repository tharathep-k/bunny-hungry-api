const {
  validateRegister,
  validateLogin,
} = require("../validator/auth-validator");
const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");
const { user, staff } = require("../models");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    value.password = await bcryptService.hash(value.password);

    const User = await user.create(value);
    // const User = await staff.create(value);

    const accessToken = tokenService.sign({ id: User.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { mobile, password } = validateLogin(req.body);
    // console.log(req.body);

    const Staff = await staff.findOne({ where: { mobile } });
    console.log(Staff);
    const User = await user.findOne({ where: { mobile } });
    if (!User && !Staff) {
      createError("invalid credential1", 400);
    }

    if (User) {
      const isCorrect = await bcryptService.compare(password, User.password);
      if (!isCorrect) {
        createError("invalid credential2", 400);
      }
      const accessToken = tokenService.sign({ id: User.id });
      res.status(200).json({ accessToken });
    }

    if (Staff) {
      const isCorrect = await bcryptService.compare(password, Staff.password);
      if (!isCorrect) {
        createError("invalid credential2", 400);
      }
      const accessToken = tokenService.sign({ id: Staff.id });
      res.status(200).json({ accessToken });
    }

    // const isCorrectStaff = await bcryptService.compare(
    //   password,
    //   Staff.password
    // );
    // if (!isCorrect) {
    //   createError("invalid credential2", 400);
    // }

    // const accessToken = tokenService.sign({ id: User.id });
    // res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.User });
};
