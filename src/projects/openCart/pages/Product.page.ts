import { Routes } from "@core/types/routes";
import { BasePage } from "../../../core/Base.page";
import { Locator, expect, Page } from "@playwright/test";
import { logger } from "@utils/logger";

export class ProductPage extends BasePage {
  protected locatorMap: Record<string, Locator | ((...args: any[]) => Locator)>;
  constructor(page: Page) {
    super(page);

    this.locatorMap = {
      searchBox: page.getByRole("textbox", { name: "Search" }),
      searchButton: page.locator("div#search button[type='button']"),
      productList: page.locator(".product-layout .product-thumb"),
      product: (productName: string) =>
        page.locator(`.product-thumb:has-text("${productName}") a`).first(),

      noMatchingProductMsg: page.locator(
        "p:has-text('There is no product that matches the search criteria.')"
      ),
      addToCartButton: (productName: string) =>
        page.locator(
          `.product-thumb:has-text("${productName}") button:nth-child(1)`
        ),

      cartTotal: page.locator("#cart-total"),
    };
  }

  async open(): Promise<void> {
    await this.page.goto(Routes.HOME);
  }

  async searchProduct(searchText: string): Promise<void> {
    logger.info(`Navigating to ${Routes.HOME}`);
    await this.open();
    logger.info(`Entering the search term "${searchText}"`);
    await this.safeFill("searchBox", searchText);
    logger.info(`Click on search button `);
    await this.safeClick("searchButton");
    logger.info(`Current URL: ${this.page.url()}`);
  }

  async addProductToCart(productName: string): Promise<void> {
    logger.info("Clicking on 'addToCartButton'");
    await this.safeClick("addToCartButton", productName);

    await this.resolveLocator("cartTotal").waitFor({
      state: "visible",
      timeout: 5000,
    });
  }
  async getCartTotalText(): Promise<string> {
    const cartTotal = this.resolveLocator("CartTotal");
    logger.info("Getting the cart total items/value");
    const text = await cartTotal.textContent();
    return text ?? "";
  }

  async expectProductInResults(productName: string): Promise<void> {
    logger.info(`Expecting product "${productName}" to appear in results`);
    await this.assertVisibility("product", productName);
  }

  async numberOfExpectedProductReturned(expected: number) {
    this.assertCount("productList", expected);
  }

  async expectNoMatchingProductMessage() {
    await this.assertContainsText(
      "noMatchingProductMsg",
      "There is no product that matches the search criteria."
    );
  }
}
