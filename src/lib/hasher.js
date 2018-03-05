const md5 = require('md5');
const bases = require('bases');

const hasher = (url) => {
  const md5Hash = md5(url);

  const hashHex = bases.fromBase16(md5Hash);
  const base62Hash = bases.toBase62(hashHex);

  const shortUrl = base62Hash;
  return shortUrl;
};

module.exports = hasher;
