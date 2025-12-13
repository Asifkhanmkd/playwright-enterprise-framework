import { test, Page, expect } from "@playwright/test";
import { ProductPage } from "../pages/Product.page";
import { LoginPage } from "../pages/Login.page";
import { CREDENTIALS } from "config/constants";
import { authTest } from "@core/authFixture";

test("Search a product", async ({ page }) => {
  const login = new LoginPage(page);
  await login.openPage();
  await login.login(CREDENTIALS.OPENCART_EMAIL, CREDENTIALS.OPENCART_PASSWORD);
  const product = new ProductPage(page);
  await product.searchProduct("MacBook Air");
  await product.expectProductInResults("MacBook Air");
});

authTest(
  "Search returns multiple products",
  async ({ authPage, productPage }) => {
    //  await authPage.pause();
    await productPage.searchProduct("i");

    const count = await productPage.getProductCount();
    expect(count).toStrictEqual(10);
  }
);

test("search shows 'no matching' message when product is not found", async ({
  page,
}) => {
  const login = new LoginPage(page);
  await login.openPage();
  await login.login(CREDENTIALS.OPENCART_EMAIL, CREDENTIALS.OPENCART_PASSWORD);

  const product = new ProductPage(page);
  await product.searchProduct("asdlfkjlasdf"); // random string

  await product.assertVisibility("noMatchingProductMsg");
});
