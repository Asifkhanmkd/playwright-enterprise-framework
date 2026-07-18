import { HttpClient } from "@shared/api/httpClient";
import { User } from "../models/user";
import { APIResponse } from "@playwright/test";
import { UpdateUserRequest } from "../models/updateUserRequest";

export class UsersClient {
  constructor(private readonly http: HttpClient) {}

  async getCurrentUser(accessToken: string): Promise<APIResponse> {
    return await this.http.get("users/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  async updateUser(
    id: string,
    payload: UpdateUserRequest,
    accessToken: string,
  ): Promise<APIResponse> {
    return await this.http.put(`users/${id}`, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}
