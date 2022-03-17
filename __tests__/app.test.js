const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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




});
