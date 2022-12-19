const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    googleId: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
  });

  return User;
};
