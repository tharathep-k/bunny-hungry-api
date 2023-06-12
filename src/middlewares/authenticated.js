const createError = require("../utils/create-error");
const tokenService = require("../services/token-service");
const { user, staff } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("Unauthorized1", 401);
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      createError("Unauthorized2", 401);
    }

    const payload = tokenService.verify(token);
    const Staff = await staff.findByPk(payload.id);
    const User = await user.findByPk(payload.id);
    if (!User && !Staff) {
      createError("Unauthorized3", 401);
    }

    req.User = User;
    req.Staff = Staff;
    next();
  } catch (err) {
    next(err);
  }
};
