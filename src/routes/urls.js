const joi = require('joi');

const models = require('../models');
const helpers = require('../helpers');
const server = require('../server');
const redisCacheOptions = require('../cache/redis-cache-options');

const redisCache = server.cache(redisCacheOptions);

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

      redisCache.get(code, (error, longUrl) => {
        if (error) return response(error);

        if (!longUrl) {
          return models.urls.findOne({ where: { shortUrl: code } })
            .then((urlRow) => {
              if (!urlRow) {
                return response({
                  statusCode: 404,
                  error: 'Url not found',
                  message: 'No url found with the specified url.',
                });
              }

              return response({
                data: {
                  longUrl: urlRow.longUrl,
                  shortUrl: code,
                },
                statusCode: 200,
              });
            });
        }
        return response({
          data: {
            longUrl,
            shortUrl: code,
          },
          statusCode: 200,
        });
      });
    },
  },
];

