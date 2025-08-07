# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes             |

## Reporting a Vulnerability

We take the security of our software seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please send an email to: [your-security-email@domain.com]

Include the following information:
- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### What to Expect

- **Response Time**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Investigation**: We will investigate and validate the issue within 5 business days
- **Updates**: We will keep you informed of our progress throughout the process
- **Resolution**: We aim to patch verified vulnerabilities within 30 days

### Security Best Practices

When using this bot:

1. **Environment Variables**: Never commit `.env` files or expose API keys
2. **Bot Permissions**: Grant only necessary Discord permissions
3. **Role Hierarchy**: Ensure bot role is positioned correctly in Discord
4. **Updates**: Keep dependencies updated to latest secure versions
5. **Monitoring**: Monitor logs for suspicious activity

### Known Security Considerations

- **API Keys**: FACEIT API keys and Discord tokens must be kept secure
- **Rate Limiting**: The bot implements rate limiting to prevent API abuse
- **Input Validation**: All user inputs are validated before processing
- **Error Handling**: Sensitive information is not exposed in error messages

### Scope

This security policy applies to:
- The main bot application code
- Configuration and setup scripts
- Dependencies and third-party libraries

### Out of Scope

The following are outside the scope of this policy:
- Social engineering attacks
- Physical attacks
- Attacks requiring physical access to the hosting environment
- Issues in third-party services (Discord, FACEIT)

## Security Updates

Security updates will be:
- Released as patch versions (e.g., 1.0.1)
- Documented in CHANGELOG.md
- Announced through GitHub releases
- Tagged with `security` label

Thank you for helping keep our project secure! 🔒
