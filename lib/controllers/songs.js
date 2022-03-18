const { Router } = require('express');
const Song = require('../models/Song');

module.exports = Router ()

// POST /api/v1/song
  .post('/', async(req, res) => {
    // insert a song object as body
    const song = await Song.insert(req.body);
    res.json(song);
  })

// GET /api/v1/song
  .get('/', async(req, res) => {
    const songs = await Song.getAll();
    res.json(songs);
  });
