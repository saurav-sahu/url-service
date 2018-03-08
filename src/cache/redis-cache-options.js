const models = require('../models');

const redisCacheOptions = {
  cache: 'redisCache',
  expiresIn: 1000 * 60 * 60 * 24,
  segment: 'code',
  generateFunc: (shortUrl, next) => {
    models.urls.findOne({ where: { shortUrl } })
      .then((urlRow) => {
        if (!urlRow) {
          next(null);
        } else {
          next(null, urlRow.longUrl);
        }
      });
  },
  generateTimeout: 1000,
};

module.exports = redisCacheOptions;
