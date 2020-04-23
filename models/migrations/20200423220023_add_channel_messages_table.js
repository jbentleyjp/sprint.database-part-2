exports.up = function(knex, Promise) {
  return knex.schema.createTable("channel_messages", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.integer("channel_id")
      .notNullable()
      .index();

    t.integer("from_id")
      .notNullable()
      .index();

    t.string("message").notNullable();

    t.timestamp("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("channel_messages");
};
