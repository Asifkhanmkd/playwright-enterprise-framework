import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/Login.page";
import { CREDENTIALS } from "../../../../config/constants";

test("verify user can login successfully ", async ({ page }) => {
  const login = new LoginPage(page);
  await login.openPage();
  await login.login(CREDENTIALS.OPENCART_EMAIL, CREDENTIALS.OPENCART_PASSWORD);
  
});
