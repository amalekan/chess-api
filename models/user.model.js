/*jshint esversion: 6 */
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const signature = process.env.SIGNATURE || require('../secrets').SIGNATURE;

const userSchema = new Schema({
  username: {
    required: true,
    type: String,
    unique: true
  },
  salt: {
    type: String
  },
  hash: {
    type: String
  }
});

userSchema.methods.setPassword = function setPassword(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
                    .toString('hex');
};
userSchema.methods.isValidPassword = function isValidPassword(password){
  const testHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
                          .toString('hex');
  return this.hash === testHash;
};

userSchema.methods.generateJwt = function generateJwt(){
   const expiration = new Date();
   const nextTime = expiration.getDate() + 7;
   expiration.setDate(nextTime);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    expiration: expiration.getTime()
  }, signature);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
