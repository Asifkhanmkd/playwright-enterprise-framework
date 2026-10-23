import { test, expect } from "@projects/toolshop/fixtures/ToolshopUI.fixture";

test.describe("Toolshop Product Catalogue", () => {
  test("@smoke TC-6: verify Hand tools catalogue displays products", async ({
    navigationPage,
    productCataloguePage,

    page,
  }) => {
    await page.goto("/");
    await navigationPage.openCategories();
    await navigationPage.selectCategory("Hand Tools");
    await productCataloguePage.expectProductsDisplayed();
  });

  test("@smoke TC-7: verify that selecting a product opens its details page", async ({
    page,
    navigationPage,
    productCataloguePage,
    productDetailsPage,
  }) => {
    await page.goto("/");
    await navigationPage.openCategories();
    await navigationPage.selectCategory("Hand Tools");
    await productCataloguePage.expectProductsDisplayed();
    await productCataloguePage.selectFirstProduct();
    await productDetailsPage.expectProductDetailsDisplayed();
    await expect(page).toHaveURL(/\/product\//);
  });

  test("@smoke TC-8: Verify that selected product from catalogue page mateches the product on detail page", async ({
    page,
    navigationPage,
    productCataloguePage,
    productDetailsPage,
  }) => {
    await page.goto("/");
    await navigationPage.openCategories();
    await navigationPage.selectCategory("Hand Tools");
    await productCataloguePage.expectProductsDisplayed();
    const selectedProductName =
      await productCataloguePage.getFirstProductName();
    await productCataloguePage.selectFirstProduct();
    await productDetailsPage.expectProductDetailsDisplayed();
    const detailsPageProductName = await productDetailsPage.getProductName();
    expect(detailsPageProductName).toBe(selectedProductName);
  });

  test("@smoke TC-9: Verify user can increase and decresae the product quantity on product detail page", async ({
    page,
    navigationPage,
    productCataloguePage,
    productDetailsPage,
  }) => {
    await page.goto("/");

    await navigationPage.openCategories();

    await navigationPage.selectCategory("Hand Tools");
    await productCataloguePage.expectProductsDisplayed();

    await productCataloguePage.selectFirstProduct();

    await productDetailsPage.expectProductDetailsDisplayed();

    expect(await productDetailsPage.getQuantity()).toBe(1);

    await productDetailsPage.increaseQuantity();

    expect(await productDetailsPage.getQuantity()).toBe(2);
    await productDetailsPage.decreaseQuantity();
    expect(await productDetailsPage.getQuantity()).toBe(1);
  });
});
