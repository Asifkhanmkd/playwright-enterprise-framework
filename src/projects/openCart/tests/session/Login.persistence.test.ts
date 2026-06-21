import { test, expect } from "@core/hooks";
import { chromium } from "@playwright/test";
import { LoginPage } from "@projects/openCart/pages/Login.page";
import { DashboardPage } from "@projects/openCart/pages/Dashboard.page";
import { CREDENTIALS } from "@config/constants";
//import { logger } from "@utils/logger";
import fs from "fs";
import { Routes } from "@projects/openCart/types/routes";

const STORAGE_STATE_PATH = "Storage/auth-state.json";

test.describe("Login - Session PersistenceTest", () => {
  test("@regression TC-06: registered user session persists across browsers", async ({
    logger,
  }) => {
    await logger.info("🚀 Starting session persistence test");
    const browserA = await chromium.launch();
    const contextA = await browserA.newContext();
    const pageA = await contextA.newPage();
    const loginPage = new LoginPage(pageA);
    const dashboardPage = new DashboardPage(pageA);
    await logger.info("Opening login page in Browser A");
    await loginPage.openLogin();
    await loginPage.login(
      CREDENTIALS.OPENCART_EMAIL,
      CREDENTIALS.OPENCART_PASSWORD,
    );
    await logger.info("Verifying logout link is present");
    await dashboardPage.isElementPresent("logoutLink");

    await logger.info(`Saving storage state to: ${STORAGE_STATE_PATH}`);
    await contextA.storageState({ path: STORAGE_STATE_PATH });
    await browserA.close();
    await logger.info("Browser A closed, storage state saved");

    await logger.info("Launching Browser B with saved storage state");
    const browserB = await chromium.launch();
    const contextB = await browserB.newContext({
      storageState: STORAGE_STATE_PATH,
    });
    const pageB = await contextB.newPage();

    await logger.info(`Navigating to: ${Routes.ACCOUNT}`);
    await pageB.goto(Routes.ACCOUNT);

    const dashboardPageB = new DashboardPage(pageB);

    await logger.info("Verifying account breadcrumb in Browser B");
    await dashboardPageB.isElementPresent("accountBreadcrumb");

    await logger.info("Waiting 7 seconds for visual verification");
    await pageB.waitForTimeout(7000);

    await browserB.close();
    await logger.info("✅ Browser B closed, test completed successfully");
  });
});
