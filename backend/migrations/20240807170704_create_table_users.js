
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table=>{
    table.increments('id').primary()
    table.string('name').notNull()
    table.string('email').notNull().unique()
    table.string('password').notNull()
    table.string('imageUrl', 1000)
    table.string('balance', 1000)
    table.boolean('admin').notNull().defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
