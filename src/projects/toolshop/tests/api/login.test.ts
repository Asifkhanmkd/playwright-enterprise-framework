import { LoginResponse } from "@projects/toolshop/api/models/loginResponse";
import { loginUser } from "../testData/loginUser";
import { LoginResponseSchema } from "@projects/toolshop/api/schemas/loginResponse.schema";
import { test, expect } from "@projects/toolshop/fixtures/ToolshopApi.fixuture";

test.describe("Toolshop Login API test", () => {
  test("@smoke @critical @modified-auth TC: user can login with valid credential", async ({
    toolshopApi,
  }) => {
    const response = await toolshopApi.auth.login(loginUser);
    const body = (await response.json()) as LoginResponse;

    expect(response.status()).toBe(200);
    const parsed = LoginResponseSchema.safeParse(body);
    expect(parsed.success).toBe(true);

    expect(body.token_type).toBe("bearer");
    expect(body.access_token).toBeTruthy();
    expect(body.expires_in).toBeGreaterThan(0);
  });
});
