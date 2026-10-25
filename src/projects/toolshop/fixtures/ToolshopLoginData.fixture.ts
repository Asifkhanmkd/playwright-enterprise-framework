import { mergeTests, expect } from "@playwright/test";
import { test as uiTest } from "@projects/toolshop/fixtures/ToolshopUI.fixture";
import { test as apiTest } from "@projects/toolshop/fixtures/ToolshopApi.fixture";
import { buildRegisterUser } from "../testData/registerUser";
import { RegisterResponse } from "../models/registerResponse";
import { LoginResponse } from "../models/loginResponse";
import { getEnv } from "@config/test.env";

const env = getEnv();

const merged = mergeTests(uiTest, apiTest);

export const test = merged.extend<{
  freshUser: ReturnType<typeof buildRegisterUser>;
}>({
  freshUser: async ({ toolshopApi }, use) => {
    const user = buildRegisterUser();
    const registerResponse = await toolshopApi.auth.register(user);
    expect(registerResponse.status()).toBe(201);

    const registeredUser = (await registerResponse.json()) as RegisterResponse;

    if (!registeredUser.id) {
      throw new Error("User registered but no Id returned");
    }
    try {
      await use(user);
    } finally {
      const adminEmail = env.TOOLSHOP_ADMIN_EMAIL;
      const adminPassword = env.TOOLSHOP_ADMIN_PASSWORD;

      if (!adminEmail || !adminPassword) {
        throw new Error(
          "Set the adminEmail and adminPassword inside the .env folder",
        );
      }

      const adminLoginResponse = await toolshopApi.auth.login({
        email: adminEmail,
        password: adminPassword,
      });

      expect(adminLoginResponse.status()).toBe(200);
      const adminLogin = (await adminLoginResponse.json()) as LoginResponse;

      if (!adminLogin.access_token) {
        throw new Error("Admin login returned no access token.");
      }

      const deleteResponse = await toolshopApi.users.deleteUser(
        registeredUser.id,
        adminLogin.access_token,
      );
      expect(
        deleteResponse.status(),
        `Failed to delete test user ${registeredUser.id}`,
      ).toBe(204);
    }
  },
});

export { expect };
