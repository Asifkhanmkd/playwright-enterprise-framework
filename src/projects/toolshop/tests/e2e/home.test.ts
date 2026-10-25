import { test, expect } from "@projects/toolshop/fixtures/ToolshopUI.fixture";
import { getEnv } from "@config/test.env";
const env = getEnv();

test.describe("Toolshop Home Page", () => {
  test("@smoke TC-1 verify user can navigate to home page ", async ({
    homePage,
  }) => {
    await homePage.open();
    const page = homePage.getPage();
    const expectedHomeUrl = new URL("/", env.TOOLSHOP_UI_BASE_URL).href;
    await expect(page).toHaveURL(expectedHomeUrl);
  });
});
