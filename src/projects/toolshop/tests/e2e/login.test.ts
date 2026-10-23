//import { test, expect } from "@projects/toolshop/fixtures/ToolshopUI.fixture";
import { test } from "@projects/toolshop/fixtures/ToolshopLoginData.fixture";
import { loginUser } from "@projects/toolshop/testData/loginUser";

test.describe("Toolshop Login UI", () => {
  test("@smoke TC-2: Verify user is not allowed to login with invalid credentials", async ({
    loginPage,
  }) => {
    await loginPage.openLogin();
    await loginPage.login("invalid@email.com", "Invalid123$");
    await loginPage.expectLoginError();
  });

  test("@smoke TC-3: Verify user can login with valid credentials", async ({
    loginPage,
    accountPage,
    freshUser,
  }) => {
    await loginPage.openLogin();

    await loginPage.login(freshUser.email, freshUser.password);

    await accountPage.expectAccountPage();
  });
});
