//import { expect, test } from "@playwright/test";
//import { expect, test } from "@core/hooks";

/* import { LoginPage } from "../pages/Login.page";
import { CREDENTIALS } from "../../../../config/constants";
import { DashboardPage } from "../pages/Dashboard.page";
import { test } from "@projects/openCart/tests/authFixture";
import type { Page } from "@playwright/test";

console.log(`[DEBUG] Login.test.ts is using: ${(test as any)._fingerprint}`);

test("verify user can login successfully ", async ({ page }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  await login.openPage();
  await login.login(CREDENTIALS.OPENCART_EMAIL, CREDENTIALS.OPENCART_PASSWORD);
  await dashboard.isElementPresent("logoutLink");
}); */

//---------------------------------------------------------------//

import { test, expect } from "@core/authFixture";
import { LoginPage } from "@projects/openCart/pages/Login.page";
import { DashboardPage } from "@projects/openCart/pages/Dashboard.page";
import { CREDENTIALS } from "../../../../config/constants";

console.log(`[DEBUG] Login.test.ts is using: ${(test as any)._fingerprint}`);
console.log("WORKER ID:", process.pid);

console.log("RESOLVED CREDENTIALS PATH:", require.resolve("config/constants"));

test("verify user can login successfully", async ({ page }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  await login.openLogin();
  await login.login(CREDENTIALS.OPENCART_EMAIL, CREDENTIALS.OPENCART_PASSWORD);
  console.log(
    "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
  );
  await dashboard.isElementPresent("logoutLink");
});
