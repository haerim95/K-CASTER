const passport = require('passport');
const local = require('./local');

module.export = () => {
  passport.serializeUser(() => {});

  passport.deserializeUser(() => {});

  local();
};
