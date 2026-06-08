import { test as base, chromium } from "@playwright/test";
import { unifiedLogger } from "./utils/unifiedLogger";

export const test = base.extend<{
  logger: {
    info: (message: string) => Promise<void>;
    error: (message: string) => Promise<void>;
    warn: (message: string) => Promise<void>;
    debug: (message: string) => Promise<void>;
  };
}>({
  logger: async ({}, use, testInfo) => {
    // Create test-specific logger
    const testLogger = {
      info: (msg: string) =>
        unifiedLogger.info(testInfo.testId, testInfo.retry, msg),
      error: (msg: string) =>
        unifiedLogger.error(testInfo.testId, testInfo.retry, msg),
      warn: (msg: string) =>
        unifiedLogger.warn(testInfo.testId, testInfo.retry, msg),
      debug: (msg: string) =>
        unifiedLogger.debug(testInfo.testId, testInfo.retry, msg),
    };

    // Log test start
    await testLogger.info(`🚀 Test STARTED: ${testInfo.title}`);
    await testLogger.info(`📁 File: ${testInfo.file}`);
    await testLogger.info(
      `🆔 Test ID: ${testInfo.testId}, Retry: ${testInfo.retry}`,
    );

    await use(testLogger);

    // Log test end based on status
    if (testInfo.status === "passed") {
      await testLogger.info(
        `✅ Test PASSED: ${testInfo.title} (${testInfo.duration}ms)`,
      );
    } else if (testInfo.status === "failed") {
      await testLogger.error(
        `❌ Test FAILED: ${testInfo.title} (${testInfo.duration}ms)`,
      );
      if (testInfo.error) {
        await testLogger.error(`💥 Error: ${testInfo.error.message}`);
      }
    }
  },
});

export const expect = test.expect;
