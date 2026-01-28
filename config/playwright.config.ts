import { defineConfig } from "@playwright/test";
import { getEnv } from "./test.env";
import * as path from "path";
const env = getEnv();

export default defineConfig({
  //testDir: path.resolve(__dirname, "../src"),
  testDir: path.resolve(__dirname, "../src/projects/openCart/tests"),
  timeout: 30000,
  retries: env.RETRIES,
  reporter: [
    ["list", { printConsole: true}],
    ["html", { outputFolder: "playwright_report", open: "never" }],
    ["../src/core/reporters/enterpriseReporter.ts"],
  ],
  //fullyParallel: true,
  workers: 1,

  use: {
    baseURL: env.BASE_URL,
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    viewport: { width: 1280, height: 800 },
    navigationTimeout: 15000,
    actionTimeout: 10000,
  },
});
