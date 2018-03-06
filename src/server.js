const good = require('good');
const hapi = require('hapi');

const allRoutes = require('./routes');


const server = new hapi.Server();
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

server.route(allRoutes);

if (!module.parent) {
  server.start()
    .then(() => {
      console.log(`Server running at: ${server.info.uri}`);
    })
    .catch((error) => { throw error; });
}

module.exports = server;
