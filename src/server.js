const hapi = require('hapi');
const packageDetails = require('../package');

const server = new hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: Number(process.env.PORT) || Number(process.argv[2]) || 8080,
});

server.route({
  path: '/',
  method: 'GET',
  handler: (request, response) => {
    response({
      statusCode: 200,
      message: packageDetails.description,
      data: packageDetails.name,
    });
  },
});

if (!module.parent) {
  server.start()
    .then(() => {
      console.log(`Server running at: ${server.info.uri}`);
    })
    .catch((error) => { throw error; });
}

module.exports = server;
