const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const users = require('../data/users');

test.describe('Compra completa', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('agregar productos al carrito actualiza el contador', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProduct('Sauce Labs Backpack');
    await inventory.addProduct('Sauce Labs Bike Light');
    await expect(inventory.cartBadge).toHaveText('2');
  });

  test('checkout completo finaliza la compra', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addProduct('Sauce Labs Backpack');
    await inventory.goToCart();
    await expect(cart.items).toHaveCount(1);

    await cart.checkout();
    await checkout.fillInfo('Juan', 'Cid', '8320000');
    await checkout.finish();

    await expect(checkout.confirmation).toHaveText('Thank you for your order!');
  });

  test('checkout sin datos muestra error', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inventory.addProduct('Sauce Labs Backpack');
    await inventory.goToCart();
    await cart.checkout();
    await checkout.continueButton.click();

    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });
});