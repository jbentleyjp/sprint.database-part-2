module.exports = (knex, UserMessage) => {
  return async (params) => {
    await knex("user_messages").insert({
      from_id: params.fromId,
      to_id: params.toId,
      message: params.message,
    });
    const keys = await knex("user_messages")
      .innerJoin("users", "users.id", "user_messages.from_id")
      // .innerJoin("channels", "channels.id", "user_messages.to_id")
      // .innerJoin(
      //   "channel_messages",
      //   "channel_messages.message",
      //   "user_messages.message"
      // )
      .select(
        "user_messages.id",
        "users.username as from",
        "user_messages.message as message",
        "user_messages.sent_at as sent_at"
      );
    return keys.map((mess) => {
      return new UserMessage(mess);
    });
  };
};
// id, from_id, to_id, message and sent_at
