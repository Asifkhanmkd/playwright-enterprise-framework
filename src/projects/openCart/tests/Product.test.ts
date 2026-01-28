//import { test, expect } from "./authFixture";
import { test, expect } from "@core/authFixture";
import { DashboardPage } from "@projects/openCart/pages/Dashboard.page";
import { ProductPage } from "@projects/openCart/pages/Product.page";
import { LoginPage } from "@projects/openCart/pages/Login.page";
import { CREDENTIALS } from "../../../../config/constants";

console.log("[DEBUG] USING EXTENDED TEST IN PRODUCT");
console.log("🔥 Product.test.ts loaded");

test("Search a product", async ({ page }) => {
  const login = new LoginPage(page);
  await login.openLogin();
  await login.login(CREDENTIALS.OPENCART_EMAIL, CREDENTIALS.OPENCART_PASSWORD);

  const product = new ProductPage(page);
  await product.searchProduct("MacBook Air1");
  await product.expectProductInResults("MacBook Air1");
});

 test("Search returns multiple products", async ({ productPageWithAuth }) => {
  await productPageWithAuth.searchProduct("i");
  await productPageWithAuth.numberOfExpectedProductReturned(10);
});

test("search shows 'no matching' message", async ({ page }) => {
  const login = new LoginPage(page);
  await login.openLogin();
  await login.login(CREDENTIALS.OPENCART_EMAIL, CREDENTIALS.OPENCART_PASSWORD);

  const product = new ProductPage(page);
  await product.searchProduct("asdlfkjlasdf");
  // await product.assertVisibility("noMatchingProductMsg");
  await product.expectNoMatchingProductMessage();
});
 
