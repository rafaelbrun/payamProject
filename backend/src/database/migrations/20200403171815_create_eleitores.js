
exports.up = function(knex) {
  return knex.schema.createTable('eleitores', function(table){
      table.string('name').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('eleitores');
};
