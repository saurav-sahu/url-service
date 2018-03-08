const urls = require('./urls');
const ping = require('./ping');

module.exports = [
  ...urls,
  ...ping,
];
