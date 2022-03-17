const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()

// POST /api/va/dogs
.post('/', async (req, res) => {
    const dog = await Dog.insert(req.body);
    res.json(dog);
})