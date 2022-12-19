const { StatusCodes } = require('http-status-codes');

module.exports = (app, sequelize) => {
  const User = sequelize.models.user;

  app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    const response = await User.create({ username, password });
    res.status(StatusCodes.CREATED).send(response);
  });

  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const response = await User.findOne({ where: { username, password } });
    res.status(StatusCodes.OK).send(response);
  });

  app.get('/api/logout', (req, res) => {
    // req.logout(function (err) {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.redirect('/');
    // });
    res.status(StatusCodes.OK).send('Logged out');
  });
};
