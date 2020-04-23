module.exports = (knex, User) => {
  return async () => {
    const allUsers = await knex("users").select(); // fix me!
    // const allUsers = await knex.select().from("users"); // fix me!
    const newUsers = allUsers.map((users) => new User(users));
    return newUsers;
  };
};
