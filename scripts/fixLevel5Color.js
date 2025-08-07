require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

async function fixLevel5Color() {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds]
  });

  try {
    console.log('🔄 Logging in to Discord...');
    await client.login(process.env.DISCORD_TOKEN);
    
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    console.log(`🏠 Connected to guild: ${guild.name}`);
    
    // Find Level 5 role
    const level5Role = guild.roles.cache.find(r => r.name === 'Level 5');
    
    if (!level5Role) {
      console.log('❌ Level 5 role not found!');
      return;
    }
    
    console.log(`📋 Current Level 5 color: ${level5Role.hexColor}`);
    
    // Update to correct gold color
    await level5Role.setColor('#ffcd22', 'Fixed Level 5 color to match FACEIT standard');
    
    console.log('✅ Level 5 role color updated to gold (#ffcd22)');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.destroy();
    console.log('👋 Disconnected from Discord');
    process.exit(0);
  }
}

fixLevel5Color();
