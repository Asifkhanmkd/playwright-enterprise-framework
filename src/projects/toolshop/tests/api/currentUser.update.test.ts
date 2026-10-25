import { test, expect } from "@projects/toolshop/fixtures/ToolshopApi.fixture";
import { updateUserResponse } from "@projects/toolshop/models/updateUserResponse";
import { updateUserResponseSchema } from "@projects/toolshop/schemas/updateUserResponse.schema";
import { buildRegisterUser } from "../../testData/registerUser";
import { User } from "@projects/toolshop/models/user";
import { LoginResponse } from "@projects/toolshop/models/loginResponse";
import { UserSchema } from "@projects/toolshop/schemas/user.schema";
import { buildUpdatedUserRequest } from "../../testData/currentUserUpdate";

test.describe("Toolshop current user update API ", () => {
  test("@smoke @critical TC-04: update authenticalted user Profile", async ({
    toolshopApi,
  }) => {
    const newUser = buildRegisterUser();
    const registerReponse = await toolshopApi.auth.register(newUser);

    expect(registerReponse.status()).toBe(201);

    const loginResponse = await toolshopApi.auth.login({
      email: newUser.email,
      password: newUser.password,
    });
    expect(loginResponse.status()).toBe(200);
    const loginBody = (await loginResponse.json()) as LoginResponse;
    const accessToken = loginBody.access_token;

    const currentUserResponse =
      await toolshopApi.users.getCurrentUser(accessToken);
    expect(currentUserResponse.status()).toBe(200);

    const currentUser = (await currentUserResponse.json()) as User;

    const parsed = UserSchema.safeParse(currentUser);
    expect(parsed.success).toBe(true);

    const updateRequest = buildUpdatedUserRequest(newUser);
    const userUpdateResponse = await toolshopApi.users.updateUser(
      currentUser.id,
      updateRequest,
      accessToken,
    );
    expect(userUpdateResponse.status()).toBe(200);

    const updateResponseBody =
      (await userUpdateResponse.json()) as updateUserResponse;

    const parsedUpdatedUser =
      updateUserResponseSchema.safeParse(updateResponseBody);
    expect(parsedUpdatedUser.success).toBe(true);

    const updatedCurrentUserResponse =
      await toolshopApi.users.getCurrentUser(accessToken);

    expect(updatedCurrentUserResponse.status()).toBe(200);

    const updatedCurrentUser =
      (await updatedCurrentUserResponse.json()) as User;

    const parsedUpdatedCurrentUser = UserSchema.safeParse(updatedCurrentUser);

    expect(parsedUpdatedCurrentUser.success).toBe(true);

    expect(updatedCurrentUser.first_name).toBe(updateRequest.first_name);
    expect(updatedCurrentUser.last_name).toBe(updateRequest.last_name);
    expect(updatedCurrentUser.phone).toBe(updateRequest.phone);
    expect(updatedCurrentUser.address.city).toBe(updateRequest.address.city);
  });
});
