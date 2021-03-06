const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');
// const { getAll } = require('../lib/models/Dog');
const Song = require('../lib/models/Song');
const Book = require('../lib/models/Book');
const Movie = require('../lib/models/Movie');
const Candy = require('../lib/models/Candy');
// const { getById } = require('../lib/models/Dog');
// const res = require('express/lib/response');

describe('backend-hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  // Tests for /api/v1/dogs

  it('creates an instance of Dog to dogs table', async() => {
    const expected = {
      name: 'Momo',
      age: 1,
      favoriteTreat: 'Beef Jerky'
    };

    const res = await request(app)
      .post('/api/v1/dogs')
      .send(expected);

    expect(res.body).toEqual({ 
      id: expect.any(String),
      ...expected 
    });
  });

  it('returns an array of dogs', async() => {
    const expected = await Dog.getAll();
    const res = await request(app)
      .get('/api/v1/dogs');

    expect(res.body).toEqual(expected);
  });

  it('returns a single dog by Id', async() => {
    const expected = await Dog.getById(1);
    const res = await request(app)
      .get(`/api/v1/dogs/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('deletes a dog by Id', async() => {
    // Creates a new dog in DB
    const newDog = await Dog.insert({ 
      name: 'Chomp',
      age: 5,
      favoriteTreat: 'Rawhide'
    });
      // Get the new dog as the expected
    const expected = await Dog.getById(newDog.id);
    // Delete the dog that was just inserted
    const res = await request(app)
      .delete(`/api/v1/dogs/${expected.id}`);
  
    expect(res.body).toEqual(expected);
  });

  it('updates a dog by id', async() => {
    const expected = {
      id: expect.any(String),
      name: 'Gus',
      age: 4,
      favoriteTreat: 'Chicken Strips'
    };

    const res = await request(app)
      .patch('/api/v1/dogs/1')
      .send({ age: 4 });

    expect(res.body).toEqual(expected);


    // Alternative syntax when there isn't hardcoded values in SQL.
    // Insert a new instance first in order to make changes.

    // const dog = await Dog.insert({
    //   name: 'Momo',
    //   age: 6,
    //   favoriteTreat: 'Beef Jerky'
    // });

    // const res = await request(app)
    // .patch(`/api/v1/dogs/${dog.id}`)
    // .send({ age: 7 });

    // const expected = { 
    //   id: expect.any(String),
    //   ...dog,
    //   age: 7
    // };

    // expect(res.body).toEqual(expected);
  });


  // Tests for /api/v1/songs
  it('creates an instance of song to songs table', async() => {
    const expected = {
      title: 'In My Blood',
      artist: 'Shawn Mendes',
      album: 'Shawn Mendes'
    };

    const response = await request(app)
      .post('/api/v1/songs')
      .send(expected);
    
    expect(response.body).toEqual({
      id: expect.any(String),
      ...expected
    });
  });

  it('returns an array of songs', async() => {
    const expected = await Song.getAll();
    const response = await request(app)
      .get('/api/v1/songs');

    expect(response.body).toEqual(expected);
  });

  it('returns a single song by Id', async() => {
    const expected = await Song.getById(1);
    const response = await request(app)
      .get(`/api/v1/songs/${expected.id}`);

    expect(response.body).toEqual(expected);
  });

  it('updates a song by id', async() => {
    const expected = {
      id: expect.any(String),
      title: 'At the Beginning',
      artist: 'Richard Marx and Donna Lewis',
      album: 'Anastasia'
    };
    
    const response = await request(app)
      .patch('/api/v1/songs/1')
      .send({ 
        artist: 'Richard Marx and Donna Lewis',
        album: 'Anastasia'
      });

    expect(response.body).toEqual(expected);
  });

  it('deletes a song by id', async() => {
    const newSong = await Song.insert({ 
      title: 'Hot Tears',
      artist: 'Leif Vollebekk',
      album: 'New Ways'
    });
    const expected = await Song.getById(newSong.id);
    const response = await request(app)
      .delete(`/api/v1/songs/${expected.id}`);

    expect(response.body).toEqual(expected);
  });

  // Tests for /api/v1/books
  
  it('creates an instance of book to books table', async() => {
    const expected = {
      title: 'Give unto Others',
      author: 'Donna Leon',
      publisher: 'Atlantic Monthly Press'
    };
  
    const response = await request(app)
      .post('/api/v1/books')
      .send(expected);
    
    expect(response.body).toEqual({
      id: expect.any(String),
      ...expected
    });
  });
  
  it('returns an array of books', async() => {
    const expected = await Book.getAll();
    const response = await request(app)
      .get('/api/v1/books');
  
    expect(response.body).toEqual(expected);
  });

  it('returns a single book by Id', async() => {
    const expected = await Book.getById(1);
    const response = await request(app)
      .get(`/api/v1/books/${expected.id}`);

    expect(response.body).toEqual(expected);
  });

  it('updates a book by id', async() => {
    const expected = {
      id: expect.any(String),
      title: 'Full',
      author: 'Julia STYRO',
      publisher: 'Lake Union Publishing'
    };

    const response = await request(app)
      .patch('/api/v1/books/1')
      .send({ author: 'Julia STYRO' });

    expect(response.body).toEqual(expected);
  });

  it('deletes a book by id', async() => {
    const newBook = await Book.insert({
      title: 'Eat, Pray, Love',
      author: 'Elizabeth Gilbert',
      publisher: 'Riverhead Books'
    });

    const expected = await Book.getById(newBook.id);
    const response = await request(app)
      .delete(`/api/v1/books/${expected.id}`);
    
    expect(response.body).toEqual(expected);
  });

  // Tests for /api/v1/movies
  it('creates an instance of movie to movies table', async() => {
    const expected = {
      title: 'The Longest Yard',
      director: 'Peter Segal',
      yearReleased: 2005
    };
  
    const response = await request(app)
      .post('/api/v1/movies')
      .send(expected);
    
    expect(response.body).toEqual({
      id: expect.any(String),
      ...expected
    });
  });

  it('returns an array of movies', async() => {
    const expected = await Movie.getAll();
    const response = await request(app)
      .get('/api/v1/movies');

    expect(response.body).toEqual(expected);
  });

  it('returns a single movie by Id', async() => {
    const expected = await Movie.getById(1);
    const response = await request(app)
      .get(`/api/v1/movies/${expected.id}`);

    expect(response.body).toEqual(expected);
  });

  it('updates a movie by id', async() => {
    const expected = {
      id: expect.any(String),
      title: 'The Godfather: Part II',
      director: 'Francis Ford Coppola',
      yearReleased: 1974
    };

    const response = await request(app)
      .patch('/api/v1/movies/1')
      .send({ 
        title: 'The Godfather: Part II', 
        yearReleased: 1974 
      });

    expect(response.body).toEqual(expected);
  });

  it('deletes a movie by id', async() => {
    const newMovie = await Movie.insert({
      title: 'Ip Man',
      director: 'Wilson Yip',
      yearReleased: 2008
    });

    const expected = await Movie.getById(newMovie.id);
    const response = await request(app)
      .delete(`/api/v1/movies/${expected.id}`);
    
    expect(response.body).toEqual(expected);
  });

  // Tests for /api/v1/candies
  it('creates an instance of candy to candies table', async() => {
    const expected = {
      name: 'Skittles',
      type: 'hard sugar shells',
      texture: 'hard and chewy',
      sugarLevel: 3
    };

    const response = await request(app)
      .post('/api/v1/candies')
      .send(expected);
  
    expect(response.body).toEqual({
      id: expect.any(String),
      ...expected
    });
  });

  it('returns an array of candies', async() => {
    const expected = await Candy.getAll();
    const response = await request(app)
      .get('/api/v1/candies');

    expect(response.body).toEqual(expected);
  });

  it('returns a single candy by Id', async() => {
    const expected = await Candy.getById(1);
    const response = await request(app)
      .get(`/api/v1/candies/${expected.id}`);

    expect(response.body).toEqual(expected);
  });

  it('updates a candy by id', async() => {
    const expected = {
      id: expect.any(String),
      name: 'Gummy Bears',
      type: 'gummies',
      texture: 'chewy',
      sugarLevel: 2
    };

    const response = await request(app)
      .patch('/api/v1/candies/1')
      .send({ sugarLevel: 2 });

    expect(response.body).toEqual(expected);
  });


  it('deletes a candy by id', async() => {
    const newCandy = await Candy.insert({
      name: 'Skittles',
      type: 'hard sugar shells',
      texture: 'hard and chewy',
      sugarLevel: 3
    });

    const expected = await Candy.getById(newCandy.id);
    const response = await request(app)
      .delete(`/api/v1/candies/${expected.id}`);
    
    expect(response.body).toEqual(expected);
  });
});




