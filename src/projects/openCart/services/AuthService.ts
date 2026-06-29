import { Page } from "@playwright/test";
import { LoginPage } from "@projects/openCart/pages/Login.page";
import { CREDENTIALS } from "@config/constants";

export class AuthService {
  static async login(page: Page): Promise<void> {
    const loginPage = new LoginPage(page);

    await loginPage.openLogin();

    await loginPage.login(
      CREDENTIALS.OPENCART_EMAIL,
      CREDENTIALS.OPENCART_PASSWORD,
    );
  }
}
