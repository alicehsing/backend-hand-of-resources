const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');

describe('backend-hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

it('creates a dog', async() => {
  const expected = {
    name: 'Momo',
    age: 1,
    favoriteTreat: 'Beef Jerky'
  }

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

  expect(res.body).toEqual(expected)
})

it('returns a single dog by Id', async() => {
  const expected = await Dog.getById(1);
  const res = await request(app)
  .get(`/api/v1/dogs/${expected.id}`);

  expect(res.body).toEqual(expected)
})

});
