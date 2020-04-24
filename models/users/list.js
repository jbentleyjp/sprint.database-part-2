module.exports = (knex, User) => {
  return async () => {
    const allUsers = await knex("users").select();
    const newUsers = allUsers.map((users) => new User(users));
    return newUsers;
  };
};
