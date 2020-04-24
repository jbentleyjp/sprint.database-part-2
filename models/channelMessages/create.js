module.exports = (knex, channelMessage) => {
  return async (params) => {
    await knex("channel_messages").insert({
      from_id: params.fromId,
      channel_id: params.channelId,
      message: params.message,
    });
    const keys = await knex("channel_messages")
      .innerJoin("users", "users.id", "channel_messages.from_id")
      .innerJoin("channels", "channels.id", "channel_messages.channel_id")
      .select(
        "channel_messages.id",
        "users.username as from",
        "channels.name as to",
        "channel_messages.message as message",
        "channel_messages.sent_at as sent_at"
      );
    return keys.map((mess) => {
      console.log("mess.username", mess.username);
      return new channelMessage(mess);
    });
  };
};
