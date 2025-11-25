import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env") });

export function getEnv() {
  const requiredVal = ["BASE_URL"];

  requiredVal.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required variable: ${key}`);
    }
  });

  return {
    BASE_URL: process.env.BASE_URL!,
    RETRIES: Number(process.env.RETRIES || 0),
  };
}
