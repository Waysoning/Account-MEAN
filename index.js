const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
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
require('./services/passport')(passport, sequelize);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app, sequelize);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  sequelize
    .sync()
    .then(() => console.log('Models synced with database'))
    .catch((err) => console.error(err));
  console.log(`Example app listening on port ${PORT}!`);
});
