const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router ()

// POST /api/v1/books
  .post('/', async(req, res) => {
    const book = await Book.insert(req.body);
    res.send(book);
  })

// GET /api/v1/books
  .get('/', async(req, res) => {
    const books = await Book.getAll();
    res.send(books);
  })

// GET /api/v1/books/:id
  .get('/:id', async(req, res, next) => {
    try {
      const book = await Book.getById(req.params.id);
      res.send(book);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  // PATCH /api/v1/books/:id
  .patch('/:id', async (req, res) => {
    const book = await Book.updateById(req.params.id, req.body);
    res.send(book);
  })

  // DELETE /api/v1/books/:id
  .delete('/:id', async (req, res) => {
    const book = await Book.deleteById(req.params.id);
    res.send(book);
  });
