import { test, expect } from "@projects/toolshop/fixtures/ToolshopApi.fixture";
import { HttpClient } from "@shared/api/httpClient";
import { AuthClient } from "@projects/toolshop/clients/authClient";
import { UsersClient } from "@projects/toolshop/clients/usetClient";
import { buildRegisterUser } from "../../testData/registerUser";
import { LoginResponse } from "@projects/toolshop/models/loginResponse";
import { User } from "@projects/toolshop/models/user";
import { LoginResponseSchema } from "@projects/toolshop/schemas/loginResponse.schema";
import { UserSchema } from "@projects/toolshop/schemas/user.schema";
import { getEnv } from "@config/test.env";

test.describe("Toolshop current user API", () => {
  test("@smoke @critical TC-03: get current authenticated user", async ({
    toolshopApi,
  }) => {
    const newUser = buildRegisterUser();
    const registerResponse = await toolshopApi.auth.register(newUser);
    expect(registerResponse.status()).toBe(201);
    const loginResponse = await toolshopApi.auth.login({
      email: newUser.email,
      password: newUser.password,
    });

    expect(loginResponse.status()).toBe(200);
    const loginBody = (await loginResponse.json()) as LoginResponse;
    const currentUserResponse = await toolshopApi.users.getCurrentUser(
      loginBody.access_token,
    );
    expect(currentUserResponse.status()).toBe(200);
    const currentUser = (await currentUserResponse.json()) as User;
    const parsed = UserSchema.safeParse(currentUser);

    expect(parsed.success).toBe(true);

    expect(currentUser.email).toBe(newUser.email);

    expect(currentUser.first_name).toBe(newUser.first_name);

    expect(currentUser.last_name).toBe(newUser.last_name);

    expect(currentUser.phone).toBe(newUser.phone);
  });
});
