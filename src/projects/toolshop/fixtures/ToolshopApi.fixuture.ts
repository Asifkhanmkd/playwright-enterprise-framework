import { HttpClient } from "@shared/api/httpClient";
import { AuthClient } from "../api/clients/authClient";
import { test as base, expect } from "@playwright/test";
import { UsersClient } from "../api/clients/usetClient";
import { getEnv } from "@config/test.env";

const env = getEnv();

export type ToolshopApiClients = {
  auth: AuthClient;
  users: UsersClient;
};

export const test = base.extend<{ toolshopApi: ToolshopApiClients }>({
  toolshopApi: async ({}, use) => {
    const http = new HttpClient(env.TOOLSHOP_API_BASE_URL);
    await http.init();

    const toolshopClients: ToolshopApiClients = {
      auth: new AuthClient(http),
      users: new UsersClient(http),
    };

    try {
      await use(toolshopClients);
    } finally {
      await http.dispose();
    }
  },
});

export { expect };
