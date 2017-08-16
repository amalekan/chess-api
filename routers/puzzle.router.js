/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const Puzzle = require('../models/puzzle.model');
const auth = require('../middleware/auth');

router.get('/puzzles', (req, res) => {
  Puzzle.findOneRandom({}, function (err, puzzles) {
    if(err) return res.status(500).json({err: err});
    return res.status(200).json({
      puzzles: puzzles
    });
  });
});

router.get('/puzzles/:puzzleId', (req, res) => {
  Puzzle.find({_id: req.params.puzzleId}, function (err, puzzles) {
      if(err) return res.status(500).json({err: err});
      return res.status(200).json({
        puzzles: puzzles
      });
  });
});

router.post('/puzzles', (req, res) => {
  if(!req.payload){
    return res.status(403)
              .json({
      msg: 'Must be logged in.'
    });
  }
  const {fen, solution} = req.body;
  const{_id} = req.payload;
  const data = {
    fen,
    solution,
    user: _id
  };
  const puzzle = new Puzzle(data);
  puzzle.save(function (err, puzzle) {
    if(err) return res.status(500).json({err: err});
    return res.status(201).json({
      msg: 'Successfully created a new puzzle!'
    });
  });
});

router.delete('/puzzles/:puzzleId', (req, res) => {
  if(!req.payload){
    return res.status(403).json({
      msg: 'Must be logged in.'
    });
  }
  Puzzle.findOneAndRemove({_id: req.params.puzzleId}, function (err) {
    if (err) return res.status(500).json({err: err});
    return res.status(200).json({
      msg: 'Successfully deleted the puzzle!'
    });
  });
});

module.exports = router;
