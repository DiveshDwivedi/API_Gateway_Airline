const dotenv = require('dotenv');

dotenv.config(); // if port not working use {path:'../.env'}

module.exports = {
    PORT: process.env.PORT
}