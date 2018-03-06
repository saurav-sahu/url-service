const hasher = require('../src/lib/hasher');

module.exports = {
  up: (queryInterface) => {
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
            id: i,
            longUrl,
            shortUrl: shortUrlCode,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          break;
        }
      }
    }
    return queryInterface.bulkInsert('urls', Object.values(sampleUrlObjects))
      .catch((e) => { console.log(e); throw e; });
  },

  down: queryInterface => queryInterface.bulkDelete('urls'),
};
