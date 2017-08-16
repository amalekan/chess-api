/*jshint esversion: 6*/
const passport = require('passport');
const usernameOrPasswordMessage = {
  msg: 'The username and/or password you provided is incorrect'
};
const passportAuth = (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if(err) return next(err);

    if(!user) {
      return res.status(401).json(usernameOrPasswordMessage);
    }

    const token = user.generateJwt();
    return res.status(200).json({
      token
    });

  })(req, res, next);
};

module.exports = passportAuth;
