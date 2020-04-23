exports.up = function(knex, Promise) {
  return knex.schema.createTable("channels", (t) => {
    t.increments()
      .index()
      .unique();
    t.string("name", 15)
      .notNullable()
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("channels");
};
