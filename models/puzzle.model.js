/* jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const puzzleSchema = Schema({
  fen: {
    required: true,
    type: String
  },

  solution: {
    required: true,
    type: String
  },
  
  created: {
    type: Date,
    default: Date.now
  }
});

const Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = Puzzle;
