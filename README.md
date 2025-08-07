# 🎮 FACEIT ELO Discord Bot

A Discord bot that automatically assigns FACEIT ELO and level roles based on CS2 statistics.

[![Node.js](https://img.shields.io/badge/Node.js-16.9.0+-green.svg)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/Discord.js-14.16.3-blue.svg)](https://discord.js.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🚀 Features

- **Automatic Role Assignment** - Assigns Discord roles based on FACEIT ELO ratings
- **Official FACEIT Colors** - Uses authentic FACEIT level colors for role hierarchy
- **Smart Username Matching** - Tries multiple case variations to find players
- **Robust Error Handling** - Comprehensive retry logic and user-friendly error messages
- **Role-Based Permissions** - Configurable access control
- **Professional Logging** - Structured logging with Winston
- **Easy Setup** - One-command role generation

## 📋 Requirements

- Node.js 16.9.0 or higher
- Discord Bot Token
- FACEIT API Key
- Discord Server with Manage Roles permission

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/faceit-elo-checker.git
   cd faceit-elo-checker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your tokens and IDs
   ```

4. **Set up FACEIT level roles**
   ```bash
   npm run setup
   ```

5. **Start the bot**
   ```bash
   npm start
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
DISCORD_TOKEN=your_discord_bot_token_here
FACEIT_API_KEY=your_faceit_api_key_here
GUILD_ID=your_discord_server_id_here
NODE_ENV=production
LOG_LEVEL=info
```

### Bot Configuration

Edit `src/config/config.js` to customize:

- **Command prefix** (default: `!elo`)
- **Allowed role name** (default: `ELO Bot User`)
- **API timeouts and retry settings**

## 🎯 Usage

### Commands

- `!elo <username>` - Updates your Discord role based on FACEIT ELO

### Example
```
!elo YourFaceitUsername
```

The bot will:
1. Fetch your CS2 ELO from FACEIT
2. Determine your FACEIT level (1-10)
3. Assign the appropriate colored role
4. Remove any old ELO/level roles

### FACEIT Level System

| Level | Color | ELO Range |
|-------|-------|-----------|
| 1 | Gray | 0-500 |
| 2-3 | Green | 501-900 |
| 4-7 | Gold | 901-1750 |
| 8-9 | Orange | 1531-2000 |
| 10 | Red | 2001+ |

## 🤖 Discord Bot Setup

1. **Create a Discord Application**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application
   - Go to "Bot" section and create a bot
   - Copy the bot token for your `.env` file

2. **Invite Bot to Server**
   - Go to "OAuth2" > "URL Generator"
   - Select scopes: `bot`
   - Select permissions: `Send Messages`, `Read Messages`, `Manage Roles`
   - Use the generated URL to invite the bot

3. **Important**: Ensure the bot's role is positioned **above** the roles it needs to manage

## 🔑 FACEIT API Setup

1. Go to [FACEIT Developer Portal](https://developers.faceit.com/)
2. Create an account and generate an API key
3. Add the API key to your `.env` file

## 🎭 Role Permissions

Configure who can use the bot by creating a role named `"ELO Bot User"` (or customize in config) and assigning it to users.

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the bot |
| `npm run setup` | Generate all FACEIT level roles |
| `npm run fix-colors` | Fix existing role colors |
| `npm run logs` | View live logs |

## 🏗️ Project Structure

```
faceit-elo-checker/
├── src/
│   ├── bot/           # Main bot logic
│   ├── config/        # Configuration management
│   ├── services/      # Business logic (FACEIT API, Role management)
│   └── utils/         # Utilities (logging)
├── scripts/           # Setup and maintenance scripts
├── docs/             # Documentation
├── logs/             # Application logs
└── package.json      # Project configuration
```

## 🔧 Development

### Error Handling

The bot includes comprehensive error handling:
- **API Retry Logic** - Automatic retries with exponential backoff
- **User-Friendly Messages** - Clear error feedback
- **Structured Logging** - Detailed error context for debugging

### Adding Features

1. **New Services** - Add to `src/services/`
2. **Configuration** - Update `src/config/config.js`
3. **Utilities** - Add to `src/utils/`

## 🐛 Troubleshooting

### Common Issues

1. **"Used disallowed intents"**
   - Enable "Message Content Intent" in Discord Developer Portal

2. **"Missing required environment variables"**
   - Ensure all variables in `.env.example` are set in `.env`

3. **"Permission denied" for role management**
   - Ensure bot role is above target roles in Discord hierarchy
   - Check bot has "Manage Roles" permission

4. **"No FACEIT profile found"**
   - Verify the username is correct
   - Ensure the player has CS2 statistics

### Logs

Check `logs/error.log` and `logs/combined.log` for detailed error information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [FACEIT](https://www.faceit.com/) for providing the API
- [Discord.js](https://discord.js.org/) for the Discord library
- [Winston](https://github.com/winstonjs/winston) for logging

## 📞 Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#🐛-troubleshooting)
2. Look through existing [GitHub Issues](https://github.com/yourusername/faceit-elo-checker/issues)
3. Create a new issue with detailed information

---

⭐ **If this project helped you, please give it a star!** ⭐
