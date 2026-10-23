import { Locator, Page } from "@playwright/test";
import { BasePage } from "@core/Base.page";

export class RegistrationPage extends BasePage {
  protected locatorMap!: Record<
    string,
    Locator | ((...args: any[]) => Locator)
  >;

  constructor(page: Page) {
    super(page);

    this.locatorMap = {
      FirstName: page.locator('[data-test="first-name"]'),
      LastName: page.locator(`[data-test="last-name"]`),
      DataOfBirth: page.locator(`[data-test="dob"]`),
      Country: page.locator('[data-test= "country"]'),
      PostalCode: page.locator('[data-test= "postal_code"]'),
      HouseNumber: page.locator('[data-test="house-number"]'),
      Street: page.locator('[data-test="street"]'),
      City: page.locator('[data-test="city"]'),
      State: page.locator('[data-test="state"]'),
      Phone: page.locator('[data-test="phone"]'),
      Email: page.locator('[data-test="email"]'),
      Password: page.locator('[data-test= "password"]'),
      RegisterButton: page.locator('[data-test= "register-submit"]'),

      // validation-message locators
      FirstNameError: page.locator('[data-test= "first-name-error"]'),
      LastNameError: page.locator('[data-test= "last-name-error"]'),
      DateOfBirthError: page.locator('[data-test= "dob-error"]'),
    };
  }

  async openRegistration(): Promise<void> {
    await this.goTo("/auth/register");
  }

  async register(): Promise<void> {
    await this.safeClick("RegisterButton");
  }

  async fillRegistrationForm(
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    country: string,
    postcode: string,
    houseNumber: string,
    street: string,
    city: string,
    state: string,
    phone: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.safeFill("FirstName", firstName);
    await this.safeFill("lastName", lastName);
    await this.safeFill("DateOfBirth", dateOfBirth);
    await this.safeFill("Country", country);
    await this.safeClick("PostalCode", postcode);
    await this.safeFill("HouseNumber", houseNumber);
    await this.safeFill("Street", street);
    await this.safeFill("City", city);
    await this.safeFill("State", state);
    await this.safeFill("Phone", phone);
    await this.safeFill("Email", email);
    await this.safeFill("Password", password);
  }

  async expectValidationErrors(): Promise<void> {
    await this.assertContainsText("FirstNameError", "First name is required");

    await this.assertContainsText("LastNameError", "Last name is required");

    await this.assertContainsText(
      "DateOfBirthError",
      "Date of Birth is required",
    );
  }
}
