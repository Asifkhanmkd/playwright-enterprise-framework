import { Locator, Page } from "@playwright/test";
import { BasePage } from "@core/Base.page";

export class ProductDetailsPage extends BasePage {
  protected locatorMap!: Record<
    string,
    Locator | ((...args: any[]) => Locator)
  >;

  constructor(page: Page) {
    super(page);

    this.locatorMap = {
      ProductName: page.locator('[data-test= "product-name"]'),
      UnitPrice: page.locator('[data-test="unit-price"]'),
      ProductDescription: page.locator('[data-test= "product-description"]'),
      Quantity: page.locator('[data-test="quantity"]'),
      IncreaseQuantity: page.locator('[data-test="increase-quantity"]'),
      DecreaseQuantity: page.locator('[data-test="decrease-quantity"]'),
    };
  }

  async expectProductDetailsDisplayed(): Promise<void> {
    await this.assertVisibility("ProductName");
    await this.assertVisibility("UnitPrice");
    await this.assertVisibility("ProductDescription");
  }

  async getProductName(): Promise<string> {
    return (await this.resolveLocator("ProductName").innerText()).trim();
  }

  async increaseQuantity(): Promise<void> {
    await this.safeClick("IncreaseQuantity");
  }

  async decreaseQuantity() {
    await this.safeClick("DecreaseQuantity");
  }

  async getQuantity(): Promise<number> {
    const value = await this.resolveLocator("Quantity").inputValue();
    return Number(value);
  }
}
