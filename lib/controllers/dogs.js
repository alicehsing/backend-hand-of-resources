const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()

// POST /api/v1/dogs (Create an entry)
.post('/', async (req, res) => {
    const dog = await Dog.insert(req.body);
    res.json(dog);
})

// GET api/v1/dogs (GET All entries)
.get('/', async (req, res) => {
    const dogs = await Dog.getAll();
    res.json(dogs);
})