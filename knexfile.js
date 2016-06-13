const config = require('./api/src/config');

module.exports = {
  client: 'mysql',
  connection: config.mysql.connection,
  migrations: {
    directory: `${__dirname}/db/migrations`,
  },
  seeds: {
    directory: `${__dirname}/db/seeds`,
  },
};
