import { HttpClient } from "../utils/httpClient";
import {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "../models/product";

export class ProductClient {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async listProducts() {
    const response = await this.http.get("/products");
    return response;
  }

  async getProduct(id: number) {
    const response = await this.http.get(`/products/${id}`);

    return response;
  }

  async createProduct(payload: CreateProductRequest) {
    const response = await this.http.post("/products/add", payload);
    return response;
  }

  async updateProduct(id: number, paylaod: UpdateProductRequest) {
    const response = await this.http.put(`/products/${id}`, paylaod);
    return response;
  }

  async deleteProduct(id: number) {
    const response = await this.http.delete(`products/${id}`);
    return response;
  }
}
