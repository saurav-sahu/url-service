const joi = require('joi');

const models = require('../models');
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
  {
    path: '/urls',
    method: 'GET',
    config: {
      validate: {
        query: {
          code: joi.string().length(6).required(),
        },
      },
    },
    handler: (request, response) => {
      const { code } = request.query;

      models.urls.findOne(({ where: { shortUrl: code } }))
        .then((urlEntry) => {
          if (!urlEntry) {
            return response({
              statusCode: 404,
              error: 'Url not found',
              message: 'No url found with the specified url.',
            });
          }

          return response({
            data: {
              longUrl: urlEntry.longUrl,
              shortUrl: urlEntry.shortUrl,
            },
            statusCode: 200,
          });
        })
        .catch(response);
    },
  },
];

