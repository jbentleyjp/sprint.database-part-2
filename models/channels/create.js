const validateChannelName = (uName) =>
  typeof uName === "string" && uName.replace(" ", "").length > 3;

module.exports = (knex, Channel) => {
  return (params) => {
    //   try {
    const chanName = params.name;

    if (!validateChannelName(chanName)) {
      return Promise.reject(
        new Error(
          "Channel name must be provided, and be at least four characters"
        )
      );
    }

    return knex("channels")
      .insert({ name: chanName.toLowerCase() })
      .then(() => {
        return knex("channels")
          .where({ name: chanName.toLowerCase() })
          .select();
      })
      .then((channels) => new Channel(channels.pop())) // create a user model out of the plain database response
      .catch((err) => {
        // sanitize known errors
        console.log("ERROR", err.message);
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That channel already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
//     await knex("channels").insert({
//       name: chanName.toLowerCase(),
//     });
//     const channelSelect = await knex("channels")
//       .where({ name: chanName.toLowerCase() })
//       .select();
//     return new Channel(channelSelect.pop());
//   } catch (err) {
//     // console.log(err.message, "I AM ERROR");
//     // await Promise.reject(new Error("That channel already exists"));
//     // // sanitize known errors
//     if (
//       err.message.match("duplicate key value") ||
//       err.message.match("UNIQUE constraint failed")
//     )
//       return Promise.reject(new Error("That channel already exists"));

//     // // throw unknown errors
//     return Promise.reject(err);
//   }
// };

// const name = params.name;
// console.log("IM A PARAM", params);
// await knex("channels").insert({
//   name: params.name.toLowerCase(),
// });
// const sel_channel = knex("channels")
//   .where({ name: params.name.toLowerCase() })
//   .select("name");

// console.log("ins_channel", sel_channel);
// return sel_channel.map((channel) => {
//   return channel;

// [{ name: 'general' }, { name: 'general' }]
// AssertionError: expected [ { id: 142, name: 'general' } ] to include { name: 'general' }
// return async () => {
//   const allUsers = await knex("users").select(); // fix me!
//   // const allUsers = await knex.select().from("users"); // fix me!
//   const newUsers = allUsers.map((users) => new User(users));
//   return newUsers;
// }
