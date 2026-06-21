import fs from "fs";
import path from "path";
import { getEnv } from "@config/test.env";
import { cleanDirectory } from "@core/utils/cleanup.utils";

export default async function globalSetup() {
  console.log("🚀 Global Setup: Initializing enterprise logging framework");
  const env = getEnv();
  const logsDir = path.join(process.cwd(), "logs");
  const reportsDir = path.join(process.cwd(), "reports");

  // Clean old logs and report directories (keep only last 7 days)

  cleanDirectory(logsDir, 4);
  cleanDirectory(reportsDir, 4);

  //------------------------------------------------------------------------------//

  console.log(
    `[globalSetup] Before creation - reportsDir exists? ${fs.existsSync(reportsDir)}`,
  );

  //------------------------------------------------------------------------------//

  /* if (fs.existsSync(logsDir)) {
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
 */
  // Create fresh directories
  [logsDir, reportsDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      //---------------------------------------------------------------------//

      console.log(`[globalSetup] Creating directory: ${dir}`);

      //-----------------------------------------------------------------//

      fs.mkdirSync(dir, { recursive: true });
    }
    //---------------------------------------------------------------------//
    else {
      console.log(`[globalSetup] Directory already exists: ${dir}`);
    }
    //---------------------------------------------------------------------//
  });
  //-------------------------------------------------------------------------//
  console.log(
    `[globalSetup] After creation - reportsDir exists? ${fs.existsSync(reportsDir)}`,
  );
  //---------------------------------------------------------------------------//
}
