/* import { defineConfig } from "@playwright/test";
import { getEnv } from "./test.env";
import * as path from "path";
const env = getEnv();
const isCI = !!process.env.CI;

export default defineConfig({
  //testDir: path.resolve(__dirname, "../src"),
  testDir: path.resolve(__dirname, "../src/projects/openCart/tests"),
  timeout: 30000,
  retries: isCI ? 1 : 0,
  reporter: [
    ["list", { printConsole: true }],
    ["html", { outputFolder: "playwright_report", open: "never" }],
    ["../src/core/reporters/enterpriseReporter.ts"],
  ],
  //fullyParallel: true,
  workers: isCI ? 2 : 1, //undefined -- replace with 1 later

  use: {
    baseURL: env.BASE_URL,
    headless: isCI,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    viewport: { width: 1280, height: 800 },
    navigationTimeout: 15000,
    actionTimeout: 10000,
  },
});
 */

//----------------------------------------------------------------------//

/* // playwright.config.ts
import { defineConfig } from "@playwright/test";
import { getEnv } from "./test.env";
import * as path from "path";

const env = getEnv();
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: path.resolve(__dirname, "../src/projects/openCart/tests"),
  timeout: 30000,
  retries: isCI ? 1 : 0,

  // Enhanced reporter configuration
  reporter: [
    ["list", { printSteps: true }],
    [
      "html",
      {
        outputFolder: "reports/html",
        open: isCI ? "never" : "on-failure",
      },
    ],
    [
      "junit",
      {
        outputFile: "reports/junit/results.xml",
        embedAnnotationsAsProperties: true,
      },
    ],
    [path.resolve(__dirname, "../src/core/reporters/enterpriseReporter.ts")],
  ],

  workers: isCI ? 2 : 1,

  // Global setup to initialize logger state
  globalSetup: require.resolve("../src/core/utils/globalSetup.ts"),

  use: {
    baseURL: env.BASE_URL,
    headless: isCI,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    viewport: { width: 1280, height: 800 },
    navigationTimeout: 15000,
    actionTimeout: 10000,
  },
});
 */

// config/playwright.config.ts
import { defineConfig } from "@playwright/test";
import { getEnv } from "./test.env";
import * as path from "path";

const env = getEnv();
const pipeline = process.env.PIPELINE?.toLocaleLowerCase();
const testScope = process.env.TEST_SCOPE?.toLocaleLowerCase();

const isCI = !!process.env.CI;

const retries =
  pipeline === "pr"
    ? 0
    : pipeline === "main"
      ? 1
      : pipeline === "nightly"
        ? 2
        : 0;

const workers =
  pipeline === "pr"
    ? 2
    : pipeline === "main"
      ? 3
      : pipeline === "nightly"
        ? 4
        : undefined;

const grep =
  testScope === "smoke"
    ? /@smoke/
    : testScope === "critical"
      ? /@critical|@smoke/
      : undefined;

const fullyParallel = pipeline === "pr" ? false : true;

console.log("PIPELINE:", pipeline);
console.log("TEST_SCOPE:", testScope);
console.log("Retries:", retries);
console.log("Workers:", workers);
console.log("Fully Parallel:", fullyParallel);

export default defineConfig({
  // Fix: Go up one level from config directory, then into src
  testDir: path.resolve(__dirname, "..", "src/projects/openCart/tests"),
  timeout: 30000,
  retries,
  grep,
  fullyParallel,
  workers,

  // Fix: Go up one level, then into src/core/utils
  globalSetup: require.resolve("../src/core/utils/globalSetup.ts"),

  // Enterprise-grade reporting
  reporter: [
    ["list", { printSteps: true, stripANSIControlSequences: true }],
    [
      "html",
      {
        outputFolder: "reports/html",
        open: isCI ? "never" : "on-failure",
      },
    ],
    [
      "junit",
      {
        outputFile: "reports/junit/results.xml",
        embedAnnotationsAsProperties: true,
      },
    ],
    // Fix: Go up one level, then into src/core/reporters
    [path.resolve(__dirname, "..", "src/core/reporters/enterpriseReporter.ts")],
  ],

  // Enhanced use settings
  use: {
    baseURL: env.BASE_URL,
    headless: isCI,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    viewport: { width: 1280, height: 800 },
    navigationTimeout: 15000,
    actionTimeout: 10000,
  },
});
