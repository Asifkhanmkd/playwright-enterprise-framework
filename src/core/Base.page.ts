import { Page, Locator, expect } from "@playwright/test";
import { logger } from "./utils/logger";
import { Routes } from "@core/types/routes";
type LocatorEntry = Locator | ((...args: any[]) => Locator);

export abstract class BasePage {
  protected readonly page: Page;
  protected abstract locatorMap: Record<string, LocatorEntry>;

  constructor(page: Page) {
    this.page = page;
  }

  // Needed only to use the protected property "page" outside the child pages of BasePage i.e. in fixtures
  // Will be removed later

  public getPage(): Page {
    return this.page;
  }

  // Navigating To AUT (Application Under Test)

  /* async navigateTo(path: string): Promise<void> {
    await this.page.goto(path, {
      waitUntil: "domcontentloaded",
      timeout: 10_000,
    });
    logger.info(`Current URL: ${this.page.url()}`);
  } */


  protected async goTo(route:Routes){
    await this.page.goto(route,{
    waitUntil: "domcontentloaded",
    timeout: 15000
    })
  }

  // Centralizer locator Resolver

  protected resolveLocator(key: string, ...args: any[]): Locator {
    const entry = this.locatorMap[key];

    if (!entry) {
      logger.error(`Locator not found: ${key}`);
      throw new Error(
        `No locator found for the key: "${key}" in ${this.constructor.name}`
      );
    }

    if (typeof entry === "function") {
      return entry(...args);
    }
    return entry;
  }

  /* async assertVisibility(key: string, ...args: any[]): Promise<void> {
    logger.info(`Asserting visibility of ${key}`);
    const locator = this.resolveLocator(key, ...args);
    await expect(locator).toBeVisible({ timeout: 5000 });
  } */

  //----------------------------------- Saftey Layer ---------------------------------------------//

  protected async safeClick(key: string, ...args: any[]): Promise<void> {
    const locator = this.resolveLocator(key, ...args);
    await locator.waitFor({ state: "visible", timeout: 10000 });
    await locator.scrollIntoViewIfNeeded();

    try {
      await locator.click({ timeout: 5000 });
    } catch {
      await locator.waitFor({ state: "attached" });
      await locator.click();
    }
  }

  protected async safeFill(
    key: string,
    value: string,
    ...args: any[]
  ): Promise<void> {
    const locator = this.resolveLocator(key, ...args);

    await locator.waitFor({ state: "visible", timeout: 10_000 });
    await locator.fill("");
    await locator.fill(value);
  }

  protected async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState("networkidle", {
      timeout: 15_000,
    });
  }

  async assertVisibility(key: string, ...args: any[]): Promise<void> {
    const locator = this.resolveLocator(key, ...args);
    logger.info(`Asserting visibility of ${key} (${args.join(", ")})`);
    await expect(
      locator,
      `Expected "${key}" to be visible in ${this.constructor.name}`
    ).toBeVisible({ timeout: 10000 });
  }

  protected async assertHidden(key: string, ...args: any[]): Promise<void> {
    const locator = this.resolveLocator(key, ...args);

    await expect(
      locator,
      `Expected "${key}" to be hidden in "${this.constructor.name}"`
    ).toBeHidden({ timeout: 10000 });
  }

  protected async assertContainsText(
    key: string,
    expected: string,
    ...args: any[]
  ): Promise<void> {
    const locator = this.resolveLocator(key, ...args);

    await expect(
      locator,
      `Expected "${key}" text to contain "${expected}"`
    ).toContainText(expected, { timeout: 10000 });
  }

  protected async assertCount(
    key: string,
    expected: number,
    ...args: any[]
  ): Promise<void> {
    const locator = this.resolveLocator(key, ...args);

    const count = await locator.count();

    expect(
      count,
      `Expected "${key}" count to be "${expected}" but got ${count}`
    ).toBe(expected);

    logger.info(`The number of Products returned are "${count}"`);
  }
}
