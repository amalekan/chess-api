/*jshint esversion: 6 */
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

const UserAuthHandler = (username, password, done) => {

  User.findOne({username: username}, function (err, user) {
    if(err) return done(err);

    if(!user) {
      const notFoundUserMessage = { msg: 'Invalid user.'};
      return done(null, null, notFoundUserMessage);
    }

    if(!user.isValidPassword(password)){
      const invalidPasswordMessage = {msg: 'Incorrect password'};
        return done(null, null, invalidPasswordMessage);
    }

    return done(null, user);
  });
};

const UserAuthConfig = {usernameField: 'username'};

const strategy = new LocalStrategy(UserAuthConfig, UserAuthHandler);

module.exports = strategy;
