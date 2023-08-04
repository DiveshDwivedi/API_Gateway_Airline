const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const { SuccessResponse, ErroResponse } = require("../utils/common");

/**
 *
 * @param {*} req
 * @param {*} response
 * @returns
 *
 * @POST : /signup
 */
async function signup(req, response) {
    try {
  
        const user = await UserService.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        SuccessResponse.data = user;
        return response.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErroResponse.error = error;
        return response.status(error.StatusCode).json(ErroResponse);
    }
}

/**
 *
 * @param {*} req
 * @param {*} response
 * @returns
 *
 * @POST : /signin
 */
async function signin(req, response) {
    try {
  
        const user = await UserService.signin({
            email: req.body.email,
            password: req.body.password,
        });
        SuccessResponse.data = user;
        return response.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErroResponse.error = error;
        return response.status(error.StatusCode).json(ErroResponse);
    }
}

module.exports = {
    signup,
    signin
}