/*jshint esversion: 6 */
const express = require('express');
const mongoose = require('mongoose');
const server = express();
const mongoURI = process.env.MONGOURI || require('./credentials').mongoURI;
const port = process.env.PORT || 8080;

mongoose.connect(mongoURI, {
  useMongoClient: true
});

//middleware imports
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');
//router imports
const userRouter = require('./routers/user.router');
const puzzleRouter = require('./routers/puzzle.router');
//use middleware
server.use(cors());
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
// passport import and configurations

const passport = require('passport');
const localStrategyConfig = require('./config/password');
passport.use(localStrategyConfig);
server.use(passport.initialize());
// routers
server.use(userRouter);
server.use(puzzleRouter);

server.use(notFound);
server.use(errorHandler);

server.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
