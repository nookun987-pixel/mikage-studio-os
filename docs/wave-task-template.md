# Mikage — Wave Task Template

Use this template for every wave or implementation task given to a coding agent.

The template is designed to prevent guessing, repo drift, missing files, and incomplete outputs.

---

## TASK TITLE

`Wave <number> — <name>`

Example:

`Wave 11 — Provider Registry`

---

## OBJECTIVE

State the exact implementation goal in one short paragraph.

Example structure:

Implement the provider registry layer for Mikage. The package must register provider adapters through explicit typed contracts, expose a stable public API through `src/index.ts`, and integrate with existing workspace conventions without changing unrelated packages.

---

## TASK TYPE

Choose one:

- new package
- package extension
- bug fix
- refactor
- contract-safe integration
- validation-only task

---

## READ FIRST (MANDATORY)

List the exact files the agent must read before coding.

### Root
- `package.json`
- `tsconfig.base.json`
- `pnpm-workspace.yaml`
- `turbo.json`

### Target package files
- `packages/<target>/package.json`
- `packages/<target>/tsconfig.json`
- `packages/<target>/src/index.ts`
- `packages/<target>/src/contracts.ts`

### Related dependency files
- `packages/<related>/src/index.ts`
- `packages/<related>/src/contracts.ts`

Do not start implementation until these files are read.

---

## CHANGE SCOPE

State exactly what is allowed.

Example:

Allowed changes:
- create `packages/provider-registry/package.json`
- create `packages/provider-registry/tsconfig.json`
- create `packages/provider-registry/src/contracts.ts`
- create `packages/provider-registry/src/registry.ts`
- create `packages/provider-registry/src/index.ts`
- update root `package.json`
- update root `tsconfig.base.json`

Keep this list explicit.

---

## FORBIDDEN CHANGES

State exactly what is not allowed.

Example:

Forbidden:
- do not change existing contracts outside target scope
- do not rename exports in existing packages
- do not modify runtime hosts unless explicitly listed
- do not introduce new external dependencies
- do not create additional packages
- do not bypass canon / benchmark / lineage flow
- do not use `any`
- do not use unsafe type assertions to hide errors

---

## REQUIRED BEHAVIOR

State the behavioral requirements.

Example structure:

The implementation must:
- follow existing repo naming patterns
- preserve type safety
- expose a clear public API
- avoid speculative abstractions
- remain boundary-oriented
- keep DTOs explicit
- keep contracts stable unless task explicitly allows change

---

## CONTRACT RULE

Pick one and state it explicitly:

### Option A — Contract-safe
No contract changes allowed.

### Option B — Contract-aware
Contract changes are allowed only if explicitly reported first, with:
- reason
- affected packages
- required export updates

---

## OUTPUT FORMAT (MANDATORY)

The agent must return results in this exact order:

1. `Changed Files`
2. `New Files`
3. full contents of every new file
4. full contents of every modified file
5. validation commands executed
6. validation results
7. short implementation notes

Do not return patch fragments unless explicitly requested.

If a modified file changed, output the full file.

---

## IMPLEMENTATION RULES

The agent must:

- inspect before editing
- implement only within allowed scope
- avoid hidden assumptions
- keep exports explicit
- keep contracts deterministic
- keep file names aligned with repo conventions

The agent must not:

- improvise missing architecture
- silently widen scope
- change unrelated packages
- hide uncertainty
- pretend validation passed if it did not

---

## VALIDATION COMMANDS

List the exact commands that must be run.

Minimum:

- `pnpm typecheck`

Optional depending on repo state:

- `pnpm build`
- `pnpm test`
- `pnpm smoke`
- `pnpm smoke:<wave>`
- package-specific validation script

If a command fails, report the exact failure.

Do not claim completion while validation fails.

---

## ERROR HANDLING RULE

If blocked, the agent must report:

- missing file
- missing contract context
- export conflict
- type mismatch root cause
- workspace wiring issue

Do not continue with guesses.

---

## REVIEW TARGET

State what the reviewer should verify.

Example:

Reviewer must verify:
- package shape matches repo conventions
- public exports are correct
- no forbidden files were changed
- typecheck passes
- implementation matches objective
- no hidden contract drift was introduced

---

## ACCEPTANCE CRITERIA

Write concrete criteria only.

Example:

- package exists and is wired into workspace
- public API exports compile
- contracts are explicit and typed
- root typecheck passes
- no unrelated package was modified
- implementation matches described scope

---

## REQUIRED RESPONSE TEMPLATE

The agent should answer using this structure:

### Changed Files
- `<file>`
- `<file>`

### New Files
- `<file>`
- `<file>`

### Full File Contents

#### FILE: `<path>`
```ts
<full file content>