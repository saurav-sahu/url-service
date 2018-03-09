const hasher = require('../src/lib/hasher');

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
    const count = Number(process.env.URL_COUNT) || 1000000;

    const urlObjects = urlObjectsGenerator(0, count);
    return queryInterface.bulkInsert('urls', Object.values(urlObjects))
      .catch((e) => { throw e; });
  },

  down: queryInterface => queryInterface.bulkDelete('urls').catch((e) => { throw e; }),
};
