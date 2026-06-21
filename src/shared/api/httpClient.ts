import { APIRequestContext, request } from "@playwright/test";

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

  async get(path: string) {
    const response = await this.context.get(path);
    return response;
  }

  async post(path: string, body: unknown) {
    const response = await this.context.post(path, { data: body });
    return response;
  }

  async put(path: string, body: unknown) {
    const response = await this.context.put(path, { data: body });
    return response;
  }

  async delete(path: string) {
    const response = await this.context.delete(path);
    return response;
  }

  async dispose() {
    await this.context.dispose();
  }
}
