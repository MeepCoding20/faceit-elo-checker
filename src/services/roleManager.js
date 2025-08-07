const logger = require('../utils/logger');

class RoleManager {
  constructor(client) {
    this.client = client;
    this.roleCache = new Map();
  }

  /**
   * Updates user's ELO role and FACEIT level role
   * @param {GuildMember} member 
   * @param {number} elo 
   */
  async updateEloRole(member, elo) {
    try {
      const guild = member.guild;
      const eloRoleName = `ELO ${elo}`;
      const faceitLevel = this.getFaceitLevel(elo);
      const levelRoleName = `Level ${faceitLevel}`;
      
      // Get or create both roles
      const eloRole = await this.getOrCreateEloRole(guild, eloRoleName, elo);
      const levelRole = await this.getOrCreateLevelRole(guild, levelRoleName, faceitLevel);
      
      // Remove old ELO and Level roles efficiently
      await this.removeOldRoles(member, eloRole, levelRole);
      
      // Add new roles
      await member.roles.add([eloRole, levelRole]);
      
      logger.info(`Updated roles for ${member.user.tag} to ${eloRoleName} and ${levelRoleName}`);
    } catch (error) {
      logger.error(`Failed to update role for ${member.user.tag}`, { error: error.message });
      throw error;
    }
  }

  /**
   * Gets existing ELO role or creates new one
   * @param {Guild} guild 
   * @param {string} roleName 
   * @param {number} elo 
   * @returns {Promise<Role>}
   */
  async getOrCreateEloRole(guild, roleName, elo) {
    // Check cache first
    const cacheKey = `${guild.id}:${roleName}`;
    if (this.roleCache.has(cacheKey)) {
      const cachedRole = this.roleCache.get(cacheKey);
      if (Date.now() - cachedRole.timestamp < 5 * 60 * 1000) { // 5 minutes
        return cachedRole.role;
      }
    }

    // Find existing role
    let role = guild.roles.cache.find(r => r.name === roleName);
    
    if (!role) {
      // Create new role with neutral color for ELO roles
      role = await guild.roles.create({
        name: roleName,
        color: '#99AAB5', // Discord's default gray
        reason: `Auto-created ELO role for ${elo}`,
      });
      
      logger.info(`Created new ELO role: ${roleName}`);
    }

    // Cache the role
    this.roleCache.set(cacheKey, {
      role,
      timestamp: Date.now()
    });

    return role;
  }

  /**
   * Gets existing FACEIT level role or creates new one
   * @param {Guild} guild 
   * @param {string} roleName 
   * @param {number} level 
   * @returns {Promise<Role>}
   */
  async getOrCreateLevelRole(guild, roleName, level) {
    // Check cache first
    const cacheKey = `${guild.id}:${roleName}`;
    if (this.roleCache.has(cacheKey)) {
      const cachedRole = this.roleCache.get(cacheKey);
      if (Date.now() - cachedRole.timestamp < 5 * 60 * 1000) { // 5 minutes
        return cachedRole.role;
      }
    }

    // Find existing role
    let role = guild.roles.cache.find(r => r.name === roleName);
    
    if (!role) {
      // Create new role with FACEIT level color
      const roleColor = this.getFaceitLevelColor(level);
      role = await guild.roles.create({
        name: roleName,
        color: roleColor,
        reason: `Auto-created FACEIT level role for Level ${level}`,
      });
      
      logger.info(`Created new Level role: ${roleName} with color ${roleColor}`);
    }

    // Cache the role
    this.roleCache.set(cacheKey, {
      role,
      timestamp: Date.now()
    });

    return role;
  }

  /**
   * Removes old ELO and Level roles from member
   * @param {GuildMember} member 
   * @param {Role} newEloRole 
   * @param {Role} newLevelRole 
   */
  async removeOldRoles(member, newEloRole, newLevelRole) {
    const oldEloRoles = member.roles.cache.filter(role => 
      role.name.startsWith('ELO ') && role.id !== newEloRole.id
    );

    const oldLevelRoles = member.roles.cache.filter(role => 
      role.name.startsWith('Level ') && role.id !== newLevelRole.id
    );

    const allOldRoles = [...oldEloRoles.values(), ...oldLevelRoles.values()];

    if (allOldRoles.length > 0) {
      await member.roles.remove(allOldRoles);
      logger.debug(`Removed ${allOldRoles.length} old roles from ${member.user.tag}`);
    }
  }

  /**
   * Gets FACEIT level from ELO
   * @param {number} elo 
   * @returns {number}
   */
  getFaceitLevel(elo) {
    if (elo >= 2001) return 10;
    if (elo >= 1751) return 9;
    if (elo >= 1531) return 8;
    if (elo >= 1351) return 7;
    if (elo >= 1201) return 6;
    if (elo >= 1051) return 5;
    if (elo >= 901) return 4;
    if (elo >= 751) return 3;
    if (elo >= 501) return 2;
    return 1;
  }

  /**
   * Gets official FACEIT level color
   * @param {number} level 
   * @returns {string}
   */
  getFaceitLevelColor(level) {
    switch (level) {
      case 10: return '#e80129'; // Red-Orange (Master)
      case 9:  return '#fd6c20'; // Red
      case 8:  return '#fd6c20'; // Orange
      case 7:  return '#ffcd22'; // Light Orange
      case 6:  return '#ffcd22'; // Gold
      case 5:  return '#ffcd22'; // Silver
      case 4:  return '#ffcd22'; // Bronze
      case 3:  return '#46e46f'; // Royal Blue
      case 2:  return '#46e46f'; // Lime Green
      case 1:  return '#d2d2d2'; // Gray
      default: return '#99AAB5'; // Default Discord gray
    }
  }

  /**
   * Gets color based on ELO range (legacy - now using neutral for ELO roles)
   * @param {number} elo 
   * @returns {string}
   */
  getEloColor(elo) {
    return '#99AAB5'; // Neutral gray for all ELO roles
  }

  /**
   * Clears role cache
   */
  clearCache() {
    this.roleCache.clear();
    logger.debug('Role cache cleared');
  }
}

module.exports = RoleManager;
