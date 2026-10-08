const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const users = require('../data/users');

test.describe('Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login exitoso con standard_user', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
    await expect(inventory.title).toHaveText('Products');
  });

  test('usuario bloqueado muestra error', async () => {
    await loginPage.login(users.locked.username, users.locked.password);
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('credenciales incorrectas muestran error', async () => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    await expect(loginPage.errorMessage).toContainText('do not match');
  });

  test('login sin datos exige usuario', async () => {
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });
});