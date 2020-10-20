
exports.up = function(knex) {
  return knex.schema
  .createTable("users", tbl => {

    tbl.increments();
    tbl.string("first_name").notNullable();
    tbl.string("last_name").notNullable();
    tbl.string("email").notNullable().unique();
    tbl.string("username").notNullable().unique();
    tbl.string("password").notNullable()
    tbl.timestamp("created_at").defaultTo(knex.fn.now())
})

.createTable("potlucks", tbl => {
    tbl.increments()
    tbl.string("event_name", 256).notNullable();
    tbl.string("event_description", 500);
    tbl.string("event_address");
    tbl.string("event_date").notNullable()
    tbl.string("event_time")
    
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
    
    tbl.integer("attending").defaultTo(0)

    tbl.string("role").notNullable() // organizer or guest
})

.createTable("potluck_requirements", tbl => {
    tbl.increments()
    tbl.string("item_category")
    tbl.string("item_name").notNullable()
    tbl.string("item_description")
    tbl.string("item_amount")

    tbl.integer("assigned_to_user_id")
    .unsigned()
    .references("id")
    .inTable("users")
    .onUpdate("CASCADE")
    .onDelete("CASCADE")

    tbl.integer("potluck_id")
    .unsigned()
    .references("id")
    .inTable("potlucks")
    .onUpdate("CASCADE")
    .onDelete("CASCADE")
})
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("potluck_requirements")
    .dropTableIfExists("users_potlucks")
    .dropTableIfExists("potlucks")
    .dropTableIfExists("users")
};
