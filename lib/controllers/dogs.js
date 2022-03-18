const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()

// POST /api/v1/dogs (Create an entry)
  .post('/', async (req, res) => {
    // insert a dog object as body
    const dog = await Dog.insert(req.body);
    res.json(dog);
  })

// GET /api/v1/dogs (GET All entries)
  .get('/', async (req, res) => {
    const dogs = await Dog.getAll();
    res.json(dogs);
  })

// GET /api/v1/dogs/:id (GET entry by Id)
  .get('/:id', async (req, res, next) => {
    try {
      const dog = await Dog.getById(req.params.id);
      // return the dog if found
      res.json(dog);
    } catch (error) {
      // return a 404 if no dog is found
      error.status = 404;
      next(error);
    }
  })

// DELETE /api/v1/dogs/:id (DELETE entry by Id)
  .delete('/:id', async (req, res) => {
    const dog = await Dog.deleteById(req.params.id);
    res.json(dog);
  })

// PATCH /api/v1/dogs/:id (UPDATE entry by Id)
  .patch('/:id', async (req, res) => {
    const dog = await Dog.updateById(req.params.id, req.body);
    res.json(dog);
  });
