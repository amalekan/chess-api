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

//router imports
const puzzleRouter = require('./routers/puzzle.router');
//use middleware
server.use(cors());
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

//use routers
server.use(puzzleRouter);

server.get('/', (req, res) => {
  res.send('it works');
});

server.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
