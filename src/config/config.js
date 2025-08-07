// Configuration management
module.exports = {
  discord: {
    token: process.env.DISCORD_TOKEN,
    ownerId: process.env.OWNER_ID || null, // Optional now
    guildId: process.env.GUILD_ID,
  },
  faceit: {
    apiKey: process.env.FACEIT_API_KEY,
    baseUrl: 'https://open.faceit.com/data/v4',
    timeout: 5000,
    retries: 3,
  },
  bot: {
    commandPrefix: '!elo',
    roleCacheTime: 5 * 60 * 1000, // 5 minutes
    maxUsernameLength: 50,
    allowedRoleName: 'Verified', // Role name that can use the bot
  }
};
