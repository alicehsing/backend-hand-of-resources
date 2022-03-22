const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');
const { getAll } = require('../lib/models/Dog');
const Song = require('../lib/models/Song');
const Book = require('../lib/models/Book');
const res = require('express/lib/response');

describe('backend-hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it.skip('creates an instance of Dog to dogs table', async() => {
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

  it.skip('returns an array of dogs', async() => {
    const expected = await Dog.getAll();
    const res = await request(app)
      .get('/api/v1/dogs');

    expect(res.body).toEqual(expected);
  });

  it.skip('returns a single dog by Id', async() => {
    const expected = await Dog.getById(1);
    const res = await request(app)
      .get(`/api/v1/dogs/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it.skip('deletes a dog by Id', async() => {
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

  it.skip('updates a dog by id', async() => {
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

  it.skip('creates an instance of song to songs table', async() => {
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

  it.skip('returns an array of songs', async() => {
    const expected = await Song.getAll();
    const response = await request(app)
      .get('/api/v1/songs');

    expect(response.body).toEqual(expected);
  });

  it.skip('returns a single song by Id', async() => {
    const expected = await Song.getById(1);
    const response = await request(app)
      .get(`/api/v1/songs/${expected.id}`);

    expect(response.body).toEqual(expected);
  });

  it.skip('updates a song by id', async() => {
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

  it.skip('deletes a song by id', async() => {
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




});




