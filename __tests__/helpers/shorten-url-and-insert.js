const lib = require('../../src/lib');
const models = require('../../src/models');
const shortenUrlAndInsert = require('../../src/helpers/shorten-url-and-insert');

describe('shortenUrlAndInsert', () => {
  test('should insert with different hash when collision occurs', (done) => {
    const stub = jest
      .fn()
      .mockReturnValue('abcdefabcdefabcdefabcd');

    lib.hasher = stub;

    const url1 = 'http://first.com';
    const url2 = 'http://second.com';

    shortenUrlAndInsert(url1, lib.hasher(url1), 0, 6)
      .then(() => shortenUrlAndInsert(url2, lib.hasher(url2), 0, 6))
      .then(() => models.urls.findAll({
        where: { shortUrl: 'bcdefa' },
      }))
      .then((urls) => {
        expect(urls.length).toBe(1);
        done();
      });
  });
});
