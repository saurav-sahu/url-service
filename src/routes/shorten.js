const joi = require('joi');

const helpers = require('../helpers');
const lib = require('../lib');

module.exports = [
  {
    method: 'POST',
    path: '/shorten',
    config: {
      validate: {
        payload: {
          url: joi.string().uri().required(),
        },
      },
    },
    handler: (request, response) => {
      const { url } = request.payload;


      helpers.shortenUrlAndInsert(
        url,
        lib.hasher(url),
        0,
        6,
      )
        .then(urlRow => response({
          data: urlRow,
          statusCode: 200,
        }));
    },
  },
];

