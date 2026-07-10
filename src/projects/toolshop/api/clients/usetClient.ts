import { HttpClient } from "@shared/api/httpClient";
import { User } from "../models/user";
import { APIResponse } from "@playwright/test";

export class UsersClient {
  constructor(private readonly http: HttpClient) {}

  async getCurrentUser(accessToken: string): Promise<APIResponse> {
    return await this.http.post("users/me", accessToken);
  }
}
