const Sequelize = require('sequelize');
const Password = require('../services/password');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    googleId: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  User.beforeCreate(async (user, options) => {
    if (user.password) {
      const hashed = await Password.toHash(user.password);
      user.password = hashed;
    }
  });
  User.prototype.comparePassword = async function (candidatePassword) {
    return await Password.compare(this.password, candidatePassword);
  };

  return User;
};
