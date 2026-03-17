/**
 * Social export bundle builder
 */
export function buildSocialExport(asset, platforms) {
    const captions = {
        twitter: "",
        instagram: "",
        discord: "",
        artstation: "",
        patreon: ""
    };
    const hashtags = {
        twitter: [],
        instagram: [],
        discord: [],
        artstation: [],
        patreon: []
    };
    const formatHints = {
        twitter: { width: 1200, height: 675, maxFileSizeKb: 5000, fileFormat: "png" },
        instagram: { width: 1080, height: 1080, maxFileSizeKb: 8000, fileFormat: "jpg" },
        discord: { width: 1280, height: 720, maxFileSizeKb: 8000, fileFormat: "png" },
        artstation: { width: 1920, height: 1080, maxFileSizeKb: 10000, fileFormat: "png" },
        patreon: { width: 1920, height: 1080, maxFileSizeKb: 10000, fileFormat: "png" }
    };
    for (const p of platforms) {
        captions[p] = `Asset ${asset.assetId}`;
        hashtags[p] = ["mikage", "aiart"];
    }
    return {
        exportId: `export_${asset.assetId}`,
        assetId: asset.assetId,
        captions,
        hashtags,
        formatHints,
        readyToPost: false,
        flags: ["STUB_ASSET"],
        prepared_at: new Date().toISOString()
    };
}
//# sourceMappingURL=social-export.js.map