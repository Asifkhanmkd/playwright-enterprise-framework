import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../../core/Base.page";
import { Routes } from "@core/types/routes";

export class LoginPage extends BasePage {
  protected locatorMap: Record<string, Locator | ((...args: any[]) => Locator)>;

  constructor(page: Page) {
    super(page);

    this.locatorMap = {
      MyAccountMenu: page.locator("div[id='top-links'] a[title='My Account']"),
      LoginLink: page.locator(
        "ul.dropdown-menu.dropdown-menu-right > :nth-child(2) a"
      ),
      UserName: page.locator("#input-email"),
      Password: page.locator("#input-password"),
      LoginButton: page.locator("input[type='submit'][value='Login']"),
      invlidCreds: page.locator(".alert.alert-danger"),
    };
  }

  /* async openPage(): Promise<void> {
    await this.navigateTo("./");
  } */

  async openLogin(): Promise<void> {
    await this.goTo(Routes.HOME);
  }

  async login(username: string, password: string): Promise<void> {
    await this.safeClick("MyAccountMenu");
    await this.safeClick("LoginLink");
    await this.safeFill("UserName", username);
    await this.safeFill("Password", password);
    await this.safeClick("LoginButton");
  }

  async expectLoginErrorMessage() {
    await this.assertContainsText(
      "invlidCreds",
      "Warning: No match for E-Mail Address and/or Password."
    );
  }

  async clickOnlogButton() {
    await this.safeClick("LoginButton");
  }
}
