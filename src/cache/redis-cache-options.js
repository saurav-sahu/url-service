const redisCacheOptions = {
  cache: 'redisCache',
  expiresIn: 1000 * 60 * 60 * 24,
  segment: 'code',
};

module.exports = redisCacheOptions;
