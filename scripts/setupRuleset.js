require("dotenv").config();
const { Octokit } = require("@octokit/rest");

// กำหนด token ใน .env หรือ .env.local เป็น GITHUB_TOKEN=your_token
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function ensureRuleset() {
  const owner = "peterpech";
  const repo = "buchaphra-static";

  try {
    // สร้าง Ruleset ใหม่
    const res = await octokit.request(
      "POST /repos/{owner}/{repo}/rulesets",
      {
        owner,
        repo,
        name: "พระะ",
        // target ที่เราต้องการคือ branch
        target: "branch",
        // สถานะบังคับใช้ทันที
        enforcement: "active",
        // ไม่ต้อง bypass actors/apps เพิ่มเติม (หากมีให้ใส่ array ของ user/app IDs)
        bypass_actors: [],
        bypass_apps: [],
        // เงื่อนไข: ให้ apply กับสาขา main เท่านั้น
        conditions: [
          {
            type: "branch",
            branches: {
              include: ["main"],
              exclude: []
            }
          }
        ],
        // กฎที่ต้องการบังคับ
        rules: [
          { type: "restrict_deletions" },
          { type: "block_force_pushes" }
        ]
      }
    );
    console.log("✅ Created ruleset:", res.data.name);
  } catch (err) {
    console.error("❌ Failed to create/update ruleset:", err);
  }
}

ensureRuleset();
