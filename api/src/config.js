const env = process.env.NODE_ENV;
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  env,
  app_secret: process.env.APP_SECRET,
  app_host: process.env.APP_HOST,
  mysql: {
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      charset: 'utf8mb4',
    },
  },
};
