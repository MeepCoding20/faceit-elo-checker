const config = require('../config/config');
const logger = require('../utils/logger');

class ValidationService {
  /**
   * Validates all required environment variables
   */
  static validateEnvironment() {
    const required = [
      'DISCORD_TOKEN',
      'FACEIT_API_KEY', 
      'GUILD_ID'
    ];

    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    // Validate format of specific variables
    if (process.env.OWNER_ID && !/^\d+$/.test(process.env.OWNER_ID)) {
      throw new Error('OWNER_ID must be a valid Discord user ID (numbers only)');
    }

    if (!/^\d+$/.test(config.discord.guildId)) {
      throw new Error('GUILD_ID must be a valid Discord guild ID (numbers only)');
    }

    logger.info('Environment validation passed');
  }

  /**
   * Validates Discord message for ELO command
   * @param {Message} message 
   * @returns {Object} validation result
   */
  static validateEloCommand(message) {
    // Ignore system messages, bots, and non-guild messages
    if (!message.guild || message.author.bot || message.system) {
      return {
        valid: false,
        error: 'System message or bot message',
        shouldRespond: false
      };
    }

    // Check command format first
    if (!message.content.startsWith(config.bot.commandPrefix)) {
      return {
        valid: false,
        error: 'Invalid command format',
        shouldRespond: false
      };
    }

    // Check if user has the required role
    const hasRequiredRole = message.member && message.member.roles.cache.some(role => 
      role.name === config.bot.allowedRoleName
    );
    
    // Also allow the owner as a fallback (if OWNER_ID is set)
    const isOwner = config.discord.ownerId && message.author.id === config.discord.ownerId;
    
    if (!hasRequiredRole && !isOwner) {
      return {
        valid: false,
        error: `You need the "${config.bot.allowedRoleName}" role to use this command.`,
        shouldRespond: true
      };
    }

    // Extract username
    const username = message.content.slice(config.bot.commandPrefix.length).trim();
    
    if (!username) {
      return {
        valid: false,
        error: 'Username is required. Usage: `!elo <username>`',
        shouldRespond: true
      };
    }

    return {
      valid: true,
      username
    };
  }
}

module.exports = ValidationService;
