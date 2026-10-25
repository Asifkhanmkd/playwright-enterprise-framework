import { test as base, expect } from "@playwright/test";
//import { test as authTest, expect } from "./ToolshopAuth.fixture";
import { LoginPage } from "@projects/toolshop/pages/Login.page";
import { HomePage } from "@projects/toolshop/pages/Home.page";
import { AccountPage } from "../pages/Account.page";
import { NavigationPage } from "../pages/Navigation.page";
import { ProductCataloguePage } from "../pages/ProductCatalogue.page";
import { ProductDetailsPage } from "../pages/ProductDetails.page";
import { RegistrationPage } from "../pages/Registration.page";

type toolshopPages = {
  homePage: HomePage;
  loginPage: LoginPage;
  accountPage: AccountPage;
  navigationPage: NavigationPage;
  productCataloguePage: ProductCataloguePage;
  productDetailsPage: ProductDetailsPage;
  registrationPage: RegistrationPage;
};

export const test = base.extend<toolshopPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },

  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },

  productCataloguePage: async ({ page }, use) => {
    await use(new ProductCataloguePage(page));
  },

  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },

  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
});
export { expect };
