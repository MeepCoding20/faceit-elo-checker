require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// FACEIT level colors and ranges from your roleManager
const FACEIT_LEVELS = [
  { level: 1, color: '#d2d2d2', minElo: 0 },
  { level: 2, color: '#46e46f', minElo: 501 },
  { level: 3, color: '#46e46f', minElo: 751 },
  { level: 4, color: '#ffcd22', minElo: 901 },
  { level: 5, color: '#ffcd22', minElo: 1051 },
  { level: 6, color: '#ffcd22', minElo: 1201 },
  { level: 7, color: '#ffcd22', minElo: 1351 },
  { level: 8, color: '#fd6c20', minElo: 1531 },
  { level: 9, color: '#fd6c20', minElo: 1751 },
  { level: 10, color: '#e80129', minElo: 2001 }
];

async function createAllLevelRoles() {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds]
  });

  try {
    console.log('🔄 Logging in to Discord...');
    await client.login(process.env.DISCORD_TOKEN);
    
    console.log('✅ Bot logged in successfully!');
    
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    console.log(`🏠 Connected to guild: ${guild.name}`);
    
    console.log('🎭 Creating FACEIT level roles...\n');
    
    for (const levelData of FACEIT_LEVELS) {
      const roleName = `Level ${levelData.level}`;
      
      // Check if role already exists
      let role = guild.roles.cache.find(r => r.name === roleName);
      
      if (role) {
        console.log(`⚠️  Role "${roleName}" already exists - skipping`);
        continue;
      }
      
      try {
        // Create the role
        role = await guild.roles.create({
          name: roleName,
          color: levelData.color,
          reason: `Auto-created FACEIT Level ${levelData.level} role (ELO ${levelData.minElo}+)`,
          mentionable: false,
          hoist: false
        });
        
        console.log(`✅ Created "${roleName}" with color ${levelData.color} (ELO ${levelData.minElo}+)`);
        
        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`❌ Failed to create "${roleName}":`, error.message);
      }
    }
    
    console.log('\n🎉 Finished creating all FACEIT level roles!');
    console.log('📋 Summary:');
    console.log('   Level 1 (Gray) - ELO 0-500');
    console.log('   Level 2-3 (Green) - ELO 501-900');
    console.log('   Level 4-7 (Gold) - ELO 901-1750');
    console.log('   Level 8-9 (Orange) - ELO 1531-2000');
    console.log('   Level 10 (Red) - ELO 2001+');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.destroy();
    console.log('\n👋 Disconnected from Discord');
    process.exit(0);
  }
}

// Run the script
createAllLevelRoles();
