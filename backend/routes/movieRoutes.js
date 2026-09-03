const express = require('express');
const Movie = require('../models/Movie');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.findAll();
  res.json(movies);
});

router.post('/', verifyAdmin, async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', verifyAdmin, async (req, res) => {
  await Movie.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Movie updated' });
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  await Movie.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Movie deleted' });
});

module.exports = router;
