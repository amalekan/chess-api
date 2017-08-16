/*jshint esversion: 6 */
const jwt = require('express-jwt');
const signature = process.env.SIGNATURE || require ('../secrets').SIGNATURE;
const auth = jwt ({
  secret: signature,
  userProperty: 'payload'
});

module.exports = auth;
