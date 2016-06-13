const knexfile = require('../../knexfile');
const config = require('./config');

const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);

module.exports = {
  config,
  knex,
  bookshelf,
};
