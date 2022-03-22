const { Router } = require('express');
const Candy = require('../models/Candy');

module.exports = Router ()

// POST /api/v1/candies
.post('/', async(req, res) => {
    const candy = await Candy.insert(req.body);
    res.send(candy);
  })

// GET /api/v1/candies
.get('/', async(req, res) => {
    const candies = await Candy.getAll();
    res.send(candies);
  });