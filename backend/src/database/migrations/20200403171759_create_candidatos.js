
exports.up = function (knex) {
  return knex.schema.createTable('candidatos', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.decimal('votos').notNullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('candidatos');
};
