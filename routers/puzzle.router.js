/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const Puzzle = require('../models/puzzle.model');

router.get('/puzzles', (req, res) => {
  Puzzle.find({}, function (err, puzzles) {
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
  const puzzle = new Puzzle(req.body);
  puzzle.save(function (err, puzzle) {
    if(err) return res.status(500).json({err: err});
    return res.status(201).json({
      msg: 'Successfully created a new puzzle!'
    });
  });
});

router.delete('/puzzles/:puzzleId', (req, res) => {
  Puzzle.findOneAndRemove({_id: req.params.puzzleId}, function (err) {
    if (err) return res.status(500).json({err: err});
    return res.status(200).json({
      msg: 'Successfully deleted the puzzle!'
    });
  });
});

module.exports = router;
