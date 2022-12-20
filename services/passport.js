const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport, sequelize) => {
  const User = sequelize.models.user;

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({
          where: { googleId: profile.id },
        });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await User.create({ googleId: profile.id });
        done(null, user);
      }
    )
  );
};
