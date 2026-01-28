import fs from "fs";
import { Routes } from "@core/types/routes";
import type { Browser, Page } from "@playwright/test";
import path from "path";

const AUTH_STATE_PATH = path.resolve("Storage/auth-state.json");
const MAX_AGE_MS = 1000 * 60 * 60 * 12;

export function isAuthStateFresh(): boolean {
  if (!fs.existsSync(AUTH_STATE_PATH)) {
    return false;
  }

  const { mtimeMs } = fs.statSync(AUTH_STATE_PATH);

  /* if (Date.now() - mtimeMs < MAX_AGE_MS) {
    console.log("The authState is not fresh");
    return false; */

  return Date.now() - mtimeMs < MAX_AGE_MS;
}

/* const context = await browser.newContext({storageState: AUTH_STATE_PATH});

  const page = await context.newPage();

  const accountUrl = `https://naveenautomationlabs.com${Routes.ACCOUNT}`;

  await page.goto(accountUrl, { waitUntil: "domcontentloaded" });

  const isValid = page.url().includes("route=account/account");
   
  await context.close();

  return isValid;

}
 */
