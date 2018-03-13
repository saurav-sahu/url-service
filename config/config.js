module.exports = {
  development: {
    username: 'database_admin',
    password: null,
    database: 'url_dev',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'database_admin',
    password: null,
    database: 'url_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'postgres',
  },
};
