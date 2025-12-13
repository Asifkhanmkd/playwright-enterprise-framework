import { LoginPage } from "@projects/openCart/pages/Login.page";
import { Page } from "@playwright/test";
import { test as baseTest } from "./testBase";
import { CREDENTIALS } from "config/constants";
import { ProductPage } from "@projects/openCart/pages/Product.page";

export const authTest = baseTest.extend<{
  authPage: Page;
}>({  
  authPage: async ({ loginPage }, use) => {
    await loginPage.openPage();
    await loginPage.login(
      CREDENTIALS.OPENCART_EMAIL,
      CREDENTIALS.OPENCART_PASSWORD
    );
    await use(loginPage.getPage());
  },
  productPage: async ({ authPage }, use) => {
    await use(new ProductPage(authPage));
  },
});

export { expect } from "@playwright/test";
