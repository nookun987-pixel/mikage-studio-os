# Mikage — Repo Read Checklist

This checklist is mandatory before any coding task.

The agent must complete this reading phase before creating, modifying, or deleting files.

---

## 1. Execution Rule

Do not implement immediately.

Required order:

1. read root workspace files
2. read target package files
3. verify contracts
4. verify exports
5. verify wiring
6. identify exact files to modify
7. only then implement

If a required file is missing, stop and request it.

Do not guess.

---

## 2. Root Files (Always Read First)

Read these files before touching any package:

- `package.json`
- `tsconfig.base.json`
- `pnpm-workspace.yaml`
- `turbo.json`

Purpose:

- understand workspace scripts
- understand TypeScript path aliases
- understand workspace package inclusion
- understand pipeline/build expectations

---

## 3. Target Package Read Order

For every target package, read in this exact order:

1. `packages/<target>/package.json`
2. `packages/<target>/tsconfig.json`
3. `packages/<target>/src/index.ts`
4. `packages/<target>/src/contracts.ts` if present
5. implementation files directly involved in the task

Do not assume package structure from other packages.

---

## 4. Public API Verification

Before changing code, verify:

- what the package exports today
- whether consumers depend on those exports
- whether the task requires adding new exports
- whether changing exports will break other packages

Never assume public API.

Always inspect `src/index.ts`.

---

## 5. Contract Verification

Before changing behavior, verify:

- input DTOs
- output DTOs
- result object shapes
- error object shapes
- discriminated unions
- enums and string literal types

Never invent contract fields.

Never silently rename contract fields.

If contract change is required, explicitly report:

- contract file
- reason
- affected packages
- required export updates

---

## 6. Workspace Wiring Verification

Before creating a new package or new path alias, verify:

- package is included by workspace config
- root path aliases exist or need update
- build pipeline knows about the package
- package naming matches repo convention
- script wiring is consistent with existing packages

Do not create packages without full wiring.

---

## 7. Dependency Verification

Before importing any external dependency, verify:

- dependency already exists
- dependency belongs in target package
- dependency pattern matches repo style
- task actually requires the dependency

Do not add random dependencies.

Do not duplicate existing utilities.

---

## 8. Existing Pattern Verification

Before implementing, inspect at least one similar package or file to confirm:

- naming conventions
- file layout
- type style
- error handling style
- result formatting style
- export style

Prefer repo consistency over personal preference.

---

## 9. Required Pre-Implementation Summary

Before coding, the agent must be able to state clearly:

- exact files read
- exact files to change
- whether contract changes are needed
- whether export changes are needed
- whether workspace wiring changes are needed
- what validation will be run

If this cannot be stated clearly, implementation must not begin.

---

## 10. No-Assumption Rules

The agent must not:

- invent files
- invent contracts
- invent exports
- invent types
- invent path aliases
- invent scripts
- invent build steps
- assume missing code exists

If uncertain, stop and request the relevant file.

---

## 11. Mikage-Specific Safety Rules

The agent must preserve pipeline order:

context
→ narrative
→ canon validation
→ production package
→ generation
→ benchmark

Do not bypass canonical order.

Do not add shortcuts that skip validation layers.

Do not implement generation-facing behavior that loses lineage.

---

## 12. Asset and Lineage Awareness

Any task that touches generation, packaging, benchmark, or asset handling must verify whether these are preserved:

- asset lineage
- source prompt
- model identifier
- seed
- reference inputs
- package identity
- validation metadata

Do not produce code that weakens traceability.

---

## 13. Completion Gate Before Coding

Do not start implementation until all of the following are true:

- root files were read
- target package files were read
- contracts were verified
- exports were verified
- wiring was verified
- similar repo pattern was inspected
- exact change scope is known

If any item is false, do not implement.