# Contributing to FACEIT ELO Discord Bot

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/faceit-elo-checker.git
   cd faceit-elo-checker
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment** variables (see README.md)

## 🔄 Development Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards below

3. **Test your changes**:
   ```bash
   npm start
   # Test the bot functionality
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## 📝 Coding Standards

### JavaScript Style
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes
- Use **UPPER_SNAKE_CASE** for constants
- Use **semicolons** consistently
- Use **single quotes** for strings
- Maximum line length: **100 characters**

### Code Organization
- Keep functions small and focused (max 20-30 lines)
- Use meaningful variable and function names
- Add JSDoc comments for all public methods
- Separate concerns into appropriate service modules

### Example:
```javascript
/**
 * Updates user's ELO role based on FACEIT data
 * @param {GuildMember} member - Discord guild member
 * @param {number} elo - Player's ELO rating
 * @returns {Promise<void>}
 */
async function updateEloRole(member, elo) {
  // Implementation
}
```

## 🏗️ Project Structure

When adding new features, follow this structure:

```
src/
├── bot/           # Main bot logic and event handlers
├── config/        # Configuration management
├── services/      # Business logic (API calls, data processing)
└── utils/         # Shared utilities (logging, helpers)
```

### Adding New Services
1. Create new file in `src/services/`
2. Export as a class or module
3. Add comprehensive error handling
4. Include JSDoc documentation
5. Update `docs/API.md`

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description** - What went wrong?
2. **Steps to reproduce** - How can we reproduce the issue?
3. **Expected behavior** - What should have happened?
4. **Actual behavior** - What actually happened?
5. **Environment** - Node.js version, OS, etc.
6. **Logs** - Relevant error messages from `logs/error.log`

## 💡 Feature Requests

When suggesting features:

1. **Use case** - Why is this feature needed?
2. **Description** - What should the feature do?
3. **Implementation ideas** - How might it work?
4. **Alternatives** - What other solutions exist?

## 🔍 Code Review Process

All contributions go through code review:

1. **Automated checks** - Code must pass linting
2. **Manual review** - Maintainers review code quality
3. **Testing** - Changes should be tested
4. **Documentation** - Update docs if needed

### Review Criteria
- ✅ Code follows project standards
- ✅ Includes appropriate error handling
- ✅ Has meaningful commit messages
- ✅ Doesn't break existing functionality
- ✅ Includes documentation updates

## 📋 Commit Message Convention

Use conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add support for FACEIT level 11
fix: handle missing CS2 statistics gracefully
docs: update setup instructions
refactor: improve error handling in FaceitService
```

## 🚫 What NOT to Include

- **Secrets** - Never commit API keys, tokens, or passwords
- **Log files** - Don't commit `logs/*.log` files
- **Node modules** - `node_modules/` is gitignored
- **Environment files** - Don't commit `.env` files

## ❓ Questions?

If you have questions about contributing:

1. Check existing [GitHub Issues](https://github.com/yourusername/faceit-elo-checker/issues)
2. Create a new issue with the `question` label
3. Join our Discord server (if applicable)

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- CHANGELOG.md for significant contributions
- GitHub releases notes

Thank you for contributing! 🎉
