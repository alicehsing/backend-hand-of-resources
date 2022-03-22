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
  })

  // GET /api/v1/movies/:id
  .get('/:id', async(req, res, next) => {
    try {
      const movie = await Movie.getById(req.params.id);
      res.send(movie);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

// PATCH /api/v1/movies/:id
  .patch('/:id', async (req, res) => {
    const movie = await Movie.updateById(req.params.id, req.body);
    res.send(movie);
  });
