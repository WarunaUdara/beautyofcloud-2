# 🚀 Beauty of Cloud - Project Architecture Guide (for AI Agents)

This document serves as the "Source of Truth" for any AI agent or developer working on this project. It outlines the core architecture, security patterns, and where to find key files.

---

## 🏗️ Core Directory Structure

- **`/src/app`**: Next.js 16 (Turbopack) - App Router.
  - **`/admin`**: The admin dashboard (Task Tracking, Attendance).
  - **`/register`**: Public-facing delegate registration (Session-based).
- **`/src/context`**: React Context providers for global state management.
- **`/src/firebase`**: All Firebase integration logic (Config & API).
- **`/src/types`**: Centralized TypeScript interfaces.
- **`/src/utils`**: Global utility functions (Excel exports, formatting).

---

## 🔐 Security & Provider Architecture (Crucial)

We use a **Scoped Layout Pattern** to ensure data isolation:

1.  **`AuthProvider` (Global)**: Located in `src/app/layout.tsx`. Provides the `user` object for authentication state across the entire app.
2.  **`DataProvider` (Scoped)**: Located in `src/app/admin/layout.tsx`. Contains internal "Admin" data (Tasks, Meetings, Team Members). 
    - **Security Rule**: By scoping it to `/admin`, the data logic is **never loaded** for delegates on the public `/register` pages.

---

## 🛠️ Key Files to Remember

### 1. Data Types
- **Path**: `src/types/index.ts`
- **Rule**: All major interfaces (`Task`, `TeamMember`, `Meeting`, `Quiz`, `QuizSubmission`) MUST be defined here and shared across the project. Do NOT define local versions of these types.

### 2. Firestore API & Config
- **Path**: `src/firebase/api.ts` (Firestore CRUD)
- **Collections**: `tasks`, `team_members`, `meetings`, `quizzes`, `quiz_submissions`.
- **Instruction**: Use the exported functions (e.g., `getTasks`, `addMeeting`) instead of writing raw Firestore queries in your components.

### 3. Navigation & Routing
- **Admin Dashboard**: `/admin`
- **Task Tracking**: `/admin/task-tracking`
- **Attendance**: `/admin/attendance` (**HIDDEN ROUTE**).
- **Quiz Management**: `/admin/quiz` (**HIDDEN ROUTE**).
- **Delegate Quiz Selection**: `/quiz`
- **Leaderboard**: `/leaderboard`

---

## 🎨 UI & Design Language

- **Aesthetic**: Premium Glassmorphism.
- **Colors**: Deep dark backgrounds (`#030712`), cyan accents for tasks, indigo/purple for session registrations, emerald for attendance.
- **Libraries**: Lucide-React for icons, Framer-Motion for animations, Tailwind CSS for styling.

---

## 📥 Export Utility
- **Path**: `src/utils/excel-export.ts`
- **Capability**: Exports both Tasks and Attendance Records to `.xlsx` files using the `xlsx` library.

---

> [!TIP]
> **Working with this project**: Always prioritize type safety and follow the established "Actions" pattern in the pages. Do not add sensitive admin providers to the root `layout.tsx` unless authentication logic requires it for the whole app.

---

## 🎬 Remotion Integration

Remotion (`remotion` + `@remotion/player`) is installed for creating animated video content (promotional videos, highlight reels, etc.).

- **When to use**: Event promotions, ideathon highlight videos, animated announcements.
- **Skill**: Always load `.opencode/skills/remotion-best-practices/SKILL.md` before working with Remotion.
- **Compositions**: Should live in `src/remotion/` (create this directory when needed).
- **Player**: Use `@remotion/player` to embed video previews in the web app.
- **Preview**: `PATH="/opt/homebrew/opt/node@22/bin:$PATH" npx remotion studio`

> [!CAUTION]
> Do NOT render video files (`.mp4`) to the `public/` folder — they are too large for Git. Use Remotion Lambda or download URLs instead.

---

## 🤖 Agent Development Context (OpenCode)

### Runtime
- **Agent**: OpenCode
- **Skills dir**: `.opencode/skills/`
- **Config**: `.opencode/` at project root

### Available Skills

| Skill | Trigger |
|-------|---------|
| `git-workflow` | Git operations, branching, conflict resolution |
| `firebase-basics` | Firebase/Firestore CRUD operations |
| `frontend-design` | UI components, pages, aesthetics |
| `next-best-practices` | Next.js App Router patterns |
| `vercel-react-best-practices` | Vercel deployment config |
| `remotion-best-practices` | Video/animation with Remotion |
| `skill-creator` | Create or update skills |

### Missing What to Add For Full Agent Coverage

The following are recommended to add for complete agent support:

1. **`typescript-patterns`** — Project-specific TS patterns (Zod, strict types)
2. **`tailwind-v4`** — Tailwind CSS v4 (new API, different from v3)
3. **`env-setup`** — `.env.local` variable names (safe to commit without values)
4. **`testing`** — If/when Jest or Playwright is added

### Node.js Environment
- **Version**: v22.22.0
- **Manager**: Homebrew (`/opt/homebrew/opt/node@22/bin`)
- **Package manager**: npm (also bun.lock present — both work)
- **If `npx` not in PATH**: `PATH="/opt/homebrew/opt/node@22/bin:$PATH" npx ...`

---

## 🔐 Open-Source Security Checklist

This is a **publicly open-source** repository. Before every commit:

- [ ] No `.env.local` or `.env` files staged
- [ ] No `firebase-adminsdk-*.json` or service account files
- [ ] No hardcoded API keys in source code
- [ ] No delegate personal data (names, emails, NIC numbers) in code

Firebase client credentials in `src/firebase/config.ts` are **safe to commit** (they are protected by Firestore Security Rules, not by secrecy).

> [!WARNING]
> The `xlsx` package (v0.18.5) has a known high-severity vulnerability. It is used only server-side for Excel export. Upgrade to `exceljs` when time permits.
