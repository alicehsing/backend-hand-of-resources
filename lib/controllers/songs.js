const { Router } = require('express');
const Song = require('../models/Song');

module.exports = Router ()

// POST /api/v1/songs
  .post('/', async(req, res) => {
    // insert a song object as body
    const song = await Song.insert(req.body);
    res.json(song);
  })

// GET /api/v1/songs
  .get('/', async(req, res) => {
    const songs = await Song.getAll();
    res.json(songs);
  })

// GET /api/v1/songs/:id
  .get('/:id', async(req, res, next) => {
    try {
      const song = await Song.getById(req.params.id);
      res.json(song);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  // PATCH /api/v1/songs/:id (Update entry by Id)
  .patch('/:id', async (req, res) => {
    const song = await Song.updateById(req.params.id, req.body);
    res.json(song);
  })


