exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_messages", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.integer("from_id")
      .notNullable()
      .index();

    t.integer("to_id")
      .notNullable()
      .index();

    t.string("message").notNullable();

    t.timestamp("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user_messages");
};
