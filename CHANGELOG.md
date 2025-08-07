# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-07

### Added
- Initial release of FACEIT ELO Discord Bot
- Automatic role assignment based on FACEIT ELO ratings
- Official FACEIT level colors (1-10)
- Smart username matching with case variations
- Role-based permission system
- Comprehensive error handling and retry logic
- Professional logging with Winston
- Environment-based configuration
- Setup scripts for role generation
- Complete documentation and API reference

### Features
- `!elo <username>` command for role updates
- Automatic removal of old ELO/level roles
- Configurable command prefix and permissions
- Structured logging to files
- Production-ready error handling
- GitHub-ready project structure

### Technical
- Node.js 16.9.0+ support
- Discord.js 14.16.3 integration
- FACEIT API integration with retry logic
- Modular service architecture
- Comprehensive input validation
- Professional project organization
