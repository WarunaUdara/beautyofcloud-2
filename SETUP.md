# ⚡ Quick Setup Guide

## Local Development Setup (5 minutes)

### 1. Install Dependencies
```bash
bun install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local and add your Firebase credentials
```

### 3. Start Development Server
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

## Common Commands

```bash
# Development
bun dev          # Start dev server

# Production
bun run build    # Build for production
bun start        # Run production build locally

# Quality
bun run lint     # Run ESLint + TypeScript checks

# Deployment
# See DEPLOYMENT.md for Vercel setup
```

## Project Structure

- **`/src/app/admin`** - Admin dashboard (protected routes)
- **`/src/app/register`** - Public registration pages
- **`/src/firebase`** - Firebase config & API
- **`/src/components`** - Reusable React components
- **`/src/context`** - React Context providers
- **`/src/types`** - TypeScript interfaces
- **`/src/utils`** - Utility functions

## Key Files

- `DEPLOYMENT.md` - 📝 Complete deployment guide
- `PROJECT_GUIDE.md` - 📖 Architecture & best practices
- `README.md` - 📚 Project overview
- `.env.example` - 🔐 Environment variables template

## Troubleshooting

**Q: Build fails with "Missing environment variables"**
A: Ensure `.env.local` has all Firebase credentials from `.env.example`

**Q: ESLint errors on push**
A: Run `bun run lint` and fix errors before committing

**Q: Changes not reflecting?**
A: Stop dev server (`Ctrl+C`) and restart with `bun dev`

## Next: Deploy to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step Vercel deployment instructions.

---

Happy coding! 🚀
