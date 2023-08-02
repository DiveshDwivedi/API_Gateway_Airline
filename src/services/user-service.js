const { UserRepository } = require('../repositories');
const StatusCodes = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const userRepo = new UserRepository();

async function create(data) {
    try {
        const user = await userRepo.create(data);
        return user;   
    } catch (error) {
      if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
        let explaination = [];
        error.errors.forEach((err) => {
            explaination.push(err.message);
        });
        throw new AppError(explaination, StatusCodes.BAD_REQUEST);
      } 
      throw new AppError('Cannot create new User', StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

module.exports = {
    create
}