const about = require('./about');
const urls = require('./urls');
const ping = require('./ping');

module.exports = [
  ...about,
  ...urls,
  ...ping,
];
