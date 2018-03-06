const models = require('../../src/models');

describe('urls model', () => {
  test('should return error when shortUrl is not of length 6', () =>
    models.urls.newUrl('abc', 'http://testwebsite.com')
      .then(() => { })
      .catch((e) => {
        expect(e.message).toBe('Validation error: Validation len on shortUrl failed');
      }));

  test('should insert new url row when it does not exist', () =>
    models.urls.newUrl('Hq7v76', 'http://google.com')
      .then(([, created]) => {
        expect(created).toBe(true);
      })
      .catch((e) => { throw e; }));

  test('should return same entry when entry with same shortUrl already exists', () =>
    models.urls.destroy({
      truncate: true,
      restartIdentity: true,
    })
      .then(() => models.urls.newUrl('google', 'http://google.com'))
      .then(() => models.urls.newUrl('google', 'http://facebook.com'))
      .then(([urlRow, created]) => {
        expect(urlRow.longUrl).toBe('http://google.com');
        expect(created).toBe(false);
      })
      .catch((e) => { throw e; }));
});
