const validateChannelName = (uName) =>
  typeof uName === "string" && uName.replace(" ", "").length > 3;

module.exports = (knex, Channel) => {
  return async (params) => {
    try {
      const chanName = params.name;

      if (!validateChannelName(chanName)) {
        return Promise.reject(
          new Error(
            "Channel name must be provided, and be at least four characters"
          )
        );
      }
      await knex("channels").insert({
        name: chanName.toLowerCase(),
      });
      const channelSelect = await knex("channels")
        .where({ name: chanName.toLowerCase() })
        .select();
      return new Channel(channelSelect.pop());
    } catch (err) {
      if (
        err.message.match("duplicate key value") ||
        err.message.match("UNIQUE constraint failed")
      )
        throw new Error("That channel already exists");

      // throw unknown errors
      return Promise.reject(err);
    }
  };
};
