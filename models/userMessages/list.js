module.exports = (knex, UserMessage) => {
  return async (params) => {
    const toId = params.toId;
    const fromId = params.fromId;
    const allUserMessages = await knex("user_messages")
      .innerJoin("users", "users.id", "user_messages.from_id")
      .select(
        "user_messages.id",
        "user_messages.from_id as from",
        "user_messages.to_id as to_id",
        "user_messages.message as message",
        "user_messages.sent_at as sent_at"
      )
      .where({ from_id: fromId, to_id: toId });
    console.log({ allUserMessages }, "ALL");
    return allUserMessages.map((messages) => {
      console.log(messages, "ONE");
      return new UserMessage(messages);
    });
  };
};
