const dotenv = require('dotenv');

dotenv.config(); // if port not working use {path:'../.env'}

module.exports = {
    PORT: process.env.PORT,
    SALT_ROUND: process.env.SALT_ROUND
}