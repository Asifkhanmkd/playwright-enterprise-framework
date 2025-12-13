//import { expect, test } from "@playwright/test";
import { expect, test } from "@core/hooks";
import { LoginPage } from "../pages/Login.page";
import { CREDENTIALS } from "../../../../config/constants";
import { DashboardPage } from "../pages/Dashboard.page";

test("verify user can login successfully ", async ({ page }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  await login.openPage();
  await login.login(CREDENTIALS.OPENCART_EMAIL, CREDENTIALS.OPENCART_PASSWORD);
  await dashboard.isElementPresent("logoutLink");
});
