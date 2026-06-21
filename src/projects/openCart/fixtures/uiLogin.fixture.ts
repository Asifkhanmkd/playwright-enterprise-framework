// src\core\uiLogin.fixture.ts

import { test as baseTest } from "@projects/openCart/fixtures/testBase";
import { LoginPage } from "@projects/openCart/pages/Login.page";
import { Page } from "@playwright/test";
import { CREDENTIALS } from "@config/constants";

export const test = baseTest.extend<{ pageWithLogin: Page }>({
  pageWithLogin: async ({ page, loginPage }, use) => {
    await loginPage.openLogin();

    await loginPage.login(
      CREDENTIALS.OPENCART_EMAIL,
      CREDENTIALS.OPENCART_PASSWORD,
    );
    await use(page);
  },
});

export const expect = test.expect;
