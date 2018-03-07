const supertest = require('supertest');

const lib = require('../../src/lib');
const models = require('../../src/models');
const server = require('../../src');

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

describe('get /urls', () => {
  test('should return statusCode 400 when code passed is invalid (not of length 6)', (done) => {
    supertest(server.listener)
      .get('/urls?code=123')
      .then((response) => {
        expect(response.body.statusCode).toBe(400);
        done();
      })
      .catch((e) => { throw e; });
  });

  test('should return statusCode 404 when code does not exist in the database', (done) => {
    supertest(server.listener)
      .get('/urls?code=12345_')
      .then((response) => {
        expect(response.body.statusCode).toBe(404);
        done();
      });
  });

  test('should return correct url entry when code is present in the database', (done) => {
    models.urls.findOne()
      .then(urlRow => supertest(server.listener)
        .get(`/urls?code=${urlRow.shortUrl}`)
        .then((response) => {
          expect(response.body.data.shortUrl).toBe(urlRow.shortUrl);
          expect(response.body.data.longUrl).toBe(urlRow.longUrl);
          done();
        }));
  });
});
