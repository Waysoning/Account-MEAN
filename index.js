const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();

// TODO connect to MySQL
// TODO: Add routes

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: 123,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Example app listening on port 4000!');
});
