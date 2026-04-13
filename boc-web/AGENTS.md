# 🤖 AI Agent Quick-Start Guide

Welcome to **Beauty of Cloud 2.0** — Sri Lanka's first student-led inter-university cloud ideathon, second edition.

Before writing any code or modifying the structure, please read **[`PROJECT_GUIDE.md`](./PROJECT_GUIDE.md)**.

---

## 🔑 Key Rules

1. **Scoped Layouts**: Admin data (Tasks/Meetings) is restricted to `/admin/layout.tsx`. Do NOT move these providers to the root layout without specific instructions.
2. **Centralized Types**: All data interfaces MUST be imported from `@/types`.
3. **Firebase API**: Use the exported CRUD methods in `src/firebase/api.ts` rather than writing raw queries in components.
4. **Aesthetics**: Maintain the premium **Glassmorphism** design language on all new pages.

---

## 🧠 Agent Runtime: OpenCode

This project is configured for the **OpenCode** agent runtime.

### Skills Available

Skills are located in `.opencode/skills/`. Always load the relevant skill before working:

| Skill | Load When |
|-------|-----------|
| `git-workflow` | Syncing branches, committing, resolving conflicts |
| `firebase-basics` | Working with Firestore, Auth, or Firebase config |
| `frontend-design` | Building new pages or UI components |
| `next-best-practices` | Writing Next.js App Router code |
| `vercel-react-best-practices` | Deploying or configuring Vercel |
| `remotion-best-practices` | Any Remotion video/animation work |
| `skill-creator` | Creating or updating agent skills |

### Environment Setup

- Node.js v22 (via Homebrew at `/opt/homebrew/opt/node@22/bin`)
- Next.js 16 with Turbopack (`npm run dev`)
- Tailwind CSS v4
- Firebase v12
- Remotion + @remotion/player installed

> **If npx is not found**: Use `PATH="/opt/homebrew/opt/node@22/bin:$PATH" npx ...`

---

## 🔐 Security — CRITICAL for Open-Source

This repo is **publicly open-source**. Never commit:
- Firebase API keys or credentials (use `.env.local`)
- Google service account JSON files
- Delegate personal data or PII
- Admin passwords or session tokens

All secrets belong in `.env.local` which is in `.gitignore`.

---

## 🌿 Git Workflow

See `.opencode/skills/git-workflow/SKILL.md` for full details. Quick summary:

```bash
# Sync before any work
git fetch origin && git pull origin main --rebase

# Commit with conventional commits
git commit -m "feat(scope): description"

# Push
git push origin main
```

Team branches: `Dharaka`, `Hansana`, `Niduka`, `Senidu`, `chamodi`

---

Happy coding! 🚀
