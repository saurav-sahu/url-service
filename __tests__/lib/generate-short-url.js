const lib = require('../../src/lib');

describe('generateShortUrl', () => {
  test('should return a string of length 6 with base62 characters', () => {
    const url = 'http://haha.com';
    lib.generateShortUrl(url, lib.hasher(url), 0, 6)
      .then((shortUrlCode) => {
        expect(shortUrlCode.match(/[a-zA-Z0-9]{6}/)).toBe(true);
      });
  });
});
