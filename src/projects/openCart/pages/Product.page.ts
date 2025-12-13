import { BasePage } from "@core/Base.page";
import { Locator, expect, Page } from "@playwright/test";

export class ProductPage extends BasePage {
  protected locatorMap: Record<string, Locator | ((...args: any[]) => Locator)>;
  constructor(page: Page) {
    super(page);

    this.locatorMap = {
      searchBox: this.page.getByRole("textbox", { name: "Search" }),
      searchButton: page.locator("div#search button[type='button']"),
      productList: page.locator(".product-layout .product-thumb"),
      Product: (productName: string) =>
        page.locator(`.product-thumb:has-text("${productName}") a`).first(),
      noMatchingProductMsg: page.locator(
        "p:has-text('There is no product that matches the search criteria.')"
      ),
      addToCartButton: (productName: string) =>
        this.page.locator(
          `.product-thumb:has-text("${productName}") button:nth-child(1)"`
        ),
    };
  }

  async searchProduct(searchText: string): Promise<void> {
    await this.fill("searchBox", searchText);
    await this.click("searchButton");

    await Promise.any([
      this.resolveLocator("productList")
        .first()
        .waitFor({ state: "visible", timeout: 5000 }),
      this.resolveLocator("noMatchingProductMsg").waitFor({
        state: "visible",
        timeout: 5000,
      }),
    ]);
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.click("AddToCartButton", productName);

    await this.resolveLocator("CartTotal").waitFor({
      state: "visible",
      timeout: 5000,
    });
  }
  async getCartTotalText(): Promise<string> {
    const cartTotal = this.resolveLocator("CartTotal");
    const text = await cartTotal.textContent();
    return text ?? "";
  }

  async expectProductInResults(productName: string): Promise<void> {
    const product = this.resolveLocator("Product", productName);

    await expect(product).toBeVisible();
  }


  async getProductCount(): Promise<number> {
 return await this.resolveLocator("productList").count();

  }
}
