const allRoutes = require('../../src/routes');
const server = require('../../src/server');

describe('server', () => {
  test('should contain correct number of routes', () => {
    const allRoutesCount = allRoutes.length;
    expect(allRoutesCount).toBe(server.table('localhost')[0].table.length);
  });
});
