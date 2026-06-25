import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env") });

export function getEnv() {
  const requiredValues = ["OPENCART_BASE_URL", "DUMMYJSON_BASE_URL"];

  requiredValues.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required variable: ${key}`);
    }
  });

  return {
    OPENCART_BASE_URL: process.env.OPENCART_BASE_URL!,
    DUMMYJSON_BASE_URL: process.env.DUMMYJSON_BASE_URL!,
    // RETRIES: Number(process.env.RETRIES || 0),
  };
}
