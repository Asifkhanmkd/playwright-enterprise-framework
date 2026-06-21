
// src\projects\openCart\tests\auth\Login.positive.test.ts

//import { test, expect } from "@core/authFixture";
import { LoginPage } from "@projects/openCart/pages/Login.page";
import { DashboardPage } from "@projects/openCart/pages/Dashboard.page";
import { CREDENTIALS } from "@config/constants";
import { Routes } from "@projects/openCart/types/routes";
//import { logger } from "@core/utils/logger";
import { test, expect } from "@projects/openCart/fixtures/uiLogin.fixture";


test.describe("Login - Pasitive Scenarios", () => {
  test("@smoke @critical TC-01: verify user can successfully login with valid credentials", async ({
    pageWithLogin,
    logger,
  }) => {
    const dashboardPage = new DashboardPage(pageWithLogin);

    await dashboardPage.isElementPresent("logoutLink");
  });
});
