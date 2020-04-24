module.exports = (knex, Channel) => {
  return async () => {
    const allChannels = await knex("channels").select();
    const newChannels = allChannels.map((channels) => new Channel(channels));
    return newChannels;
  };
};
