const allRoutes = require('./routes');
const server = require('./server');

server.route(allRoutes);

if (!module.parent) {
  server.start()
    .then(() => {
      console.log(`Server running at: ${server.info.uri}`);
    })
    .catch((error) => { throw error; });
}

module.exports = server;
