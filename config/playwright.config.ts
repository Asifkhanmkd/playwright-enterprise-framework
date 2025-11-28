import { defineConfig } from "@playwright/test";
import { getEnv } from "./test.env";

const env = getEnv();

export default defineConfig({
  testDir: "../src",
  timeout: 30000,
  retries: env.RETRIES,
  reporter: [["html", { outputFolder: "playwright_report" }]],

  use: {
    baseURL: env.BASE_URL,
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

  fullyParallel: true,
});
