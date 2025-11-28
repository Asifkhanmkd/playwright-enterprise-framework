import { Page, Locator, expect } from "@playwright/test";

type LocatorEntry = Locator | ((...args: any[]) => Locator);

export abstract class BasePage {
  protected readonly page: Page;
  protected abstract locatorMap: Record<string, LocatorEntry>;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigating To AUT (Application Under Test)

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path, {
      waitUntil: "domcontentloaded",
      timeout: 10_000,
    });
  }

  // Centralizer locator Resolver

  protected resolveLocator(key: string, ...args: any[]): Locator {
    const entry = this.locatorMap[key];

    if (!entry) {
      throw new Error(
        `No locator found for the key: "${key}" in ${this.constructor.name}`
      );
    }

    if (typeof entry === "function") {
      return entry(...args);
    }
    return entry;
  }

  async click(key: string, ...args: any[]): Promise<void> {
    const locator = this.resolveLocator(key, ...args);
    await locator.waitFor({ state: "visible" });
    await locator.click();
  }

  async fill(key: string, value: string, ...args: any[]): Promise<void> {
    const locator = this.resolveLocator(key, ...args);
    await locator.waitFor({ state: "visible" });
    await locator.fill(value);
  }

  async assertVisibility(key: string, ...args: any[]): Promise<void> {
    const locator = this.resolveLocator(key, ...args);
    await expect(locator).toBeVisible();
  }
}
