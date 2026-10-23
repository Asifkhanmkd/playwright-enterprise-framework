import { test, expect } from "@projects/toolshop/fixtures/ToolshopUI.fixture";

test.describe("Toolshop Home Page", () => {
  test("@smoke TC-1 verify user can navigate to home page ", async ({
    homePage,
  }) => {
    await homePage.open();
    const page = homePage.getPage();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/");
  });
});
