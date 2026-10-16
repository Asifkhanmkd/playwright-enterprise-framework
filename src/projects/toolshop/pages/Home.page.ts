import { BasePage } from "@core/Base.page";
import {Locator, Page} from "@playwright/test"

export class HomePage extends BasePage {
  protected locatorMap = {};

  async open(): Promise<void> {
    await this.goTo("/");
  }
}
