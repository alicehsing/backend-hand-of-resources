const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router ()

// POST /api/v1/books
  .post('/', async(req, res) => {
    const book = await Book.insert(req.body);
    res.send(book);
  });

// GET /api/v1/books
.get('/', async(req, res) => {
    const books = await Book.getAll();
    res.send(books);
})
