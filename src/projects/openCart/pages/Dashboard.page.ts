import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../../core/Base.page";

export class DashboardPage extends BasePage {
  protected locatorMap: Record<string, Locator | ((...args: any[]) => Locator)>;

  constructor(page: Page) {
    super(page);

    this.locatorMap = {
      logoutLink: this.page.getByRole("link", { name: "Logout" }),
      accountBreadcrumb: page.getByText("Account", { exact: true }),
      //loginLink: page.getByRole("link", { name: /login/i }),
      // loginLink: page.getByRole("link", { name: "Login" }),
      loginLink: page.locator(
        "ul.dropdown-menu.dropdown-menu-right > :nth-child(2) a"
      ),
      MyAccountMenu: page.locator("div[id='top-links'] a[title='My Account']"),
    };
  }

  async isElementPresent(key: string, ...args: any[]) {
    await this.assertVisibility(key, ...args);
  }

  async doLogout(key: string) {
    await this.safeClick(key);
  }

  async isLoginButtonVisible(key: string) {
    await this.safeClick("MyAccountMenu");
    await this.assertVisibility(key);
  }
}
