import { APIRequestContext, request, APIResponse } from "@playwright/test";

export interface HttpClientOptions {
  header?: Record<string, string>;
}

export class HttpClient {
  private readonly baseURL: string;
  private context!: APIRequestContext;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async init(): Promise<void> {
    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        "content-type": "application/json",
      },
    });
  }

  async get(path: string, options?: HttpClientOptions): Promise<APIResponse> {
    const response = await this.context.get(path, { headers: options?.header });
    return response;
  }

  async post(
    path: string,
    body: unknown,
    options?: HttpClientOptions,
  ): Promise<APIResponse> {
    const response = await this.context.post(path, {
      data: body,
      headers: options?.header,
    });
    return response;
  }

  async put(path: string, body: unknown, options?: HttpClientOptions) {
    const response = await this.context.put(path, {
      data: body,
      headers: options?.header,
    });
    return response;
  }

  async delete(path: string, options?: HttpClientOptions) {
    const response = await this.context.delete(path, {
      headers: options?.header,
    });
    return response;
  }

  async dispose(): Promise<void> {
    await this.context.dispose();
  }
}
