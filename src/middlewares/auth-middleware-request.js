const { StatusCodes } = require("http-status-codes");
const { ErroResponse } = require("../utils/common");
const AppError  = require('../utils/errors/app-error');

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErroResponse.message = "Something went wrong while authenticating user";
    ErroResponse.error = new AppError(["Email not found in the incoming request"], StatusCodes.BAD_REQUEST);
    return res.json(ErroResponse);
  }
  if (!req.body.password) {
    ErroResponse.message = "Something went wrong while authenticating user";
    ErroResponse.error = new AppError(["Password not found in the incoming request"], StatusCodes.BAD_REQUEST);
    return res.json(ErroResponse);
  }
  next();
}

module.exports = {
  validateAuthRequest,
};
