import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "@projects/openCart/pages/Login.page";
import { DashboardPage } from "@projects/openCart/pages/Dashboard.page";
import { CREDENTIALS } from "@config/constants";
import { logger } from "@utils/logger";
import fs from "fs";
import { Routes } from "@core/types/routes";

const STORAGE_STATE_PATH = "Storage/auth-state.json";

test.describe("Login - Session PersistenceTest", () => {
  test("user session persists across browsers", async () => {
    const browserA = await chromium.launch();
    const contextA = await browserA.newContext();
    const pageA = await contextA.newPage();
    const loginPage = new LoginPage(pageA);
    const dashboardPage = new DashboardPage(pageA);
    await loginPage.openLogin();
    await loginPage.login(
      CREDENTIALS.OPENCART_EMAIL,
      CREDENTIALS.OPENCART_PASSWORD
    );

    await dashboardPage.isElementPresent("logoutLink");

    await contextA.storageState({ path: STORAGE_STATE_PATH });
    await browserA.close();

    const browserB = await chromium.launch();
    const contextB = await browserB.newContext({
      storageState: STORAGE_STATE_PATH,
    });
    const pageB = await contextB.newPage();

    pageB.goto(Routes.ACCOUNT);

    const dashboardPageB = new DashboardPage(pageB);
    dashboardPageB.isElementPresent("accountBreadcrumb");

    await pageB.waitForTimeout(7000);

    await browserB.close();
  });
});
