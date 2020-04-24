module.exports = (knex, User) => {
  return async () => {
    const allUsers = await knex("users").select();
    // const allUsers = await knex.select().from("users");
    const newUsers = allUsers.map((users) => new User(users));
    return newUsers;
  };
};
