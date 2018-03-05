const packageDetails = require('../../package');

module.exports = [
  {
    path: '/',
    method: 'GET',
    handler: (request, response) => {
      response({
        statusCode: 200,
        message: packageDetails.description,
        data: packageDetails.name,
      });
    },
  },
];
