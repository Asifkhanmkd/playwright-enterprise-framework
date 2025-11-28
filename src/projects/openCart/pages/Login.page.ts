import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../../core/Base.page";

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
    };
  }

  async openPage(): Promise<void> {
    await this.navigateTo("./");
  }

  async login(username: string, password: string): Promise<void> {
    await this.click("MyAccountMenu");
    await this.click("LoginLink");
    await this.fill("UserName", username);
    await this.fill("Password", password);
    await this.click("LoginButton");
  }
}
