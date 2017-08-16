
/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const passportAuth = require('../middleware/passport.auth');


router.post ('/register', (req, res, next) => {
  if(!req.body.password || !req.body.username){
    return res.status(400).json({
      msg:'Missing username and/or password'
    });
  }

  const {username, password} = req.body;

  const newUser = new User({username});
  newUser.setPassword(password);
  newUser.save(function (err, user) {
    if(err) return next(err);
    return res.status(201).json({
      msg: 'User successfully created'
    });
  });
});

router.post('/login', passportAuth);

module.exports = router;
