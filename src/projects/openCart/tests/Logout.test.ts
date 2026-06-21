// src\projects\openCart\tests\Logout.test.ts

import { test, expect } from "@projects/openCart/fixtures/authFixture";
import { Routes } from "@projects/openCart/types/routes";

test("@smoke @critical @modifies-auth TC-06: user can logout successfully", async ({
  authPage,
  dashboardPage,
  logger,
}) => {
  await authPage.goto(Routes.ACCOUNT);
  // Act: click logout
  await dashboardPage.doLogout("logoutLink");

  console.log("Logout button clicked successfully");

  // Assert 1: redirected to logout route
  await expect(authPage).toHaveURL(/route=account\/logout/);
  console.log("Page navigated to route=account/logout");

  // Act: navigate back to home
  await authPage.goto(Routes.HOME);
  console.log("Navigated back to Home page");

  console.log("Checking visibility of Login Button");

  await dashboardPage.isLoginButtonVisible("loginLink");

  // Assert 3: protected page no longer accessible
  await authPage.goto(Routes.ACCOUNT);
  await expect(authPage).toHaveURL(/route=account\/login/);
});
