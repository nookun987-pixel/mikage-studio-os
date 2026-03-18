# Mikage Studio OS - Operator Smoke Script (Windows PowerShell Wrapper)
# 
# This wrapper provides a Windows-native way to run the operator flow
# with proper error handling and exit codes.

param(
    [switch]$Help,
    [switch]$Verbose
)

function Show-Help {
    Write-Host "Mikage Studio OS - Operator Smoke (Windows)" -ForegroundColor Cyan
    Write-Host "===============================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "USAGE:"
    Write-Host "  .\scripts\operator-smoke.ps1"
    Write-Host "  pnpm operator:smoke"
    Write-Host ""
    Write-Host "DESCRIPTION:"
    Write-Host "  Executes the complete Mikage Studio OS pipeline with a single command."
    Write-Host "  Automatically starts the orchestration service if needed and provides"
    Write-Host "  a final readable outcome for operators."
    Write-Host ""
    Write-Host "OPTIONS:"
    Write-Host "  -Help     Show this help message"
    Write-Host "  -Verbose  Enable verbose output"
    Write-Host ""
    Write-Host "EXIT CODES:"
    Write-Host "  0  Success (PASS or REJECTED - system worked correctly)"
    Write-Host "  1  System failure (broken pipeline, service issues, etc.)"
    Write-Host ""
    Write-Host "EXAMPLES:"
    Write-Host "  .\scripts\operator-smoke.ps1"
    Write-Host "  .\scripts\operator-smoke.ps1 -Verbose"
    Write-Host ""
}

function Test-Prerequisites {
    Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow
    
    # Check if pnpm is available
    try {
        $pnpmVersion = & pnpm --version 2>$null
        Write-Host "✅ pnpm found: $pnpmVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ pnpm not found. Please install pnpm first." -ForegroundColor Red
        Write-Host "   Install with: npm install -g pnpm" -ForegroundColor Gray
        exit 1
    }
    
    # Check if we're in the right directory
    if (-not (Test-Path "package.json")) {
        Write-Host "❌ package.json not found. Please run from repository root." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Repository root confirmed" -ForegroundColor Green
}

function Invoke-OperatorFlow {
    Write-Host "🎯 Starting Mikage Studio OS Operator Flow..." -ForegroundColor Cyan
    Write-Host ""
    
    try {
        if ($Verbose) {
            & pnpm operator:smoke
        } else {
            # Capture output but still show it in real-time
            $process = Start-Process -FilePath "pnpm" -ArgumentList "operator:smoke" -NoNewWindow -PassThru -Wait
            $exitCode = $process.ExitCode
            
            if ($exitCode -eq 0) {
                Write-Host ""
                Write-Host "✅ Operator flow completed successfully" -ForegroundColor Green
            } else {
                Write-Host ""
                Write-Host "❌ Operator flow failed with exit code $exitCode" -ForegroundColor Red
            }
            
            exit $exitCode
        }
    } catch {
        Write-Host ""
        Write-Host "❌ FATAL ERROR: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        Write-Host "Check the operator log for details:" -ForegroundColor Yellow
        Write-Host "  Get-Content logs\operator-smoke-latest.txt" -ForegroundColor Gray
        exit 1
    }
}

# Main execution
if ($Help) {
    Show-Help
    exit 0
}

Write-Host "Mikage Studio OS - Operator Smoke (Windows)" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

Test-Prerequisites
Write-Host ""

Invoke-OperatorFlow
