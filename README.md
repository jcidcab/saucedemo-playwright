# SauceDemo - Automatización E2E con Playwright

![Playwright Tests](https://github.com/jcidcab/saucedemo-playwright/actions/workflows/playwright.yml/badge.svg)

Framework de pruebas end-to-end para saucedemo.com con Page Object Model.

## Stack
Playwright · JavaScript · Node.js · GitHub Actions

## Qué cubre
- Login exitoso, usuario bloqueado, credenciales inválidas y campos vacíos
- Agregar productos al carrito y validar el contador
- Checkout completo y validación de datos faltantes

## Cómo ejecutarlo
npm install
npx playwright install
npx playwright test

## Estructura
- pages/: Page Objects
- data/: datos de prueba
- tests/: casos de prueba