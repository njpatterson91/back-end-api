// this file will clean all tables and reset the primary keys back to 1
// the reset of keys is needed when you are seeding, otherwise 
// each run will continue from whatever number id you left off at

const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: 'truncate', // resets ids back to 1
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'], // don't empty migration tables
  });
};
