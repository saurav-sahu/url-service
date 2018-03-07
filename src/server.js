const catboxRedis = require('catbox-redis');
const good = require('good');
const hapi = require('hapi');

const server = new hapi.Server({
  cache: [
    {
      name: 'redisCache',
      engine: catboxRedis,
      host: '127.0.0.1',
      port: 6379,
      partition: 'urls',
    },
  ],
});

server.connection({
  host: '0.0.0.0',
  port: Number(process.env.PORT) || Number(process.argv[2]) || 8080,
});

server.register({
  register: good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*',
        }],
      }, {
        module: 'good-console',
      }, 'stdout'],
    },
  },
}, (err) => {
  if (err) {
    throw err;
  }
});

module.exports = server;
