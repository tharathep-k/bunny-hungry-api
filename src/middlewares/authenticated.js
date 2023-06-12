const createError = require("../utils/create-error");
const tokenService = require("../services/token-service");
const { user } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("Unauthorized", 401);
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      createError("Unauthorized", 401);
    }

    const payload = tokenService.verify(token);
    const User = await user.findByPk(payload.id);
    if (!User) {
      createError("Unauthorized", 401);
    }

    req.User = User;
    next();
  } catch (err) {
    next(err);
  }
};
