import type { Page } from "@playwright/test";
import path from "path";
//import { test as baseTest } from "@core/testBase";
import { test as baseTest } from "./authWorkerFixture";
import { CREDENTIALS } from "@config/constants";
import { ProductPage } from "@projects/openCart/pages/Product.page";
import { isAuthStateFresh } from "@projects/openCart/utils/authStateGuard";
//const STORAGE_STATE_PATH = path.resolve("Storage/auth-state.json");

type AuthFixtures = {
  authPage: Page;
  productPageWithAuth: ProductPage;
};

export const test = baseTest.extend<AuthFixtures>({
  //  AUTH DECISION (before context creation)

  //storageState: STORAGE_STATE_PATH,

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
