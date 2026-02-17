/* // src/core/utils/globalSetup.ts
import fs from "fs";
import path from "path";

export default async function globalSetup() {
  // Clean up old logs from previous runs
  const logsDir = path.join(process.cwd(), "logs");
  const reportsDir = path.join(process.cwd(), "reports");

  // Keep only last 5 runs
  if (fs.existsSync(reportsDir)) {
    const runs = fs
      .readdirSync(reportsDir)
      .filter((dir) => dir.startsWith("run-"))
      .sort()
      .reverse()
      .slice(5); // Keep only first 5

    runs.forEach((run) => {
      const runPath = path.join(reportsDir, run);
      fs.rmSync(runPath, { recursive: true, force: true });
    });
  }

  console.log("Global setup completed - Logging system initialized");
}
 */

// src/core/globalSetup.ts
import fs from "fs";
import path from "path";

export default async function globalSetup() {
  console.log("🚀 Global Setup: Initializing enterprise logging framework");

  const logsDir = path.join(process.cwd(), "logs");
  const reportsDir = path.join(process.cwd(), "reports");

  // Clean old logs (keep only last 7 days)
  if (fs.existsSync(logsDir)) {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const items = fs.readdirSync(logsDir);
    for (const item of items) {
      const itemPath = path.join(logsDir, item);
      const stats = fs.statSync(itemPath);

      if (stats.mtimeMs < cutoff) {
        fs.rmSync(itemPath, { recursive: true, force: true });
      }
    }
  }

  // Create fresh directories
  [logsDir, reportsDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  console.log("✅ Global Setup: Logging system initialized");
}
