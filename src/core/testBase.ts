import { test as base, Page } from "@playwright/test";
import { DashboardPage } from "@projects/openCart/pages/Dashboard.page";
import { LoginPage } from "@projects/openCart/pages/Login.page";
import { ProductPage } from "@projects/openCart/pages/Product.page";

export const test = base.extend<{
  loginPage: LoginPage;
  productPage: ProductPage;
  dashboardPage: DashboardPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

export { expect } from "@playwright/test";
