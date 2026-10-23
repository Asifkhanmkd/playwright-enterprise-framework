import { Page, Locator } from "@playwright/test";
import { BasePage } from "@core/Base.page";

export class LoginPage extends BasePage {
  protected locatorMap: Record<string, Locator | ((...args: any[]) => Locator)>;
  constructor(page: Page) {
    super(page);

    this.locatorMap = {
      Email: page.locator('[data-test="email"]'),
      Password: page.locator('[data-test="password"]'),
      LoginButton: page.locator('[data-test="login-submit"]'),
      LoginError: page.getByText("Invalid email or password"),
      RegistrationLink: page.locator('[data-test="register-link"]'),
    };
  }

  async openLogin(): Promise<void> {
    await this.goTo("/auth/login");
  }

  async login(email: string, password: string): Promise<void> {
    await this.safeFill("Email", email);
    await this.safeFill("Password", password);
    await this.safeClick("LoginButton");
  }

  async expectLoginError(): Promise<void> {
    await this.assertContainsText("LoginError", "Invalid email or password");
  }
}
