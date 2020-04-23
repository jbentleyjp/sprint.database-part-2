module.exports = (knex, Channel) => {
  return async () => {
    const allChannels = await knex("channels").select(); // fix me!
    const newChannels = allChannels.map((channels) => new Channel(channels));
    return newChannels;
  };
};
