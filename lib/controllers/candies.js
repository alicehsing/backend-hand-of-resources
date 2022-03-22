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
  })

  // GET /api/v1/candies/:id
  .get('/:id', async(req, res, next) => {
    try {
      const candy = await Candy.getById(req.params.id);
      res.send(candy);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

// PATCH /api/v1/candies/:id
  .patch('/:id', async (req, res) => {
    const candy = await Candy.updateById(req.params.id, req.body);
    res.send(candy);
  });
