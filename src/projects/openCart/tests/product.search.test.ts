import { test, expect } from "@projects/openCart/fixtures/authFixture";

test.describe("Product Search", () => {
  test("@smoke TC-07: search with exact product name", async ({
    productPageWithAuth,
    logger,
  }) => {
    await productPageWithAuth.searchProduct("MacBook Air");
    await productPageWithAuth.expectProductInResults("MacBook Air");
  });

  test("@regression TC-08: search with partial keyword", async ({
    productPageWithAuth,
    logger,
  }) => {
    await productPageWithAuth.searchProduct("Mac");
    await productPageWithAuth.numberOfExpectedProductReturned(4);
  });

  test("TC-09: search is case insensitive", async ({
    productPageWithAuth,
    logger,
  }) => {
    await productPageWithAuth.searchProduct("macbook");
    await productPageWithAuth.expectProductInResults("MacBook");
  });

  test("@regression TC-10: search with special characters", async ({
    productPageWithAuth,
    logger,
  }) => {
    await productPageWithAuth.searchProduct("@#$%");
    await productPageWithAuth.expectNoMatchingProductMessage();
  });
});
