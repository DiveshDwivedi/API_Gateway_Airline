'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const { SALT_ROUND } = require('../config/server-config')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role, {through: 'User_Roles', as: 'role'});
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,     
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8,20],     
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });

User.beforeCreate(function encrypt(user) {
  const encryptedPassword = bcrypt.hashSync(user.password, +SALT_ROUND);
  user.password = encryptedPassword;
})
  return User;
};