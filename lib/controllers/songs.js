const { Router } = require('express');
const Song = require('../models/Song');

module.exports = Router ()

// POST /api/v1/song
  .post('/', async(req, res) => {
    // insert a song object as body
    const song = await Song.insert(req.body);
    res.json(song);
  });
