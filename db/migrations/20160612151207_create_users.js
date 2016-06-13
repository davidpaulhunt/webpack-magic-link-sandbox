
exports.up = knex =>
  knex.schema
    .createTable('users', (t) => {
      t.increments('id').primary();
      t.uuid('uid');
      t.string('username');
      t.string('email');
      t.dateTime('last_login_at');
      t.string('magic_token');
      t.string('token_secret');
      t.timestamps();
    });

exports.down = knex =>
  knex.schema.dropTable('users');
