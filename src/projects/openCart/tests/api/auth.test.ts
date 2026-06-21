import { HttpClient } from "@shared/api/httpClient";
import { AuthClient } from "../../../../api/clients/authClient";
import { test, expect } from "@playwright/test";
import { AuthResponse } from "src/api/models/auth";
import { AuthSchema } from "src/api/schemas/authSchema";

test.describe("Auth API test", () => {
  test("@smoke @critical @modifies-auth TC:11 verify successful Login with valid credentials", async () => {
    const http = new HttpClient("https://dummyjson.com");
    await http.init();
    const authClient = new AuthClient(http);

    const response = await authClient.login("emilys", "emilyspass");
    const body = (await response.json()) as AuthResponse;

    expect(response.status()).toBe(200);
    // we don't have to assert the properties inside the respose body separetely when we can use AuthSchema
    /* expect(body).toHaveProperty("accessToken");
    expect(typeof body.accessToken).toBe("string");
    expect(body).toHaveProperty("refreshToken");
    expect(typeof body.refreshToken).toBe("string"); */

    // using authSchema instead

    const parsed = AuthSchema.safeParse(body);
    expect(parsed.success).toBe(true);

    if (!parsed.success) {
      console.error("Schema Validation Errors:", parsed.error.format());
    }

    await http.dispose();
  });
});
