module.exports = [
  {
    path: '/ping',
    method: 'GET',
    handler: (request, response) => response('pong'),
  },
];

