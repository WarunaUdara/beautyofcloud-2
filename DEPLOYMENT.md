# 🚀 Deployment Guide - Beauty of Cloud 2.0

This guide covers deploying the Beauty of Cloud 2.0 project to Vercel.

## Prerequisites

- GitHub account with push access to the repository
- Vercel account (free tier is sufficient)
- Firebase project set up with API credentials

## Environment Variables Setup

### 1. Local Development (`.env.local`)

Copy `.env.example` to `.env.local` and fill in your Firebase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Important:** `.env.local` is git-ignored and should NEVER be committed.

### 2. Vercel Deployment

#### Step 1: Connect Repository to Vercel

1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import the GitHub repository
4. Select the project root folder (the one with `package.json`)

#### Step 2: Configure Environment Variables

1. In Vercel Project Settings → Environment Variables
2. Add all Firebase environment variables from `.env.example`:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

**Note:** Since these variables are prefixed with `NEXT_PUBLIC_`, they are safe to expose publicly (they're embedded in the browser bundle).

#### Step 3: Deploy

Vercel automatically deploys when you push to the main branch. No additional configuration needed!

- **Git Integration**: Push to `main` branch → Auto-deploy
- **Preview Deployments**: Create a pull request → Vercel creates preview URLs
- **Rollback**: Use Vercel dashboard to redeploy any previous version

## Build Configuration

The project is configured via:

- **`vercel.json`**: Specifies build & output directories
- **`next.config.ts`**: Next.js specific configuration
- **`tsconfig.json`**: TypeScript strict mode enabled
- **`eslint.config.mjs`**: Code quality checks (runs during build)

## Pre-Deployment Checklist

- [ ] All environment variables are set in Vercel project settings
- [ ] ESLint passes: `bun run lint`
- [ ] Build succeeds: `bun run build`
- [ ] No TypeScript errors: `bun run build` (includes type checking)
- [ ] All commits are pushed to `main` branch
- [ ] `.env.local` is NOT committed (check `.gitignore`)

## Commands

```bash
# Development
bun dev                 # Start dev server on http://localhost:3000

# Build for production
bun run build          # Creates optimized build in .next/

# Lint code
bun run lint           # ESLint + TypeScript checks

# Production server (local testing)
bun start              # Runs the production build locally
```

## Monitoring & Debugging

### Vercel Logs

1. Go to Vercel Dashboard → Your Project
2. Click "Deployments" tab
3. Click on a deployment to view:
   - Build logs
   - Runtime logs
   - Request analytics

### Firebase Console
- Monitor Firestore usage: [Firebase Console](https://console.firebase.google.com)
- Check Auth logs and user activity
- Review Storage usage and bandwidth

## Performance Optimization

- **Image Optimization**: Configured in `next.config.ts` for remote images
- **Code Splitting**: Next.js automatically code-splits routes
- **Caching**: Vercel's global CDN caches static assets
- **Database**: Firestore is fully managed by Google

## Rollback

If deployment has issues:

1. Go to Vercel Dashboard → Deployments
2. Find the previously working deployment
3. Click "Redeploy" button
4. Choose "Without build cache" if needed

## Security Notes

- ✅ Firebase API keys are public (browserscope)
- ✅ `.env.local` is git-ignored
- ✅ No secrets should be committed to the repository
- ✅ Use Firebase Security Rules for data protection
- ⚠️ Always enable HTTPS (Vercel provides this by default)

## Troubleshooting

### Build fails with "Missing environment variables"

**Solution**: Ensure all `NEXT_PUBLIC_*` variables are set in Vercel project settings.

### "Cannot find module" errors

**Solution**: Run `bun install` locally and verify `package.json` is committed.

### Linting errors prevent deployment

**Solution**: Run `bun run lint` locally and fix all errors before pushing.

### Blank pages or 404 errors

**Solution**: 
1. Check browser console for errors
2. Verify Firebase credentials in environment variables
3. Check Vercel build logs for TypeScript errors

---

For more info, see:
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)
