const { StatusCodes } = require("http-status-codes");
const { ErroResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { UserService } = require("../services");

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErroResponse.message = "Something went wrong while authenticating user";
    ErroResponse.error = new AppError(
      ["Email not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErroResponse);
  }
  if (!req.body.password) {
    ErroResponse.message = "Something went wrong while authenticating user";
    ErroResponse.error = new AppError(
      ["Password not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErroResponse);
  }
  next();
}

async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );
    if (response) {
      req.user = response; // setting the user id in the req object
      next();
    }
  } catch (error) {
    return res.status(error.StatusCode).json(error);
  }
}

async function isAdmin(req, res, next) {
  const response = await UserService.isAdmin(req.user);
  if (!response) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json("User not authorized for this action");
  }
  next();
}
module.exports = {
  validateAuthRequest,
  checkAuth,
  isAdmin,
};
