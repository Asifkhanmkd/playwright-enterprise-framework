//import { test, expect } from "@core/authFixture";
import { LoginPage } from "@projects/openCart/pages/Login.page";
import { DashboardPage } from "@projects/openCart/pages/Dashboard.page";
import { CREDENTIALS } from "@config/constants";
import { Routes } from "@core/types/routes";
//import { logger } from "@core/utils/logger";
import { test, expect } from "@core/uiLogin.fixture";

test.describe("Login - Pasitive Scenarios", () => {
  test("@smoke @critical TC-01: verify user can successfully login with valid credentials", async ({
    pageWithLogin,
    logger,
  }) => {
    const dashboardPage = new DashboardPage(pageWithLogin);

    await dashboardPage.isElementPresent("logoutLink");
  });

  test("@critical TC-2: authenticated user can access account dashboard via direct URL", async ({
    pageWithLogin,
    logger,
  }) => {
    const dashboardPage = new DashboardPage(pageWithLogin);

    // user is ALREADY logged in here

    logger.info(`Naviagting to ${Routes.HOME}`);
    await pageWithLogin.goto(Routes.HOME);
    logger.info(`Naviagting to ${Routes.ACCOUNT}`);
    await pageWithLogin.goto(Routes.ACCOUNT);

    await dashboardPage.isElementPresent("accountBreadcrumb");
  });
});
