//src\core\utils\retryNavigation

import { Page } from "@playwright/test";

export type RetryNavigationOptions = {
  retries?: number;
  delayMs?: number;
  waitUntil?: "load" | "domcontentloaded" | "networkidle";
  timeout?: number;
};

export async function retryNavigation(
  page: Page,
  url: string,
  options: RetryNavigationOptions = {},
): Promise<void> {
  const {
    retries = 2,
    delayMs = 2000,
    waitUntil = "domcontentloaded",
    timeout = 25000,
  } = options;

  let lastError: unknown;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      await page.goto(url, {
        waitUntil,
        timeout,
      });

      return;
    } catch (error) {
      lastError = error;

      if (attempt <= retries) {
        console.warn(
          ` Navigation attempt ${attempt} failed for "${url}" Retrying in ${delayMs} ms.......`,
        );

        await page.waitForTimeout(delayMs);
      }
    }
  }

  throw lastError;
}
