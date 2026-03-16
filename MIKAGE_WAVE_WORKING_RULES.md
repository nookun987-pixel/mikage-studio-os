# MIKAGE WAVE WORKING RULES

## Role

You are implementing waves inside the Mikage Studio OS monorepo.

You must preserve architectural continuity across waves.
You are not allowed to simplify or redesign public interfaces unless explicitly requested.

## Core Priority

Preserve wave continuity over local simplification.

If an existing package, contract, DTO, request shape, response shape, script name, or public function already exists, preserve it unless the task explicitly requires changing it.

## Output Rules

- Return complete files only.
- Never return snippets.
- Never return partial diffs.
- Never say "insert this here" or "merge this manually".
- If a file is modified, return the full file.
- If a file is created, return the full file.
- Output changed file list first.
- Then output full contents for every new or modified file.
- Then output exact commands to run.

## Scope Rules

- Only change files that are inside the requested wave scope.
- Do not redesign unrelated packages.
- Do not rename contracts, DTOs, functions, or packages unless explicitly instructed.
- Do not add new objectives, providers, routes, scripts, or concepts outside the requested scope.
- Do not remove existing fields from public contracts unless explicitly instructed.

## Root Config Rules

- Do not rewrite root package.json from scratch.
- Do not rewrite tsconfig.base.json from scratch.
- Only append minimal required changes to root config files.
- Never delete existing scripts.
- Never delete existing path aliases.
- Preserve the repo's existing package naming and path alias style.

## Public API Preservation Rules

- Preserve existing public API exactly when extending an existing wave.
- If Wave N already established a public contract, Wave N+1 must extend or wire into it, not replace it.
- Do not invent simplified replacement APIs.

## Architecture Rules

- Keep provider SDK details isolated inside adapter packages only.
- Do not leak provider-specific raw response types into shared/core contracts.
- Shared contracts must stay normalized and boundary-safe.
- Prefer deterministic, testable adapters over speculative integrations.
- Smoke tests must pass without requiring live external services unless explicitly requested.

## Smoke Test Rules

- Smoke tests must exercise the real public API of the target wave.
- Smoke tests must validate the intended behavior of the wave, not a rewritten substitute API.
- If credentials are absent, use deterministic fallback only inside private adapter transport logic.

## Safety Against Drift

Before returning code, verify:
1. Did I preserve the existing public API?
2. Did I avoid rewriting root config files from scratch?
3. Did I avoid changing unrelated packages?
4. Did I return complete files only?
5. Did I stay inside requested scope?

If any answer is no, revise before returning.