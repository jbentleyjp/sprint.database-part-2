module.exports = (knex, UserMessage) => {
  return async (params) => {
    const toId = params.toId;
    const fromId = params.fromId;
    const allUserMessages = await knex("user_messages")
      .innerJoin("users", "users.id", "user_messages.from_id")
      .select(
        "user_messages.id",
        "users.username as from",
        "user_messages.to_id as to_id",
        "user_messages.message as message",
        "user_messages.sent_at as sent_at"
      )
      .where({ to_id: fromId, from_id: toId })
      .orWhere({ to_id: toId, from_id: fromId });

    const allMSGs = await allUserMessages.map((messages) => {
      return new UserMessage(messages);
    });
    return allMSGs;
  };
};
