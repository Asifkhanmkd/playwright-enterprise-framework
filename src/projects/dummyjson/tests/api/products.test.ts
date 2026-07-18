import { HttpClient } from "@shared/api/httpClient";
import { ProductClient } from "@projects/dummyjson/api/clients/productClient";
import { ProdSchema } from "@projects/dummyjson/api/schemas/productSchema";
import { Product } from "@projects/dummyjson/api/models/product";
import { test, expect } from "@playwright/test";
import { getEnv } from "@config/test.env";

test.describe("Products API - CRUD", () => {
  test(" @smoke @critical TC12: create, read, update and delete a product", async () => {
    const env = getEnv();
    const baseURL = env.DUMMYJSON_BASE_URL;
    const http = new HttpClient(baseURL);
    await http.init();

    const productClient = new ProductClient(http);

    // --- Create ---
    const createRes = await productClient.createProduct({
      title: "Automation API test box",
      description: "magic box for executing the Api tests",
      price: 12,
    });

    expect(createRes.status()).toBe(201);

    const created = (await createRes.json()) as Product;
    expect(ProdSchema.safeParse(created).success).toBe(true);

    console.log(`Created product ID: ${created.id}`);

    // --- Read ---
    // DummyJSON doesn't persist newly created products, so we target
    // a known stable product (ID 1) to verify the GET works correctly.
    const stableId = 1;

    const readRes = await productClient.getProduct(stableId);
    expect(readRes.status()).toBe(200);

    const fetched = (await readRes.json()) as Product;
    expect(fetched.id).toBe(stableId);
    expect(typeof fetched.title).toBe("string");

    // --- Update ---
    const updateRes = await productClient.updateProduct(stableId, {
      price: 149,
    });
    expect(updateRes.status()).toBe(200);

    const updated = (await updateRes.json()) as Product;
    expect(updated.price).toBe(149);

    // --- Delete ---
    const deleteRes = await productClient.deleteProduct(stableId);
    expect(deleteRes.status()).toBe(200);

    await http.dispose();
  });
});
