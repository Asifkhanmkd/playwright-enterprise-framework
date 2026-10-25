import { test, expect } from "@projects/toolshop/fixtures/ToolshopAuth.fixture";

test.describe("Toolshop logout", async () => {
  test("@smoke TC-04: Verify user can logout successfully", async ({
    accountPage,
    page,
  }) => {
    await page.goto("/account");
    await accountPage.expectAccountPage();
    await accountPage.logout();
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
