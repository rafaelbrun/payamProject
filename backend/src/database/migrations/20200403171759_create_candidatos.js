
exports.up = function(knex) {
  return knex.schema.createTable('candidatos', function (table){
      table.string('name').notNullable();
      table.decimal('votos').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('candidatos');
};
