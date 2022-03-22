const { Router } = require('express');
const Candy = require('../models/Candy');

module.exports = Router ()

// POST /api/v1/candies
.post('/', async(req, res) => {
    const candy = await Candy.insert(req.body);
    res.send(candy);
  });