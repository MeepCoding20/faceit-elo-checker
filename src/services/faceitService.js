const axios = require('axios');
const config = require('../config/config');
const logger = require('../utils/logger');

class FaceitService {
  constructor() {
    this.client = axios.create({
      baseURL: config.faceit.baseUrl,
      timeout: config.faceit.timeout,
      headers: {
        'Authorization': `Bearer ${config.faceit.apiKey}`,
        'Accept': 'application/json',
      },
    });
  }

  /**
   * Fetches player ELO with retry logic and case variations
   * @param {string} username - The player's username
   * @returns {Promise<number>} - The player's ELO rating
   */
  async getPlayerElo(username) {
    this.validateUsername(username);
    
    const variations = this.generateUsernameVariations(username);
    logger.info(`Fetching ELO for username variations: ${variations.join(', ')}`);

    for (const variation of variations) {
      try {
        const elo = await this.fetchEloWithRetry(variation);
        if (elo !== null) {
          logger.info(`Found ELO ${elo} for username: ${variation}`);
          return elo;
        }
      } catch (error) {
        logger.debug(`Failed to fetch ELO for variation: ${variation}`, { error: error.message });
        continue;
      }
    }

    throw new Error(`No FACEIT profile found for any variation of "${username}"`);
  }

  /**
   * Validates username input
   * @param {string} username 
   */
  validateUsername(username) {
    if (!username || typeof username !== 'string') {
      throw new Error('Username is required and must be a string');
    }
    
    if (username.length > config.bot.maxUsernameLength) {
      throw new Error(`Username too long (max ${config.bot.maxUsernameLength} characters)`);
    }

    // Basic sanitization
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      throw new Error('Username contains invalid characters');
    }
  }

  /**
   * Generates different case variations of username
   * @param {string} username 
   * @returns {string[]}
   */
  generateUsernameVariations(username) {
    const variations = new Set([
      username, // original
      username.toLowerCase(),
      username.toUpperCase(),
      username.charAt(0).toUpperCase() + username.slice(1).toLowerCase(),
    ]);

    return Array.from(variations);
  }

  /**
   * Fetches ELO with retry logic
   * @param {string} username 
   * @returns {Promise<number|null>}
   */
  async fetchEloWithRetry(username) {
    let lastError;

    for (let attempt = 1; attempt <= config.faceit.retries; attempt++) {
      try {
        const response = await this.client.get(`/players?nickname=${encodeURIComponent(username)}`);
        
        if (!response.data || !response.data.games || !response.data.games.cs2) {
          logger.warn(`Player ${username} doesn't have CS2 data`);
          return null;
        }

        const elo = response.data.games.cs2.faceit_elo;
        if (typeof elo !== 'number' || elo < 0) {
          throw new Error('Invalid ELO data received');
        }

        return elo;
      } catch (error) {
        lastError = error;
        logger.warn(`Attempt ${attempt}/${config.faceit.retries} failed for ${username}`, { 
          error: error.message,
          status: error.response?.status 
        });

        if (attempt < config.faceit.retries) {
          await this.sleep(1000 * attempt); // Exponential backoff
        }
      }
    }

    throw lastError;
  }

  /**
   * Sleep utility for retry delays
   * @param {number} ms 
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new FaceitService();
