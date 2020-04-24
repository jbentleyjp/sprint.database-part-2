module.exports = (knex, ChannelMessage) => {
  return async (params) => {
    const chanId = params.channelId;
    const allMessages = await knex("channel_messages")
      .innerJoin("users", "users.id", "channel_messages.from_id")
      .innerJoin("channels", "channels.id", "channel_messages.channel_id")
      .select(
        "channel_messages.id",
        "users.username as from",
        "channels.name as to",
        "channel_messages.message as message",
        "channel_messages.sent_at as sent_at"
      )
      .where({ channel_id: chanId });
    return allMessages.map((messages) => new ChannelMessage(messages));
  };
};

// return async () => {
//     const allChannels = await knex("channels").select();
//     const newChannels = allChannels.map((channels) => new Channel(channels));
//     return newChannels;
//   };
// };
