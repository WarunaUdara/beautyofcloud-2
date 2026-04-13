---
name: firebase-basics
description: The foundational skill for any Firebase task - covers setup, authentication, project management, CLI commands, and troubleshooting
compatibility: opencode
---

# Prerequisites

Complete these setup steps before proceeding:

1. **Local Environment Setup:**
   - Run `npx -y firebase-tools@latest --version` to check if Firebase CLI is installed.
   - If missing, install Node.js >= 20 then run: `npm install -g firebase-tools`

2. **Authentication:**
   Run `npx -y firebase-tools@latest login`. For remote environments, use `npx -y firebase-tools@latest login --no-localhost`.

3. **Active Project:**
   Check current project with `npx -y firebase-tools@latest use`. If none active:
   - For existing project: `npx -y firebase-tools@latest use --add <PROJECT_ID>`
   - For new project: `npx -y firebase-tools@latest projects:create <project-id> --display-name "<display-name>"`

# Firebase Usage Principles

1. **Use npx for CLI commands:** Always use `npx -y firebase-tools@latest` instead of just `firebase`.
2. **Prioritize official knowledge:** For Firebase-related questions, search documentation before web search.
3. **Follow Agent Skills:** Use skills for opinionated workflows and best practices.
4. **Use Firebase MCP Server:** When interacting with remote Firebase APIs, use MCP tools instead of direct API calls.

# Common Commands

```bash
# Version check
npx -y firebase-tools@latest --version

# Help
npx -y firebase-tools@latest --help
npx -y firebase-tools@latest [command] --help

# Initialize
npx -y firebase-tools@latest init

# Deploy
npx -y firebase-tools@latest deploy

# Check active project
npx -y firebase-tools@latest use
```

# Common Issues

- **Login Issues:** If browser fails, use `npx -y firebase-tools@latest login --no-localhost`
- **Node.js Issues:** Ensure Node.js >= 20 is installed