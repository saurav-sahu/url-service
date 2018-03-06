const about = require('./about');
const shorten = require('./urls');

module.exports = [
  ...about,
  ...shorten,
];
