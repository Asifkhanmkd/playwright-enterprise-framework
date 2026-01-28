import { test, expect } from "@core/authFixture";
import { Routes } from "@core/types/routes";

test("TC-06: user can logout successfully", async ({
  authPage,
  dashboardPage,
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
