const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const Sequelize = require('sequelize');
// TODO: add passport config

const sequelize = new Sequelize({
  database: process.env.database,
  username: process.env.username,
  password: process.env.password,
  host: process.env.host,
  dialect: 'mysql',
  logging: false,
});
require('./models/User')(sequelize);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// TODO: Add routes
require('./routes/authRoutes')(app, sequelize);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  sequelize
    .sync()
    .then(() => console.log('Models synced with database'))
    .catch((err) => console.error(err));
  console.log(`Example app listening on port ${PORT}!`);
});
