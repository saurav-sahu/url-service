const joi = require('joi');

const helpers = require('../helpers');

module.exports = [
  {
    method: 'POST',
    path: '/urls',
    config: {
      validate: {
        payload: {
          url: joi.string().uri().required(),
        },
      },
    },
    handler: (request, response) => {
      const { url } = request.payload;
      helpers.shortenUrlAndInsert(url)
        .then(urlRow => response({
          data: urlRow,
          statusCode: 200,
        }))
        .catch(response);
    },
  },
];

