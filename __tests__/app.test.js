const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');
const { getAll } = require('../lib/models/Dog');
const Song = require('../lib/models/Song');

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

});
