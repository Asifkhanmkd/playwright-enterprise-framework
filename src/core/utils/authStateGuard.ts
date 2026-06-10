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

  return Date.now() - mtimeMs < MAX_AGE_MS;
}
