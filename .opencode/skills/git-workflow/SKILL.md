---
name: git-workflow
description: Git workflow for the beautyofcloud-2 project. Use when syncing branches, resolving conflicts, committing, pushing, or coordinating between team member branches (Dharaka, Hansana, Niduka, Senidu, chamodi).
compatibility: opencode
version: "1.0.0"
license: MIT
---

# Git Workflow — Beauty of Cloud 2.0

This skill defines the Git conventions for the `beautyofcloud-2` open-source project — Sri Lanka's first student-led inter-university cloud ideathon, second edition.

## Branch Strategy

The repo uses a **personal branch per team member** off a shared `main`:

| Branch    | Owner   |
|-----------|---------|
| `main`    | Shared production branch |
| `Dharaka` | Dharaka's feature branch |
| `Hansana` | Hansana's feature branch |
| `Niduka`  | Niduka's feature branch  |
| `Senidu`  | Senidu's feature branch  |
| `chamodi` | Chamodi's feature branch |

**Rule**: Never commit directly to another member's branch. Always branch off `main` for new features, then PR into `main`.

---

## Standard Workflow

### Step 1 — Sync with origin/main before any work

```bash
git fetch origin
git status                        # confirm current branch
git pull origin main --rebase     # pull latest, rebase local commits on top
```

> **Why rebase vs merge?** Rebase produces a linear history, which is easier to read in this team project.

### Step 2 — Resolve Conflicts (if any)

If a rebase conflict occurs:

```bash
# Git will pause and list conflicting files
git status                        # see which files conflict

# Open and resolve each file — look for <<<<<<< HEAD markers
# After resolving:
git add <resolved-file>
git rebase --continue             # proceed with rebase

# If you want to abort:
git rebase --abort
```

For merge-strategy conflicts in skill files or config, **prefer the remote version** unless local changes are intentional.

### Step 3 — Commit with Conventional Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short description>

[optional body]
[optional footer]
```

**Types:**

| Type       | Use case                                      |
|------------|-----------------------------------------------|
| `feat`     | New feature or page                           |
| `fix`      | Bug fix                                       |
| `chore`    | Tooling, configs, skills, dependencies        |
| `docs`     | Documentation only                            |
| `refactor` | Code restructure without feature change       |
| `style`    | Formatting, no logic change                   |
| `test`     | Adding or fixing tests                        |
| `ci`       | CI/CD pipeline changes                        |

**Examples:**
```bash
git commit -m "feat(register): add delegate registration form with Firebase"
git commit -m "chore(skills): add git-workflow and remotion skills"
git commit -m "fix(admin): correct attendance export date formatting"
```

### Step 4 — Push

```bash
git push origin main              # push to shared main
# or for personal branches:
git push origin <your-branch>
```

---

## Pulling from Main When Behind

When your local branch is behind `origin/main`:

```bash
git fetch origin
git log HEAD..origin/main --oneline   # see what's ahead on remote
git pull origin main --rebase         # sync up
```

If fast-forward only is needed (no local commits):

```bash
git pull origin main --ff-only
```

---

## Merging a Feature Branch into Main

```bash
git checkout main
git pull origin main              # ensure main is fresh
git merge --no-ff <feature-branch> -m "feat: merge <feature> into main"
git push origin main
```

---

## Handling the .opencode/skills Directory

- Skills live at `.opencode/skills/<skill-name>/SKILL.md`
- Always commit skill additions/changes with `chore(skills): ...`
- Never auto-generate skills without running `npx skills check` first
- After adding skills via `npx skills add`, commit the result immediately

```bash
npx skills add <url> --skill <name>
git add .opencode/skills/
git commit -m "chore(skills): add <name> skill"
git push origin main
```

---

## Security Rules for This Open-Source Repo

> [!CAUTION]
> This project is **open-source**. Never commit:
> - Firebase credentials or API keys (use `.env.local` — already in `.gitignore`)
> - Any `serviceAccountKey.json` or Google credentials
> - Personal data or delegate PII
> - Admin passwords or session secrets

Use environment variables for all sensitive values. See `src/firebase/config.ts` for the pattern.

---

## Conflict Resolution Priority

| File type                   | Resolve strategy                        |
|-----------------------------|-----------------------------------------|
| `src/types/index.ts`        | Manually merge — types are shared       |
| `src/firebase/api.ts`       | Keep both changes, combine carefully    |
| `.opencode/skills/*.md`     | Prefer latest (remote or local by date) |
| `package.json`              | Merge deps manually, run `npm install`  |
| `src/app/**`                | Coordinate with file owner's branch     |

---

## Quick Reference Cheatsheet

```bash
# Sync
git fetch origin && git pull origin main --rebase

# New feature
git checkout -b feat/my-feature
# ... work ...
git add . && git commit -m "feat(scope): description"
git push origin feat/my-feature

# Check skill versions
npx skills check

# Update all skills
npx skills update
```
