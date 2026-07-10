//import { test, expect } from "@playwright/test";
import { test, expect } from "@projects/toolshop/fixtures/ToolshopApi.fixuture";
import { buildRegisterUser } from "../testData/registerUser";
import { RegisterResponse } from "@projects/toolshop/api/models/registerResponse";
import { RegisterResponseSchema } from "@projects/toolshop/api/schemas/registerResponse.schema";

test.describe("Toolshop Registeration API", () => {
  test(" @regression TC-01: registration is rejected when password has appeared in a data leak", async ({
    toolshopApi,
  }) => {
    const user = buildRegisterUser({ password: "Password123!" });
    const response = await toolshopApi.auth.register(user);
    const body = await response.json();
    expect(response.status()).toBe(422);
    expect(body.password).toContainEqual(expect.stringContaining("data leak"));
  });

  test("@smoke TC-02: register a new user", async ({ toolshopApi }) => {
    const user = buildRegisterUser();
    const response = await toolshopApi.auth.register(user);
    const body = (await response.json()) as RegisterResponse;
    expect(response.status()).toBe(201);

    const parsed = RegisterResponseSchema.safeParse(body);

    expect(parsed.success).toBe(true);

    expect(body.email).toBe(user.email);
    expect(body.first_name).toBe(user.first_name);
    expect(body.last_name).toBe(user.last_name);
  });
});
