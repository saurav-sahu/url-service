const lib = require('../../src/lib');

const shortenUrlAndInsert = (longUrl) => {
  const insertUrlPromise = lib.generateShortUrl(
    longUrl,
    lib.hasher(longUrl),
    0,
    6,
  );
  return insertUrlPromise;
};

module.exports = shortenUrlAndInsert;
