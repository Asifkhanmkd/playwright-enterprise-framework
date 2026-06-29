// src\core\uiLogin.fixture.ts

import { test as baseTest } from "@projects/openCart/fixtures/testBase";
import { Page } from "@playwright/test";
import { AuthService } from "@projects/openCart/services/AuthService";

export const test = baseTest.extend<{ pageWithLogin: Page }>({
  pageWithLogin: async ({ page }, use) => {
    await AuthService.login(page);
    await use(page);
  },
});

export const expect = test.expect;
