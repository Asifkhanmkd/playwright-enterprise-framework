import { HttpClient } from "@shared/api/httpClient";
import { AuthClient } from "@projects/dummyjson/api/clients/authClient";
import { test, expect } from "@playwright/test";
import { AuthResponse } from "@projects/dummyjson/api/models/auth";
import { AuthSchema } from "@projects/dummyjson/api/schemas/authSchema";
import { getEnv } from "@config/test.env";

test.describe("Auth API test", () => {
  test("@smoke @critical @modifies-auth TC:11 verify successful Login with valid credentials", async () => {
    const env = getEnv();
    const baseURL = env.DUMMYJSON_BASE_URL;
    const http = new HttpClient(baseURL);
    await http.init();
    const authClient = new AuthClient(http);

    const response = await authClient.login("emilys", "emilyspass");
    const body = (await response.json()) as AuthResponse;

    expect(response.status()).toBe(200);

    const parsed = AuthSchema.safeParse(body);
    expect(parsed.success).toBe(true);

    if (!parsed.success) {
      console.error("Schema Validation Errors:", parsed.error.format());
    }

    await http.dispose();
  });
});
