module.exports = (knex, channelMessage) => {
  return async (params) => {
    let keys = await knex("users")
      .select()
      .innerJoin("channel_messages", "users.id", "channel_messages.from_id")
      .innerJoin("channels", "channels.id", "channel_messages.channel_id");
    console.log(keys);

    await knex("channel_messages").insert({
      from_id: params.fromId,
      channel_id: params.channelId,
      message: params.message,
    });
    const allMSG = await knex("channel_messages")
      .where({
        from_id: params.fromId,
        channel_id: params.channelId,
        message: params.message,
      })
      .select();
    console.log("allMSG", allMSG[0]);
    return allMSG.map((mess) => {
      const smth = new channelMessage(mess);
      console.log(smth, "IM SMTH");
      return {
        fromUser: smth.serialize().fromUser,
        toChannel: smth.serialize().toChannel,
        message: smth.serialize().message,
      };
    });
    // console.log(messages, "IM ALL THE MESSAGES")
    // return { messages };
  };
};
