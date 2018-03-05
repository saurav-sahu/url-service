const hasher = require('../../src/lib/hasher');

describe('hasher', () => {
  test('should return a string', () => {
    expect(typeof hasher('http://google.com')).toBe('string');
  });

  test('should return string of length 22', () => {
    expect(hasher('http://facebook.com').length).toBe(22);
  });

  test('should return a base62 string', () => {
    expect(hasher('http://test-website.com').match(/[a-zA-Z0-9]{22}/));
  });
});
