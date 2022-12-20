const { StatusCodes } = require('http-status-codes');

module.exports = (app, sequelize) => {
  const User = sequelize.models.user;

  app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    // cannot create user if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).send('Username in use');
    }
    const user = await User.create({ username, password });
    res.status(StatusCodes.CREATED).send(user);
  });

  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send('Invalid username');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).send('Invalid password');
    }
    res.status(StatusCodes.OK).send(user);
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
