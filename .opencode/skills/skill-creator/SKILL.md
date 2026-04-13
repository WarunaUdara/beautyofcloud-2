---
name: skill-creator
description: Create new skills, modify and improve existing skills, and measure skill performance
compatibility: opencode
---

# Skill Creator

A skill for creating new skills and iteratively improving them.

## Creating a Skill

### Step 1: Capture Intent

Start by understanding the user's intent:
1. What should this skill enable Claude to do?
2. When should this skill trigger? (what user phrases/contexts)
3. What's the expected output format?
4. Should we set up test cases to verify the skill works?

### Step 2: Interview and Research

Proactively ask questions about:
- Edge cases
- Input/output formats
- Example files
- Success criteria
- Dependencies

### Step 3: Write the SKILL.md

Based on user interview, fill in:

- **name**: Skill identifier (lowercase, alphanumeric with hyphens)
- **description**: When to trigger, what it does (primary triggering mechanism)
- **compatibility**: The agent runtime this skill targets (e.g. `opencode`, `claude`, `cursor`). Omit only if the skill is runtime-agnostic.
- **user-invocable**: Set to `false` when the skill should only be loaded by the agent internally, not surfaced to the user.
- **version** *(optional)*: Semantic version of the skill (e.g. `1.0.0`).
- **Markdown body**: Step-by-step instructions the agent must follow, organised into clearly labelled sections. Include concrete examples, expected inputs/outputs, and edge-case handling.

### Anatomy of a Skill

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description required)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/    - Executable code
    ├── references/ - Docs loaded as needed
    └── assets/     - Files used in output
```

### Writing Style

- Prefer imperative form in instructions
- Explain the **why** behind things
- Keep SKILL.md under 500 lines
- Use examples where helpful

## Testing and Iteration

### Test Cases

Create 2-3 realistic test prompts - the kind real users would say. Run them with the skill and without to compare.

### Evaluation

1. Run test cases with skill and without
2. Compare outputs qualitatively
3. Identify what improved
4. Improve skill based on feedback

### The Iteration Loop

1. Apply improvements to the skill
2. Rerun test cases
3. Compare results
4. Repeat until satisfied

## Key Commands

- `npx skills init <skill-name>` - Scaffold a new skill directory with a starter `SKILL.md`
- `npx skills add <owner/repo@skill>` - Install a published skill from GitHub
- `npx skills check` - List installed skills and whether updates are available
- `npx skills update` - Pull the latest version of all installed skills

## Version & Local Installation Check

Before referencing or updating any skill, verify both the **published** version *and* the **locally installed** version:

```bash
# 1. Check the locally installed skills list
npx skills check

# 2. Confirm the skill directory exists on disk
ls .opencode/skills/<skill-name>/SKILL.md

# 3. Only then compare against remote (e.g. skills.sh) for upgrade decisions
```

> **Why**: `npx skills check` reports remote metadata but does not verify that the skill files are actually present locally. Always confirm the directory exists before assuming a skill is usable.

## How Many Rules Does a Skill Typically Define?

There is no fixed rule count — quality over quantity. A well-structured skill typically contains:

- **3–15 actionable sections** covering distinct phases (e.g., research → implement → verify)
- Each section should contain **2–8 concrete rules or steps**
- If you claim a specific count (e.g., "this skill enforces 12 coding rules"), make sure the listed items match that exact count to avoid confusion.

## Frontmatter Reference

Every `SKILL.md` must open with a YAML frontmatter block. Here is a complete example with all supported fields:

```yaml
---
name: my-skill                  # required — lowercase, alphanumeric with hyphens
description: |                  # required — triggers and purpose (primary loading mechanism)
  Use when the user asks about X or wants to do Y.
compatibility: opencode         # recommended — agent runtime target (opencode | claude | cursor)
version: "1.0.0"                # optional — semantic version
user-invocable: false           # optional — set false to hide from user-facing skill lists
license: MIT                    # optional — SPDX license identifier
---
```

> **Why `compatibility` matters**: Without this field, the agent runtime cannot filter skills to those compatible with the current environment. Always specify it unless the skill is intentionally runtime-agnostic.