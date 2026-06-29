import { test as base } from "./testBase";
import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";
import { getEnv } from "@config/test.env";
import { AuthService } from "@projects/openCart/services/AuthService";

const env = getEnv();
const STORAGE_DIR = path.resolve("Storage");

type workerFixtures = {
  workerStorageState: string;
};

export const test = base.extend<{}, workerFixtures>({
  workerStorageState: [
    async ({}, use, workerInfo) => {
      fs.mkdirSync(STORAGE_DIR, { recursive: true });

      const workerStorageStatePath = path.join(
        STORAGE_DIR,
        `auth-worker-${workerInfo.workerIndex}.json`,
      );

      if (!fs.existsSync(workerStorageStatePath)) {
        console.log(`Worker ${workerInfo.workerIndex}: Creating auth state`);

        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await AuthService.login(page);

        console.log(
          `[Worker ${workerInfo.workerIndex}] Saving browser session...`,
        );
        await context.storageState({ path: workerStorageStatePath });

        await browser.close();
        console.log(
          `[Worker ${workerInfo.workerIndex}] Authentication state created.`,
        );
      } else {
        console.log(
          `[Worker ${workerInfo.workerIndex}] Reusing existing auth state.`,
        );
      }

      console.log(
        `[Worker ${workerInfo.workerIndex}] Using auth state: ${workerStorageStatePath}`,
      );

      await use(workerStorageStatePath);
    },
    { scope: "worker", timeout: 90000 },
  ],

  page: async ({ browser, workerStorageState }, use, testInfo) => {
    const needsAuth = testInfo.title.includes("@require-auth");
    const modifiesAuth = testInfo.title.includes("@modifies-auth");

    if (!needsAuth && !modifiesAuth) {
      const context = await browser.newContext();
      const page = await context.newPage();
      await use(page);
      await context.close();
      return;
    }

    if (needsAuth) {
      const context = await browser.newContext({
        storageState: workerStorageState,
      });
      const page = await context.newPage();
      await use(page);
      await context.close();
      return;
    }

    if (modifiesAuth) {
      const context = await browser.newContext();
      const page = await context.newPage();

      await AuthService.login(page);
      await use(page);
      await context.close();
      return;
    }
  },
});

export const expect = test.expect;
