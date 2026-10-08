class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addProduct(productName) {
    const slug = productName.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };