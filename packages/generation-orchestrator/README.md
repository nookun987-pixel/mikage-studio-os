# Generation Orchestrator

## Local Runtime Testing

### Prerequisites
```bash
# Install dependencies
npm install

# Build the package
npm run build

# Build standalone runtime (if needed)
npx tsc src/standalone_runtime.ts --outDir dist --target ES2022 --module NodeNext --moduleResolution NodeNext --skipLibCheck
npx tsc src/standalone_test.ts --outDir dist --target ES2022 --module NodeNext --moduleResolution NodeNext --skipLibCheck
```

### Quick Test Commands

**Standalone Runtime (Recommended):**
```bash
# Run comprehensive standalone test suite
npm run test-standalone
```

**Original Runtime (Requires Dependencies):**
```bash
# Create sample request files
npm run create-samples

# Test dry-run mode (validation only)
npm run dry-run

# Test validation-run mode (validation + mock generation)
npm run validation-run

# Test compile-run mode (prompt compilation + validation)
npm run compile-run

# Run full demo
npm run demo
```

### What These Commands Test

- **test-standalone**: Complete pipeline test with mock providers, all modes, performance benchmarks
- **dry-run**: Request parsing, reference selection, prompt compilation, pre-validation
- **validation-run**: All of dry-run + mock generation + post-validation
- **compile-run**: Request parsing, reference selection, prompt compilation only
- **demo**: Creates samples and tests all modes

### Expected Output

Each command produces:
- Console output with detailed pipeline execution information
- JSON result files (for original runtime)
- Performance metrics and validation results
- Mock data demonstration

### Current State

**What Runs Cleanly:**
- ✅ Complete standalone pipeline runtime (no external dependencies)
- ✅ Request parsing and validation
- ✅ Mock reference selection with realistic data
- ✅ Prompt compilation stages
- ✅ Pre-generation validation
- ✅ Mock generation with configurable modes
- ✅ Post-generation validation
- ✅ Result packaging and formatting
- ✅ Performance benchmarking
- ✅ All execution modes (dry-run, validation-run, compile-run, full-run)

**What Uses Mock Providers:**
- 🔧 Generation providers (mock responses with realistic timing)
- 🔧 Asset registry (mock character/environment/style data)
- 🔧 Canon validator (mock validation with configurable results)
- 🔧 External service integrations (all mocked)

**What Is Real:**
- ✅ Pipeline orchestration and flow control
- ✅ Request/response schema validation
- ✅ Mock provider interfaces and contracts
- ✅ Performance measurement and reporting
- ✅ Error handling and recovery
- ✅ TypeScript type safety
- ✅ CLI interface and automation

**Known Limitations:**
- ⚠️ No real generation backend (mock only)
- ⚠️ No real asset registry integration (mock only)
- ⚠️ TypeScript workspace configuration (some cross-package type issues)
- ⚠️ Canon validation is simplified (mock implementation)

### Architecture

```
Standalone Runtime (no external dependencies)
    ├── StandalonePipelineRuntime (orchestration)
    ├── MockGenerationProvider (mock generation)
    ├── MockAssetRegistryProvider (mock assets)
    └── MockCanonGuard (mock validation)

Original Runtime (requires workspace dependencies)
    ├── PipelineRuntime (orchestration)
    ├── ContentEngineAdapter (integration layer)
    ├── CanonGuard (real validation)
    └── External Dependencies (content-engine, canon-validator)
```

### Troubleshooting

If you see TypeScript errors during build:
```bash
# Clean and rebuild
rm -rf dist
npm run build

# Build standalone files manually
npx tsc src/standalone_runtime.ts --outDir dist --target ES2022 --module NodeNext --moduleResolution NodeNext --skipLibCheck
npx tsc src/standalone_test.ts --outDir dist --target ES2022 --module NodeNext --moduleResolution NodeNext --skipLibCheck
```

If original runtime fails:
```bash
# Check if dependencies are built
cd ../content-engine && npm run build
cd ../canon-validator && npm run build
cd ../generation-orchestrator && npm run build
```

### Performance

**Standalone Runtime Performance:**
- Average execution time: ~400-600ms
- Memory usage: < 50MB
- No external dependencies
- Consistent performance across modes

**Original Runtime Performance:**
- Similar performance but depends on workspace build status
- May fail if dependencies not built
- More complex dependency resolution

### Development Notes

**Standalone Runtime Benefits:**
- No workspace dependency issues
- Immediate testing capability
- Complete control over mock behavior
- Faster iteration cycle
- Reliable CI/CD integration

**Original Runtime Benefits:**
- Uses real canon validator when available
- Integrates with content engine adapter
- More realistic integration testing
- Closer to production architecture

### Testing Recommendations

1. **Use standalone runtime** for:
   - Quick development iteration
   - CI/CD pipelines
   - Performance testing
   - Feature development

2. **Use original runtime** for:
   - Integration testing with real components
   - Validation of cross-package interfaces
   - Production readiness testing

### Future Enhancements

- **Short Term**: Improve mock data realism and variety
- **Medium Term**: Add configuration options for mock behavior
- **Long Term**: Replace mock providers with real implementations
