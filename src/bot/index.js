require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const config = require('../config/config');
const logger = require('../utils/logger');
const faceitService = require('../services/faceitService');
const RoleManager = require('../services/roleManager');
const ValidationService = require('../services/validationService');

class EloBot {
  constructor() {
    // Validate environment before initialization
    ValidationService.validateEnvironment();

    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ]
    });

    this.roleManager = new RoleManager(this.client);
    this.setupEventHandlers();
  }

  /**
   * Sets up Discord event handlers
   */
  setupEventHandlers() {
    this.client.once('ready', () => {
      logger.info(`Bot online as ${this.client.user.tag}`);
      logger.info(`Serving ${this.client.guilds.cache.size} guilds`);
    });

    this.client.on('messageCreate', this.handleMessage.bind(this));

    this.client.on('error', (error) => {
      logger.error('Discord client error', { error });
    });

    this.client.on('warn', (warning) => {
      logger.warn('Discord client warning', { warning });
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
      logger.info('Received SIGINT, shutting down gracefully');
      this.shutdown();
    });

    process.on('SIGTERM', () => {
      logger.info('Received SIGTERM, shutting down gracefully');
      this.shutdown();
    });
  }

  /**
   * Handles incoming Discord messages
   * @param {Message} message 
   */
  async handleMessage(message) {
    try {
      // Ignore bot messages
      if (message.author.bot) return;

      // Validate command
      const validation = ValidationService.validateEloCommand(message);
      
      if (!validation.valid) {
        if (validation.shouldRespond) {
          await message.reply(validation.error);
        }
        return;
      }

      // Process ELO command
      await this.processEloCommand(message, validation.username);

    } catch (error) {
      logger.error('Error handling message', { 
        error: error.message,
        messageId: message.id,
        userId: message.author.id 
      });
      
      await this.sendErrorMessage(message, 'An unexpected error occurred. Please try again later.');
    }
  }

  /**
   * Processes the ELO command
   * @param {Message} message 
   * @param {string} username 
   */
  async processEloCommand(message, username) {
    try {
      // Send typing indicator
      await message.channel.sendTyping();

      logger.info(`Processing ELO command for username: ${username}`, {
        userId: message.author.id,
        guildId: message.guild.id
      });

      // Fetch ELO from FACEIT
      const elo = await faceitService.getPlayerElo(username);
      
      // Get member and update role
      const member = await message.guild.members.fetch(message.author.id);
      await this.roleManager.updateEloRole(member, elo);

      // Send success response
      const faceitLevel = this.roleManager.getFaceitLevel(elo);
      await message.reply(`Updated your ELO to **${elo}**`);

      logger.info(`Successfully processed ELO command`, {
        username,
        elo,
        level: faceitLevel,
        userId: message.author.id
      });

    } catch (error) {
      
      logger.error(`Failed to process ELO command`, {
        username,
        error: error.message,
        userId: message.author.id
      });

      // Send user-friendly error message
      let errorMessage = `❌ Failed to fetch ELO for "${username}".`;
      
      if (error.message.includes('No FACEIT profile found')) {
        errorMessage += ' Please check the username and try again.';
      } else if (error.message.includes('Invalid ELO data')) {
        errorMessage += ' The player might not have CS2 statistics.';
      } else {
        errorMessage += ' Please try again later.';
      }

      await message.reply(errorMessage);
    }
  }

  /**
   * Sends error message with proper error handling
   * @param {Message} message 
   * @param {string} errorText 
   */
  async sendErrorMessage(message, errorText) {
    try {
      await message.reply(errorText);
    } catch (replyError) {
      logger.error('Failed to send error message', { error: replyError.message });
    }
  }

  /**
   * Starts the bot
   */
  async start() {
    try {
      await this.client.login(config.discord.token);
    } catch (error) {
      logger.error('Failed to start bot', { error });
      process.exit(1);
    }
  }

  /**
   * Gracefully shuts down the bot
   */
  async shutdown() {
    try {
      logger.info('Shutting down bot...');
      this.roleManager.clearCache();
      await this.client.destroy();
      process.exit(0);
    } catch (error) {
      logger.error('Error during shutdown', { error });
      process.exit(1);
    }
  }
}

// Start the bot
const bot = new EloBot();
bot.start();
