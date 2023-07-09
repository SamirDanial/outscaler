const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const { getIO } = require('../socket');

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  return res.json(movies);
});

router.get('/:id', async (req, res) => {
  try {
    const params = req.params;
    const movie = await Movie.findOne({ _id: params.id });
    return res.json(movie);
  } catch {
    return res.json({ msg: 'Movie Not Found' });
  }
});

router.post(
  '/create',
  [check('name', 'Name should not be empty').not().isEmpty(), check('director', 'Director should not be empty').not().isEmpty(), check('mainCharecter', 'Main Charecter should not be empty').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, director, mainCharecter } = req.body;
    await Movie.create({ name, director, mainCharecter });

    const io = getIO();
    io.emit('newMovie', { name, director, mainCharecter });

    return res.json({ msg: 'created' });
  }
);

router.delete('/:id', [auth], async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(500).json({ msg: 'Only admins are allowed to delete a video' })
    }
    const params = req.params;
    const movie = await Movie.findOne({ _id: params.id });
    await movie.deleteOne();
    return res.json({ deleted: true });
  } catch {
    return res.json({ msg: 'Movie Not Found' });
  }
});

module.exports = router;
