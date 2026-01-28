//import { test, expect } from "@core/authFixture";
import { LoginPage } from "@projects/openCart/pages/Login.page";
import { DashboardPage } from "@projects/openCart/pages/Dashboard.page";
import { CREDENTIALS } from "@config/constants";
import { Routes } from "@core/types/routes";
import { logger } from "@core/utils/logger";
import { test, expect } from "@core/uiLogin.fixture";

test.describe("Login - Pasitive Scenarios", () => {
  test("TC-01: verify user can successfully login with valid credentials", async ({
    pageWithLogin,
  }) => {
    const dashboardPage = new DashboardPage(pageWithLogin);

    await dashboardPage.isElementPresent("logoutLink");
  });

  test("TC-2: authenticated user can access account dashboard via direct URL", async ({
    pageWithLogin,
  }) => {
    const dashboardPage = new DashboardPage(pageWithLogin);

    // user is ALREADY logged in here
    await pageWithLogin.goto(Routes.HOME);
    await pageWithLogin.goto(Routes.ACCOUNT);

    await dashboardPage.isElementPresent("accountBreadcrumb");
  });
});

/* Playwright sees the test needs pageWithLogin

It resolves the fixture before the test body runs

The login workflow executes

The logged-in page is handed to the test

Your assertion runs against an already-authenticated state */
