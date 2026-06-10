import { APIResponse } from "@playwright/test";
import { HttpClient } from "../utils/httpClient";

export class AuthClient {
  constructor(private readonly http: HttpClient) {}

  async login(username: string, password: string): Promise<APIResponse> {
    const responce = await this.http.post("/auth/login", {
      username,
      password,
    });
    return responce;
  }
}
