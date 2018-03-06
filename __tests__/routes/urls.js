const supertest = require('supertest');

const lib = require('../../src/lib');
const server = require('../../src/server');

describe('POST /urls', () => {
  test('should return 200 statusCode', (done) => {
    supertest(server.listener)
      .post('/urls')
      .send({
        url: 'http://wikipedia.org',
      })
      .then((response) => {
        expect(response.body.statusCode).toBe(200);
        done();
      });
  });

  test('should return longUrl and shortUrl in response body', (done) => {
    const url = 'http://wikipedia.org';
    supertest(server.listener)
      .post('/urls')
      .send({ url })
      .then((response) => {
        expect(response.body.data.longUrl).toBe(url);
        expect(lib.hasher(url).includes(response.body.data.shortUrl)).toBe(true);
        done();
      });
  });
});
