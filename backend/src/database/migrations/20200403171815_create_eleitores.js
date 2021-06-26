
exports.up = function (knex) {
  return knex.schema.createTable('eleitores', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.boolean('isElegivel').notNullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('eleitores');
};
