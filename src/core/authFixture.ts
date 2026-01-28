import type { Page } from "@playwright/test";
import path from "path";
import { test as baseTest } from "@core/testBase";
import { CREDENTIALS } from "../../config/constants";
import { ProductPage } from "@projects/openCart/pages/Product.page";
import { isAuthStateFresh } from "./utils/authStateGuard";
const STORAGE_STATE_PATH = path.resolve("Storage/auth-state.json");

type AuthFixtures = {
  authPage: Page;
  productPageWithAuth: ProductPage;
};

/* export const test = baseTest.extend<AuthFixtures>({
  storageState: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: STORAGE_STATE_PATH,
    });
    const page = await context.newPage();

    const isFresh = await isAuthStateFresh(browser);
    await context.close();

    await use(isFresh ? STORAGE_STATE_PATH : undefined);
  },

  authPage: async ({ page }, use) => {
    await use(page);
  },

  productPageWithAuth: async ({ authPage }, use) => {
    await use(new ProductPage(authPage));
  },
});

// propagate fingerprint
(test as any)._fingerprint = (baseTest as any)._fingerprint;

export const expect = test.expect;
 */


export const test = baseTest.extend<AuthFixtures>({
  // 🔑 AUTH DECISION (before context creation)
  storageState: isAuthStateFresh() ? STORAGE_STATE_PATH : undefined,

  // 🔐 AUTH VERIFICATION (not auth creation)
  authPage: async ({ page }, use) => {
    // We do NOT login here
    // We only verify assumptions if needed
    await use(page);
  },

  productPageWithAuth: async ({ authPage }, use) => {
    await use(new ProductPage(authPage));
  },
});

(test as any)._fingerprint = (baseTest as any)._fingerprint;
export const expect = test.expect;