/**
 * @package @mikage/studio-kernel
 * @wave Studio Kernel
 *
 * kernel.ts
 */

import type { StudioSystem, SystemMetadata, SystemStatus } from "./studio-system.js"

export interface KernelConfig {
  debug?: boolean
  logLevel?: "debug" | "info" | "warn" | "error"
  autoStart?: boolean
}

export class StudioKernel {
  private metadata: SystemMetadata
  private config: KernelConfig
  private startTime: number
  private isRunning = false

  constructor(
    private system: StudioSystem,
    config: KernelConfig = {}
  ) {
    this.config = {
      debug: false,
      logLevel: "info",
      autoStart: true,
      ...config
    }
    
    this.startTime = Date.now()
    this.metadata = {
      name: "Mikage Studio System",
      version: "0.1.0",
      description: "Top-level system integrator for Mikage studio pipeline",
      initialized: false,
      createdAt: this.startTime,
      lastModified: this.startTime
    }
  }

  getSystem(): StudioSystem {
    return this.system
  }

  getMetadata(): SystemMetadata {
    return { ...this.metadata }
  }

  getConfig(): KernelConfig {
    return { ...this.config }
  }

  start(): void {
    if (this.isRunning) {
      return
    }

    this.log("info", "Starting Studio Kernel...")
    
    // Initialize system components
    this.initializeComponents()
    
    this.isRunning = true
    this.metadata.initialized = true
    this.metadata.lastModified = Date.now()
    
    this.log("info", "Studio Kernel started successfully")
  }

  stop(): void {
    if (!this.isRunning) {
      return
    }

    this.log("info", "Stopping Studio Kernel...")
    
    this.isRunning = false
    this.metadata.lastModified = Date.now()
    
    this.log("info", "Studio Kernel stopped")
  }

  getStatus(): SystemStatus {
    const components: Record<string, boolean> = {}
    
    // Check each component
    Object.keys(this.system).forEach(key => {
      components[key] = this.system[key as keyof StudioSystem] !== null && 
                      this.system[key as keyof StudioSystem] !== undefined
    })

    const healthy = Object.values(components).every(status => status) && this.isRunning

    return {
      healthy,
      components,
      uptime: Date.now() - this.startTime,
      lastCheck: Date.now()
    }
  }

  restart(): void {
    this.stop()
    this.start()
  }

  updateConfig(updates: Partial<KernelConfig>): void {
    this.config = { ...this.config, ...updates }
    this.metadata.lastModified = Date.now()
  }

  private initializeComponents(): void {
    this.log("debug", "Initializing system components...")
    
    // Component initialization would go here
    // For now, we just log the component names
    Object.keys(this.system).forEach(component => {
      this.log("debug", `Component ${component} available`)
    })
  }

  private log(level: "debug" | "info" | "warn" | "error", message: string): void {
    if (!this.config.debug && level === "debug") {
      return
    }

    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] [StudioKernel] ${message}`
    
    if (this.config.logLevel === "debug" || 
        (this.config.logLevel === "info" && level !== "debug") ||
        (this.config.logLevel === "warn" && ["warn", "error"].includes(level)) ||
        (this.config.logLevel === "error" && level === "error")) {
      console.log(logMessage)
    }
  }
}
