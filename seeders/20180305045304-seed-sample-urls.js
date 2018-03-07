const hasher = require('../src/lib/hasher');
const server = require('../src');
const redisOptions = require('../src/cache/redis-cache-options')(server);

const redisCache = server.cache(redisOptions);

const urlObjectsGenerator = () => {
  const sampleUrlObjects = {};
  const numberOfUrlsToSeed = Number(process.env.URL_COUNT) || 1000000;

  for (let i = 0; i < numberOfUrlsToSeed; i += 1) {
    let offset = 0;
    const shortUrlLength = 6;

    const longUrl = `http://www.${i}.com/`;
    const urlHash = hasher(longUrl);
    const hashLength = urlHash.length;

    while (offset < hashLength - shortUrlLength) {
      const shortUrlCode = urlHash.slice(offset, offset + shortUrlLength);
      if (sampleUrlObjects[shortUrlCode]) { offset += 1; } else {
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
    const sampleUrls = urlObjectsGenerator();
    return queryInterface.bulkInsert('urls', Object.values(sampleUrls))
      .then(() => server.start())
      .then(() => {
        const urlObjectPromises = [];

        Object.values(sampleUrls).forEach((urlObject) => {
          urlObjectPromises.push(redisCache.set(
            urlObject.shortUrl,
            urlObject.longUrl,
            0,
          ));
        });

        return Promise.all(urlObjectPromises);
      })
      .catch((e) => { throw e; });
  },

  down: (queryInterface) => {
    const sampleUrls = urlObjectsGenerator();

    return queryInterface.bulkDelete('urls')
      .then(() => server.start())
      .then(() => {
        const urlObjectPromises = [];

        Object.values(sampleUrls).forEach((urlObject) => {
          urlObjectPromises.push(redisCache.drop(urlObject.shortUrl));
        });

        return Promise.all(urlObjectPromises);
      })
      .catch((e) => { throw e; });
  },
};
