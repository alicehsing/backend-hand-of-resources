const { Router } = require('express');
const Movie = require('../models/Movie');

module.exports = Router ()

// POST /api/v1/movies
  .post('/', async(req, res) => {
    const movie = await Movie.insert(req.body);
    res.send(movie);
  });
