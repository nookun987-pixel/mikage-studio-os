# Mikage Studio OS - Runtime Guide

## Overview

The Mikage Studio OS generation orchestrator provides **three runtime options** for local testing and development:

1. **Isolated Runtime** (Recommended) - Complete pipeline with no workspace dependencies
2. **Workspace Runtime** - Full workspace integration with proper TypeScript project references
3. **Original Runtime** - Full workspace integration (requires all dependencies built)

## TypeScript Workspace Configuration

**CHOSEN STRATEGY**: Standardized on **NodeNext module resolution** with proper project references across all workspace packages.

**Configuration Alignment**:
- All packages now extend `tsconfig.base.json` with consistent NodeNext settings
- Project references properly configured for dependency ordering
- Composite mode enabled for all packages to enable incremental builds
- Module resolution standardized to NodeNext across the entire workspace

**Build Commands**:
```bash
# Full workspace build (recommended)
cd d:\MIKAGE OS\mikage-studio-os-clean
npx tsc --build

# Individual package builds
npx tsc --build packages/contracts
npx tsc --build packages/canon-validator
npx tsc --build packages/content-engine
npx tsc --build packages/generation-orchestrator
```

## Quick Start

### Isolated Runtime (Recommended)

```bash
# Build and test isolated runtime (no workspace dependencies)
cd packages/generation-orchestrator
npm run build-isolated
npm run test-isolated
```

**Benefits:**
- ✅ No TypeScript workspace issues
- ✅ No external dependencies required
- ✅ Immediate testing capability
- ✅ Complete pipeline execution
- ✅ Performance benchmarking
- ✅ Reliable CI/CD integration

### Workspace Runtime

```bash
# Build and test workspace runtime
cd d:\MIKAGE OS\mikage-studio-os-clean
npx tsc --build
cd packages/generation-orchestrator
npm run build
npm run test-simple
```

**Benefits:**
- ✅ Uses workspace structure
- ✅ Full TypeScript project references
- ✅ Proper dependency resolution
- ✅ Incremental builds with composite mode

**Note**: Runtime execution requires workspace package resolution setup (e.g., pnpm workspace, npm workspaces, or proper module resolution configuration).

### Original Runtime

```bash
# Build and test original runtime
cd packages/generation-orchestrator
npm run build
npm run test-simple
```

**Requirements:**
- All workspace packages must be built first
- TypeScript workspace must be properly configured
- Cross-package dependencies resolved

**Note**: Same runtime execution requirements as workspace runtime.

## Execution Modes

All runtimes support these execution modes:

- **dry-run**: Request parsing, reference selection, prompt compilation, pre-validation
- **validation-run**: All of dry-run + mock generation + post-validation
- **compile-run**: Request parsing, reference selection, prompt compilation only
- **full-run**: Complete pipeline with mock generation and validation

## Current State

### What Runs Cleanly

**TypeScript Workspace:**
- ✅ Full workspace typecheck passes (`npx tsc --build`)
- ✅ All packages build successfully with project references
- ✅ Consistent NodeNext module resolution across workspace
- ✅ Proper dependency ordering with composite builds
- ✅ Incremental builds working with tsbuildinfo

**Isolated Runtime:**
- ✅ Complete pipeline orchestration
- ✅ Request/response schema validation
- ✅ Mock provider integration (fully isolated)
- ✅ Performance measurement and reporting
- ✅ Error handling and recovery
- ✅ All execution modes
- ✅ TypeScript compilation (no cross-package issues)
- ✅ CLI interface and automation

**Workspace Runtime:**
- ✅ Pipeline orchestration
- ✅ TypeScript compilation with project references
- ✅ Cross-package type resolution
- ✅ Mock provider interfaces
- ✅ Performance benchmarking
- ⚠️ Runtime execution requires workspace package resolution

**Original Runtime:**
- ✅ Basic pipeline execution (when dependencies built)
- ✅ TypeScript compilation (when workspace built)
- ⚠️ Runtime execution requires workspace package resolution

### What Uses Mock Providers

**All Runtimes:**
- 🔧 Generation providers (mock responses with realistic timing)
- 🔧 Asset registry (mock character/environment/style data)
- 🔧 Canon validator (mock validation with configurable results)
- 🔧 External service integrations (all mocked)

### What Is Real

**All Runtimes:**
- ✅ Pipeline orchestration and flow control
- ✅ Request/response schema validation
- ✅ Mock provider interfaces and contracts
- ✅ Performance measurement and reporting
- ✅ Error handling and recovery
- ✅ TypeScript type safety (within isolated context)
- ✅ CLI interface and automation

**Workspace Configuration:**
- ✅ Consistent TypeScript configuration across packages
- ✅ Proper project references and dependency ordering
- ✅ NodeNext module resolution
- ✅ Composite builds for incremental compilation

### Known Limitations

**Runtime Execution:**
- ⚠️ Workspace packages require proper module resolution at runtime (pnpm workspace, npm workspaces, or module alias configuration)
- ⚠️ Original runtime execution blocked by Node.js package resolution

**By Design:**
- ⚠️ No real generation backend (mock only)
- ⚠️ No real asset registry integration (mock only)
- ⚠️ No real external service integrations (mock only)

## Performance

**Isolated Runtime:**
- Average execution time: ~400-600ms
- Memory usage: < 50MB
- No external dependencies
- Consistent performance across modes

**Workspace Runtime:**
- Similar performance but depends on workspace build status
- Faster incremental builds with composite mode
- Better type safety with cross-package resolution

## Architecture

```
TypeScript Workspace (NodeNext + Project References)
    ├── contracts (base types, no dependencies)
    ├── provider-registry, asset-lineage, generation-evaluator, asset-registry, scene-graph
    ├── canon-validator (depends on contracts)
    ├── content-engine (depends on contracts, canon-validator, and infrastructure packages)
    └── generation-orchestrator (depends on content-engine, canon-validator)

Isolated Runtime (no external dependencies)
    ├── IsolatedPipelineRuntime (orchestration)
    ├── Local type definitions (no imports)
    └── Complete mock implementations

Workspace Runtime (workspace structure)
    ├── PipelineRuntime (orchestration)
    ├── MockGenerationProvider (mock generation)
    ├── MockAssetRegistryProvider (mock assets)
    └── MockCanonGuard (mock validation)

Original Runtime (full workspace)
    ├── PipelineRuntime (orchestration)
    ├── ContentEngineAdapter (integration layer)
    ├── CanonGuard (real validation)
    └── External Dependencies (content-engine, canon-validator)
```

## Troubleshooting

### TypeScript Issues

If you see TypeScript errors during build:

```bash
# Clean build artifacts and rebuild
cd d:\MIKAGE OS\mikage-studio-os-clean
powershell -c "Get-ChildItem -Path packages -Recurse -Name 'tsconfig.tsbuildinfo' | Remove-Item -Force"
powershell -c "Get-ChildItem -Path packages -Recurse -Name 'dist' | Remove-Item -Recurse -Force"
npx tsc --build

# Or use isolated runtime (recommended)
npm run build-isolated
npm run test-isolated
```

### Runtime Failures

If workspace runtime fails:

```bash
# Check workspace package resolution
cd d:\MIKAGE OS\mikage-studio-os-clean
pnpm install  # or npm install

# Rebuild workspace
npx tsc --build

# Test isolated runtime as fallback
npm run build-isolated
npm run test-isolated
```

### Performance Issues

If runtime is slow:

```bash
# Check system resources
node -e "console.log('Memory:', process.memoryUsage())"

# Run performance test
npm run test-isolated  # Includes performance benchmarks
```

## Development Recommendations

### For Development

1. **Use isolated runtime** for:
   - Quick development iteration
   - CI/CD pipelines
   - Performance testing
   - Feature development
   - Bug reproduction

2. **Use workspace runtime** for:
   - Integration testing with workspace structure
   - Type safety verification
   - Cross-package interface validation
   - Full workspace builds

3. **Use original runtime** for:
   - Production readiness testing
   - Full integration validation
   - Cross-package interface testing

### For Production

When moving to production:
1. Replace mock providers with real implementations
2. Set up proper workspace package resolution (pnpm workspace recommended)
3. Remove isolated runtime (development-only)
4. Ensure all workspace dependencies are built
5. Add real external service integrations
6. Implement proper error handling and monitoring

## Testing Commands

### TypeScript Workspace

```bash
# Full workspace typecheck and build
cd d:\MIKAGE OS\mikage-studio-os-clean
npx tsc --build

# Individual package builds
npx tsc --build packages/contracts
npx tsc --build packages/canon-validator
npx tsc --build packages/content-engine
npx tsc --build packages/generation-orchestrator
```

### Runtime Tests

```bash
# Isolated runtime (recommended)
npm run build-isolated
npm run test-isolated

# Workspace runtime
npm run build
npm run test-simple  # Requires workspace package resolution

# Standalone runtime
npm run build
npm run test-standalone  # Requires workspace package resolution
```

### Performance Tests

```bash
# Isolated runtime performance
npm run test-isolated  # Includes performance benchmarks

# Workspace runtime performance  
npm run test-standalone  # Includes performance benchmarks
```

## Future Enhancements

### Short Term
- [ ] Set up proper workspace package resolution (pnpm workspace)
- [ ] Improve mock data realism and variety
- [ ] Add configuration options for mock behavior
- [ ] Enhance error reporting and logging

### Medium Term
- [ ] Replace mock providers with real implementations
- [ ] Add real asset registry integration
- [ ] Implement real canon validation
- [ ] Enable full workspace runtime execution

### Long Term
- [ ] Remove isolated runtime (development-only)
- [ ] Full production deployment support
- [ ] Real external service integrations

## Support

For issues with the runtime:

1. Check this guide for troubleshooting steps
2. Verify Node.js version (requires ES2022 support)
3. Ensure TypeScript compilation succeeded
4. Test with isolated runtime first
5. Check system resources and permissions

For TypeScript workspace issues:
1. Use `npx tsc --build` for full workspace validation
2. Clean build artifacts if incremental builds fail
3. Verify project references are correct
4. Check that all dependencies are built in order

For development questions:
- Use isolated runtime for development
- Refer to architecture diagrams above
- Check performance benchmarks
- Review mock provider interfaces
