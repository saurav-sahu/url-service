const lib = require('../../src/lib');

const shortenUrlAndInsert = (longUrl) => {
  const insertedUrl = lib.generateShortUrl(
    longUrl,
    lib.hasher(longUrl),
    0,
    6,
  );
  return Promise.resolve(insertedUrl);
};

module.exports = shortenUrlAndInsert;
