import { test, expect } from "@projects/toolshop/fixtures/ToolshopUI.fixture";
import { RegistrationPage } from "@projects/toolshop/pages/Registration.page";

test.describe("Toolshop Registration", async () => {
  test("@smoke TC-5: Verify registration form validation for empty submission", async ({
    page,
    registrationPage,
  }) => {
    await registrationPage.openRegistration();
    await registrationPage.register();
    await registrationPage.expectValidationErrors();
  });
});
