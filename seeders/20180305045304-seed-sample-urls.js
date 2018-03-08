const hasher = require('../src/lib/hasher');
const server = require('../src/server');
const redisOptions = require('../src/cache/redis-cache-options');

const urlObjectsGenerator = (offset, count) => {
  const sampleUrlObjects = {};
  console.log('db: ', offset, ' ->', offset + (count - 1));

  for (let i = offset; i < offset + count; i += 1) {
    let collisionOffset = 0;
    const shortUrlLength = 6;

    const longUrl = `http://www.${i}.com/`;
    const urlHash = hasher(longUrl);
    const hashLength = urlHash.length;

    while (collisionOffset < hashLength - shortUrlLength) {
      const shortUrlCode = urlHash.slice(collisionOffset, collisionOffset + shortUrlLength);
      if (sampleUrlObjects[shortUrlCode]) { collisionOffset += 1; } else {
        sampleUrlObjects[shortUrlCode] = ({
          longUrl,
          shortUrl: shortUrlCode,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        break;
      }
    }
  }
  return sampleUrlObjects;
};

module.exports = {
  up: (queryInterface) => {
    const count = Number(process.env.URL_COUNT) || 10000;
    const iterations = 100;
    const insertionPromises = [];

    for (let i = 0; i < iterations; i += 1) {
      const urlObjects = urlObjectsGenerator(count * i, count);
      insertionPromises.push(queryInterface.bulkInsert('urls', Object.values(urlObjects)));
    }
    return Promise.all(insertionPromises)
      .then(server.start())
      .then(() => {
        const redisCache = server.cache(redisOptions);
        const redisCacheInsertionPromises = [];

        for (let i = 0; i < iterations; i += 1) {
          const urlObjects = urlObjectsGenerator(count * i, count);
          console.log('redis -> ', count * i, count, 'end ->', (count * i) + (count - 1));


          redisCacheInsertionPromises.concat(Object.values(urlObjects).map(url =>
            redisCache.set(url.shortUrl, url.longUrl)));
        }

        return Promise.all(redisCacheInsertionPromises);
      })
      .catch((e) => { throw e; });
  },

  down: queryInterface => queryInterface.bulkDelete('urls')
    .then(() => server.start())
    .then(() => {
      const count = Number(process.env.URL_COUNT) || 10000;
      const redisCache = server.cache(redisOptions);
      const redisCacheDeletePromises = [];

      for (let i = 0; i < count; i += 1) {
        const urlObjects = urlObjectsGenerator(count * i, count);

        redisCacheDeletePromises.concat(Object.values(urlObjects).map(url =>
          redisCache.drop(url.shortUrl)));
      }

      return Promise.all(redisCacheDeletePromises);
    })
    .catch((e) => { throw e; }),
};
