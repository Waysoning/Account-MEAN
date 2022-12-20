const Sequelize = require('sequelize');
const Password = require('../services/password');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    googleId: {
      type: Sequelize.STRING,
      unique: true,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: Sequelize.STRING,
  });
  User.beforeCreate(async (user, options) => {
    const hashed = await Password.toHash(user.password);
    user.password = hashed;
  });
  User.prototype.comparePassword = async function (candidatePassword) {
    return await Password.compare(this.password, candidatePassword);
  };

  return User;
};
