
exports.up = function(knex) {
  return knex.schema
  .createTable("users", tbl => {

    tbl.increments();
    tbl.string("first_name").notNullable();
    tbl.string("last_name").notNullable();
    tbl.string("username").notNullable().unique();
    tbl.string("password").notNullable()
})

.createTable("potlucks", tbl => {
    tbl.increments()
    tbl.string("date").notNullable()
    tbl.string("time")
    tbl.string("location")
})

.createTable("items", tbl => {
    tbl.increments()
    tbl.string("item_name").notNullable()
    tbl.string("item_description").notNullable()
})

.createTable("users_potlucks", tbl => {
    tbl.increments()

    tbl.integer("user_id")
        .unsigned()
        .references('id')
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")

    tbl.integer("potluck_id")
        .unsigned()
        .references('id')
        .inTable('potlucks')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    
    tbl.integer("attending")

    tbl.string("role").notNullable()
})

.createTable("potlucks_items", tbl => {
    tbl.increments()

    tbl.integer("item_id")
        .unsigned()
        .references('id')
        .inTable('items')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

        tbl.integer("potluck_id")
        .unsigned()
        .references('id')
        .inTable('potlucks')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
})



};

exports.down = function(knex) {
  
};
