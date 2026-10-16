import { Locator, Page } from "@playwright/test";
import { BasePage } from "@core/Base.page";

export class AccountPage extends BasePage {
  protected locatorMap: Record<string, Locator | ((...args: any[]) => Locator)>;

  constructor(page: Page) {
    super(page);

    this.locatorMap = {
      AccountHeading: page.locator('[data-test="page-title"]'),
      NavMenu: page.locator('[data-test="nav-menu"]'),
      SignOut: page.locator('[data-test="nav-sign-out"]'),
    };
  }

  async expectAccountPage(): Promise<void> {
    await this.assertVisibility("AccountHeading");
  }

  async logout(): Promise<void> {
    await this.safeClick("NavMenu");
    await this.safeClick("SignOut");
  }
}
