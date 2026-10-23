import { test as base, expect } from "./ToolshopUI.fixture";
import { HttpClient } from "@shared/api/httpClient";
import { AuthClient } from "../clients/authClient";
import { getEnv } from "@config/test.env";
import { buildRegisterUser } from "../testData/registerUser";
import path from "path";
import fs from "fs";
import { LoginResponse } from "../models/loginResponse";

const env = getEnv();
type workerAuthFixtues = {
  workerAuthState: string;
};

export const test = base.extend<{}, workerAuthFixtues>({
  workerAuthState: [
    async ({ browser }, use, workerInfo) => {
      const authDir = path.resolve("Storage", "toolshop");
      fs.mkdirSync(authDir, { recursive: true });

      const authStatePath = path.join(
        authDir,
        `auth-worker-${workerInfo.workerIndex}.json`,
      );

      const http = new HttpClient(env.TOOLSHOP_API_BASE_URL);
      await http.init();

      try {
        const authClient = new AuthClient(http);

        const newUser = buildRegisterUser();
        const registerReponse = await authClient.register(newUser);

        expect(registerReponse.status()).toBe(201);

        const loginResponse = await authClient.login({
          email: newUser.email,
          password: newUser.password,
        });

        expect(loginResponse.status()).toBe(200);
        const loginBody = (await loginResponse.json()) as LoginResponse;

        const accessToken = loginBody.access_token;
        expect(accessToken).toBeTruthy();

        const context = await browser.newContext({
          baseURL: env.TOOLSHOP_UI_BASE_URL,
        });
        const page = await context.newPage();

        await page.goto("/");
        await page.evaluate((token) => {
          localStorage.setItem("auth-token", token);
        }, accessToken);

        await context.storageState({ path: authStatePath });
        await context.close();

        console.log(
          `ToolshopAuth worker ${workerInfo.workerIndex} authenticated`,
        );

        await use(authStatePath);
      } finally {
        await http.dispose();
      }
    },
    {
      scope: "worker",
    },
  ],

  storageState: async ({ workerAuthState }, use) => {
    await use(workerAuthState);
  },
});

export { expect };
