import { test, expect } from "@playwright/test";
import { HttpClient } from "@shared/api/httpClient";
import { AuthClient } from "@projects/toolshop/api/clients/authClient";
import { buildRegisterUser } from "../testData/registerUser";
import { RegisterResponse } from "@projects/toolshop/api/models/registerResponse";
import { RegisterResponseSchema } from "@projects/toolshop/api/schemas/registerResponse.schema";
import { error } from "console";

test.describe("Toolshop Registeration API", () => {
  test("TC-01: registration is rejected when password has appeared in a data leak", async () => {
    const http = new HttpClient("https://api.practicesoftwaretesting.com");
    await http.init();
    const authClient = new AuthClient(http);

    try {
      const user = buildRegisterUser({ password: "Password123!" });
      const response = await authClient.register(user);
      const body = await response.json();
      expect(response.status()).toBe(422);
      expect(body.password).toContainEqual(
        expect.stringContaining("data leak"),
      );

      /* const parsed = RegisterResponseSchema.safeParse(body);
      expect(parsed.success).toBe(true);

      expect(body.email).toBe(user.email);
      expect(body.first_name).toBe(user.first_name);
      expect(body.last_name).toBe(user.last_name);

      console.log("Status:", response.status());
      console.log("Response Body:", body); */
    } finally {
      await http.dispose();
    }
  });

  test("TC-02: register a new user", async ({}, testinfo) => {
    /*  const baseURL = testinfo.project.use.baseURL;

    if (!baseURL) {
      throw new Error("Toolshop baseURL is not configured");
    } */

    //const http = new HttpClient(baseURL);

    const http = new HttpClient("https://api.practicesoftwaretesting.com");
    await http.init();
    const authClient = new AuthClient(http);

    try {
      const user = buildRegisterUser();
      const response = await authClient.register(user);
      const body = (await response.json()) as RegisterResponse;
      expect(response.status()).toBe(201);
      //const parsed = RegisterResponseSchema.safeParse(body);
      // expect(parsed.success).toBe(true);

      console.log("Response Body:");
      console.dir(body, { depth: null });

      const parsed = RegisterResponseSchema.safeParse(body);

      if (!parsed.success) {
        console.error("Schema Validation Errors:");
        console.error(parsed.error.format());
      }

      expect(parsed.success).toBe(true);

      expect(body.email).toBe(user.email);
      expect(body.first_name).toBe(user.first_name);
      expect(body.last_name).toBe(user.last_name);
    } finally {
      http.dispose;
    }
  });
});
