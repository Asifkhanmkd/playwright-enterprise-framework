import fs from "fs";
import path from "path";

//Reursively deleting files/directies older than a given specific days

export function cleanDirectory(dirPath: string, day: number): void {
  if (!fs.existsSync(dirPath)) return;

  const cutoff = Date.now() - day * 24 * 60 * 60 * 1000;

  const items = fs.readdirSync(dirPath);


  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      cleanDirectory(fullPath, day);

      /*  if (fs.existsSync(fullPath) && fs.readdirSync(fullPath).length === 0) {
        fs.rmSync(fullPath, { recursive: true, force: true });


      } */
    } else if (stats.mtimeMs < cutoff) {
      fs.rmSync(fullPath, { force: true });
    }
  }
}
