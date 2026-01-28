import { test as base } from "@playwright/test";
import { logger } from "./utils/logger";

// ❗ FIX: create a new extended test object
export const test = base.extend({});

(test as any)._fingerprint = "HOOKS_INSTANCE_" + Math.random();

console.log(
  `[DEBUG] hooks.ts loaded. Fingerprint: ${(test as any)._fingerprint}`
);

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot();
    await testInfo.attach("Screenshot of failed test", {
      body: screenshot,
      contentType: "image/png",
    });
  }
});

export const expect = test.expect;
