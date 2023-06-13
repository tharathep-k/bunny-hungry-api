const createError = require("../utils/create-error");
const tokenService = require("../services/token-service");
const { staff } = require("../models");

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
    // console.log(payload)

    const Staff = await staff.findByPk(payload.id);
    
    if (!Staff) {
      createError("Unauthorized3", 401);
    }

    req.Staff = Staff;
    next();
  } catch (err) {
    next(err);
  }
};
