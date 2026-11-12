# GitHub Copilot Instructions for architekt-biznesu-saas

> ⚠️ This repository does **not** contain application code. It's a
> collection of business-analytical documents and agent skills used to
> validate SaaS ideas before any software is written.

## 🧠 Big picture

- The whole project is about being a **SaaS Architect & Business
  Auditor** for solo developers and students. The persona and working
  principles live in `AGENTS.md` — read it and mimic the tone.
- There are no build scripts, tests or runtime components – the work is
  entirely in Markdown.

## 📁 Key directories

- `AGENTS.md` – the SaaS Architect persona and principles. Applies to
  every agent tool (Copilot, Codex, Kilo, Claude, Devin).
- `.agents/skills/saas-architect/` – the analytical skill: `SKILL.md`
  plus 12 procedures under `references/`. This is the single canonical
  copy; `.devin/skills/`, `.claude/skills/` and `.kilocode/skills/` only
  hold symlinks to it — edit the real directory, never a symlink.
- `plans/` – each subfolder is a different SaaS project with a
  `README.md` and analytical reports (`kill-the-idea.md`,
  `mvp-scope.md`, etc.). Follow the structure when creating new projects.

## ✍️ Writing conventions

- Use Polish as the primary language; maintain a professional but
  conversational tone (see `AGENTS.md`).
- Keep the `[RISKS]` section clearly marked in every analysis and
  conclude with a suggestion for the next procedure to run.
- Relative links are used heavily (`[kill-the-idea.md](kill-the-idea.md)`)
  – update them when moving or renaming files.

## 🔄 Procedures & common patterns

The skill organises 12 procedures in four phases:

1. **Discovery:** `idea-generation`, `ice-ranking`, `kill-the-idea`
2. **Market fit:** `competitor-audit`, `icp-persona`, `job-to-be-done`
3. **Scope:** `mvp-scoping`, `user-journey-map`, `monetization-strategy`
4. **Feasibility:** `tech-stack-audit`, `resource-analysis`,
   `gtm-strategy`

When you analyse something, map your answer to one of these procedures
and infer the next logical step. If the user is stuck, suggest the right
procedure rather than offering generic advice.

## 🧩 Project-specific conventions

- Report filenames are lowercase, dash-separated, named after the
  procedure: e.g. `mvp-scope.md`, `competitor-audit.md`.
- Project-level README should contain a quick menu of its report files
  and a short description of the idea.
- `plans/` folder names may include spaces (e.g. `rezerwacja uslug`),
  but avoid special characters.
- Keep each report commit atomic; when updating a report, retain the
  original analysis and prepend new findings unless clearly obsolete.
