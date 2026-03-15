import { runContentEngine } from "@mikage/content-engine"

async function run() {

  const req = {
    productionPackage: {
      production_package_id: "pkg_test_001",
      projectId: "proj_test",
      jobId: "job_test",

      promptPack: {
        promptPackId: "prompt_test",
        prompts: ["test prompt"]
      },

      objective: "cinematic_frame",

      canonConstraints: {
        requiredTags: [],
        forbiddenTags: [],
        styleLocks: []
      },

      ready_for_generation: true,
      sealed_at: new Date().toISOString()
    },

    targetPlatforms: ["twitter","instagram"]
  }

  const res = await runContentEngine(req)

  console.log("\nWAVE10 RESULT\n")
  console.log(JSON.stringify(res,null,2))
}

run()