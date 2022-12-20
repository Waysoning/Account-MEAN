const { StatusCodes } = require('http-status-codes');
const passport = require('passport');

module.exports = (app, sequelize) => {
  const User = sequelize.models.user;

  app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
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

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/home');
    }
  );

  app.get('/api/logout', (req, res) => {
    res.status(StatusCodes.OK).send('Logged out');
  });
};
