---
name: skill-creator
description: Create new skills, modify and improve existing skills, and measure skill performance
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
- **compatibility**: Required tools, dependencies
- **the rest of the skill**

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

- `npx skills init <skill-name>` - Create new skill
- `npx skills add <package>` - Install skill
- `npx skills check` - Check for updates
- `npx skills update` - Update skills