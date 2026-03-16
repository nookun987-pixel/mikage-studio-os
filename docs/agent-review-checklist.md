
---

## FILE: /docs/agent-review-checklist.md

```md
# Mikage — Agent Review Checklist

Use this checklist after the implementation agent finishes and before any merge or handoff is accepted.

This checklist is mandatory.

---

## 1. Scope Review

Verify implementation stayed inside the allowed task scope.

Check:

- only allowed files were created
- only allowed files were modified
- no hidden architectural changes were introduced
- no unrelated cleanup was mixed in

Fail review if scope drift exists.

---

## 2. Read-First Compliance

Verify the agent read and respected the required files.

Check whether the result aligns with:

- root workspace configuration
- target package config
- public exports
- relevant contracts

Fail review if the implementation appears based on assumptions.

---

## 3. Contract Integrity Review

Check:

- contracts were not changed unless explicitly allowed
- DTO fields are consistent
- result shapes remain deterministic
- field names were not silently renamed
- discriminated unions remain correct
- no widened types were introduced without reason

Fail review if contract drift exists.

---

## 4. Public API Review

Check:

- `src/index.ts` exports are correct
- exported symbols match task objective
- no internal-only symbol was leaked
- consumers can import the package cleanly
- there are no missing exports for newly added files

Fail review if API is incomplete or broken.

---

## 5. Type Safety Review

Check:

- no `any`
- no unsafe type assertions hiding real problems
- no ignored errors
- no placeholder types left in place
- no fake compatibility wrappers were added

Fail review if type safety was weakened.

---

## 6. Repo Convention Review

Check consistency with repo patterns:

- package naming
- file naming
- folder structure
- contract style
- function naming
- export style
- result formatting

Prefer existing repo conventions over stylistic novelty.

Fail review if implementation breaks repo style unnecessarily.

---

## 7. Workspace Wiring Review

If the task created or wired a package, verify:

- workspace includes it correctly
- root path aliases are correct
- scripts remain valid
- build pipeline is still coherent
- package references are correct

Fail review if package exists but is not fully wired.

---

## 8. Validation Review

Verify exact commands were run and results were reported honestly.

Minimum expectation:
- `pnpm typecheck`

Also verify any required task-specific commands.

Fail review if:
- validation was skipped
- results were not reported
- failures were hidden
- completion was claimed while validation failed

---

## 9. Root Cause Review for Fixes

If the task was a bug fix or type fix, verify the agent solved the root cause.

Check:

- original mismatch identified correctly
- fix occurs at source of issue
- no superficial cast-based workaround used
- no broken downstream assumptions remain

Fail review if the fix is only cosmetic.

---

## 10. Full-File Output Review

Verify the delivery format is correct.

Check:

- every new file was output in full
- every modified file was output in full
- no patch fragments were used where full file was required
- file paths are explicit and correct

Fail review if output is incomplete.

---

## 11. Mikage Pipeline Safety Review

For any task touching pipeline behavior, verify the implementation preserves:

context
→ narrative
→ canon validation
→ production package
→ generation
→ benchmark

Check that the code does not:

- skip validation layers
- reorder required stages
- bypass canon safety
- bypass benchmark gating

Fail review if pipeline order is weakened.

---

## 12. Lineage and Reproducibility Review

For any task touching asset generation or production flow, verify preservation of:

- asset lineage
- prompt trace
- model trace
- seed trace
- reference trace
- package identity
- validation metadata

Fail review if traceability was reduced.

---

## 13. Character and Canon Safety Review

For tasks involving characters, scenes, generation, or canon state, verify:

- character state is not mutated unsafely
- canon rules remain enforceable
- asset generation does not detach from source references
- identity-critical metadata is not dropped

Fail review if canon consistency is at risk.

---

## 14. Overengineering Review

Check for unnecessary abstraction.

Watch for:

- speculative interfaces
- extra layers not required by task
- generalized helpers with no current use
- premature extensibility
- unnecessary dependency additions

Prefer minimal correct implementation.

Fail review if complexity was added without need.

---

## 15. Practical Completeness Review

Check that the implementation is actually usable.

Verify:

- package compiles
- exports are reachable
- required symbols exist
- file names match imports
- command names match scripts
- implementation can be consumed by the next wave

Fail review if code is theoretically nice but operationally incomplete.

---

## 16. Review Decision

Choose one final result only:

### APPROVE
Use only if:
- scope is correct
- contracts are safe
- exports are correct
- validation passed
- output is complete

### REQUEST CHANGES
Use if:
- implementation is close but incomplete
- validation failed
- output format is incomplete
- missing exports or wiring need correction

### REJECT
Use if:
- implementation guessed core repo structure
- contract drift was introduced
- unsafe fixes were used
- scope drift is large
- repo integrity was put at risk

---

## 17. Required Review Summary Format

Reviewer should answer in this format:

### Review Result
APPROVE / REQUEST CHANGES / REJECT

### Findings
- scope status
- contract status
- export status
- wiring status
- validation status
- output completeness status

### Required Fixes
- explicit item
- explicit item
- explicit item

### Notes
- short factual notes only

---

## 18. Fast Fail Conditions

Immediately fail review if any of these are true:

- agent guessed missing files
- agent invented contracts
- agent changed exports silently
- agent used `any` to hide issues
- agent skipped validation
- agent output partial files when full files were required
- agent changed unrelated packages without permission
- agent claimed success while commands failed

These are non-negotiable review failures.