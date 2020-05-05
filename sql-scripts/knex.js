var knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: 'postgresql://postgres@localhost/knex-practice',
  });