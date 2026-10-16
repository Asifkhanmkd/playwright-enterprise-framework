import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "@core/Base.page";

export class ProductCataloguePage extends BasePage {
  protected locatorMap!: Record<
    string,
    Locator | ((...args: any[]) => Locator)
  >;

  constructor(page: Page) {
    super(page);

    this.locatorMap = {
      ProductCards: page.locator('a.card[data-test^="product-"]'),
      ProductName: page.locator('[data-test="product-name"]'),
      ProductPrices: page.locator('[data-test="prduct-price"]'),
      ProductCard: (productId: string) =>
        page.locator('[data-test="product-${productId}"]'),
    };
  }

  async selectProduct(productId: string): Promise<void> {
    await this.safeClick("ProductCard", productId);
  }

  async selectFirstProduct(): Promise<void> {
    await this.resolveLocator("ProductCards").first().click();
  }

  async expectProductsDisplayed(): Promise<void> {
    await this.resolveLocator("ProductCards")
      .first()
      .waitFor({ state: "visible", timeout: 10_000 });
  }

  async getFirstProductName(): Promise<string> {
    return (
      await this.resolveLocator("ProductName").first().innerText()
    ).trim();
  }
}
