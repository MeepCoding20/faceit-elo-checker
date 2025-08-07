# API Documentation

## Services

### FaceitService

Handles all FACEIT API interactions with retry logic and error handling.

#### Methods

- `getPlayerElo(username: string): Promise<number>` - Fetches player ELO with username variations
- `validateUsername(username: string): void` - Validates username input
- `generateUsernameVariations(username: string): string[]` - Creates case variations

### RoleManager

Manages Discord role creation and assignment.

#### Methods

- `updateEloRole(member: GuildMember, elo: number): Promise<void>` - Updates user roles
- `getOrCreateEloRole(guild: Guild, roleName: string, elo: number): Promise<Role>` - Role management
- `getFaceitLevel(elo: number): number` - Converts ELO to FACEIT level
- `getFaceitLevelColor(level: number): string` - Gets official FACEIT colors

### ValidationService

Handles input validation and authorization.

#### Methods

- `validateEnvironment(): void` - Validates required environment variables
- `validateEloCommand(message: Message): Object` - Validates command format and permissions

## Configuration

### config.js

Central configuration management for all bot settings.

## Error Handling

The bot implements comprehensive error handling:
- API retry logic with exponential backoff
- Graceful degradation for missing permissions
- User-friendly error messages
- Structured logging for debugging

## Logging

Uses Winston for structured logging with multiple transports and log levels.
