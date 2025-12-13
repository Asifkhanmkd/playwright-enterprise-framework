import { test as base } from "@playwright/test";
import { logger } from "./utils/logger";

export const test = base;
export const expect = base.expect;

test.beforeEach(async () => {
  console.log("🔵 Test Started");
  logger.info("🔵 Test Started");
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    console.log(`🔴 Test Failed: ${testInfo.title}`);
    logger.error(`🔴 Test Failed: ${testInfo.title}`);

    const screenshot = await page.screenshot();
    await testInfo.attach("Screenshot of failed test", {
      body: screenshot,
      contentType: "image/png",
    });
  }
});
