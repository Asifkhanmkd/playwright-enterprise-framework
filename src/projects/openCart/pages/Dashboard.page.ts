import { Page, Locator } from "@playwright/test";
import { BasePage } from "@core/Base.page";

export class DashboardPage extends BasePage {
  protected locatorMap: Record<string, Locator | ((...args: any[]) => Locator)>;

  constructor(page: Page) {
    super(page);

    this.locatorMap = {
      logoutLink: this.page.getByRole("link", { name: "Logout" }),
    };
  }

  async isElementPresent(key: string, ...args: any[]) {
    await this.assertVisibility(key, ...args);
  }
}
