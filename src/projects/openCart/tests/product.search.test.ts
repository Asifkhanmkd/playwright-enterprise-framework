import { test, expect } from "@core/authFixture";

test.describe("Product Search", () => {
  test("TC-07: search with exact product name", async ({
    productPageWithAuth,
  }) => {
    await productPageWithAuth.searchProduct("MacBook Air");
    await productPageWithAuth.expectProductInResults("MacBook Air");
  });

  test("TC-08: search with partial keyword", async ({
    productPageWithAuth,
  }) => {
    await productPageWithAuth.searchProduct("Mac");
    await productPageWithAuth.numberOfExpectedProductReturned(4);
  });

  test("TC-09: search is case insensitive", async ({ productPageWithAuth }) => {
    await productPageWithAuth.searchProduct("macbook");
    await productPageWithAuth.expectProductInResults("MacBook");
  });

  test("TC-10: search with special characters", async ({
    productPageWithAuth,
  }) => {
    await productPageWithAuth.searchProduct("@#$%");
    await productPageWithAuth.expectNoMatchingProductMessage();
  });
});
