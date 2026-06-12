import { test as base } from "@core/testBase";
import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";
import { getEnv } from "@config/test.env";
import { LoginPage } from "@projects/openCart/pages/Login.page";
import { CREDENTIALS } from "@config/constants";

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

        const loginPage = new LoginPage(page);
        await loginPage.openLogin();
        await loginPage.login(
          CREDENTIALS.OPENCART_EMAIL,
          CREDENTIALS.OPENCART_PASSWORD,
        );

        await context.storageState({ path: workerStorageStatePath });

        await browser.close();
      }

      await use(workerStorageStatePath);
    },
    { scope: "worker" },
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

      const loginPage = new LoginPage(page);
      await loginPage.openLogin();
      await loginPage.login(
        CREDENTIALS.OPENCART_EMAIL,
        CREDENTIALS.OPENCART_PASSWORD,
      );
      await use(page);
      await context.close();
      return;
    }
  },
});

export const expect = test.expect;
