const { Router } = require('express');
const Movie = require('../models/Movie');

module.exports = Router ()

// POST /api/v1/movies
  .post('/', async(req, res) => {
    const movie = await Movie.insert(req.body);
    res.send(movie);
  })

  // GET /api/v1/movies
  .get('/', async(req, res) => {
    const movies = await Movie.getAll();
    res.send(movies);
  });
