const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/dogs', require('./controllers/dogs'));
app.use('/api/v1/songs', require('./controllers/songs'));
app.use('/api/v1/books', require('./controllers/books'));
app.use('/api/v1/movies', require('./controllers/movies'));
app.use('/api/v1/candies', require('./controllers/candies'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
