import { APIResponse } from "@playwright/test";
import { LoginRequest } from "../models/loginRequest";
import { HttpClient } from "@shared/api/httpClient";
import { RegisterRequest } from "../models/registerRequest";

export class AuthClient {
  constructor(private readonly http: HttpClient) {}

  async login(credentials: LoginRequest): Promise<APIResponse> {
    return await this.http.post("/users/login", credentials);
  }

  async register(payload: RegisterRequest): Promise<APIResponse> {
    return await this.http.post("/users/register", payload);
  }
}
