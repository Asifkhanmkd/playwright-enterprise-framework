import { test, expect } from "@playwright/test";
import { HttpClient } from "@shared/api/httpClient";
import { AuthClient } from "@projects/toolshop/api/clients/authClient";
import { UsersClient } from "@projects/toolshop/api/clients/usetClient";
import { buildRegisterUser } from "../testData/registerUser";
import { LoginResponse } from "@projects/toolshop/api/models/loginResponse";
import { User } from "@projects/toolshop/api/models/user";
import { LoginResponseSchema } from "@projects/toolshop/api/schemas/loginResponse.schema";
import { UserSchema } from "@projects/toolshop/api/schemas/user.schema";
import { getEnv } from "@config/test.env";

test.describe("Toolshop current user API", () => {
  test("@smoke @critical TC-03: get current authenticated user", async () => {
    const env = getEnv();
    const http = new HttpClient(env.TOOLSHOP_API_BASE_URL);
    await http.init();
    const authClient = new AuthClient(http);
    const userClient = new UsersClient(http);
    const newUser = buildRegisterUser();
    const registerResponse = await authClient.register(newUser);
    expect(registerResponse.status()).toBe(201);
    const loginResponse = await authClient.login({
      email: newUser.email,
      password: newUser.password,
    });

    expect(loginResponse.status()).toBe(200);
    const loginBody = (await loginResponse.json()) as LoginResponse;
    const currentUserResponse = await userClient.getCurrentUser(
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
