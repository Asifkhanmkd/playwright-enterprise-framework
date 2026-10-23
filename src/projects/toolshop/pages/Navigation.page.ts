import { BasePage } from "@core/Base.page";
import { Locator, Page } from "@playwright/test";

export class NavigationPage extends BasePage {
  protected locatorMap!: Record<
    string,
    Locator | ((...args: any[]) => Locator)
  >;

  constructor(page: Page) {
    super(page);

    this.locatorMap = {
      CategoriesMenu: page.locator('[data-test="nav-categories"]'),
      Category: (category: string) =>
        page.getByRole("link", { name: category, exact: true }),
    };
  }

  async openCategories(): Promise<void> {
    await this.safeClick("CategoriesMenu");
  }

  async selectCategory(category: string) {
    await this.safeClick("Category", category);
  }
}
