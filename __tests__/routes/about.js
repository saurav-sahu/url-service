const supertest = require('supertest');

const server = require('../../src/server');

describe('GET /about', () => {
  test('should return 200 statusCode', (done) => {
    supertest(server.listener)
      .get('/about')
      .send()
      .then((response) => {
        expect(response.body.statusCode).toBe(200);
        done();
      });
  });

  test('should return basic info about api', (done) => {
    supertest(server.listener)
      .get('/about')
      .send()
      .then((response) => {
        expect({
          data: response.body.data,
          message: response.body.message,
        }).toEqual({
          data: 'url-service',
          message: 'Url shortener service',
        });
        done();
      });
  });
});

