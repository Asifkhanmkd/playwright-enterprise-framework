//import { test, expect } from "@playwright/test";
import { test, expect } from "@core/testBase";
import { LoginPage } from "@projects/openCart/pages/Login.page";
import { Routes } from "@core/types/routes";
import { CREDENTIALS } from "@config/constants";

test.describe("Login - Negative Scenarios", () => {
  test("@regression TC-03: login fails with invalid email", async ({
    page,
    logger,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLogin();
    await loginPage.login("wrongEmail", CREDENTIALS.OPENCART_PASSWORD);

    await loginPage.expectLoginErrorMessage();
  });

  test("@regression TC-04: login fails with invalid password", async ({
    page,
    logger,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLogin();
    await loginPage.login(CREDENTIALS.OPENCART_EMAIL, "wrongPassword");

    await loginPage.expectLoginErrorMessage();
  });

  test("@regression TC-05: login fails with empty credentials", async ({
    page,
    logger,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLogin();
    await loginPage.login("", "");
    await loginPage.clickOnlogButton();

    await loginPage.expectLoginErrorMessage();
  });
});
