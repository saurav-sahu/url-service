const models = require('../models');

const generateShortUrl = (longUrl, hash, offset, length) => {
  const hashLength = hash.length;

  if (offset > hashLength.length - length) {
    return Promise.reject(new Error('Exceeded limit for the hash.'));
  }

  const shortUrl = hash.slice(offset, offset + length);

  return models.urls.newUrl(shortUrl, longUrl)
    .then(([url, created]) => {
      if (url.longUrl !== longUrl && !created) {
        return generateShortUrl(longUrl, hash, offset + 1, 6);
      }
      return Promise.resolve({ longUrl: url.longUrl, shortUrl: url.shortUrl });
    });
};

module.exports = generateShortUrl;
