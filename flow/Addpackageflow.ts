import { Page } from '@playwright/test';
import { PackagePage } from '../pages/packagepage';

export async function addPackageFlow(page: Page) {
  const packagePage = new PackagePage(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — Adding Package');
  console.log('════════════════════════════════════════');

  // ── Step 1: Navigate to Leads ──────────────────────────────────────────────
  console.log('🖱️ Clicking Leads...');
  await page.locator('a[href="/v2/leads/tasks"]').first().waitFor({ state: 'visible', timeout: 15000 });
  await page.locator('a[href="/v2/leads/tasks"]').first().click();
  await page.waitForTimeout(1000);

  // ── Step 2: Navigate to Settings ──────────────────────────────────────────
  console.log('🖱️ Clicking Settings...');
  await page.locator('a[href="/v2/leads/settings"]').waitFor({ state: 'visible', timeout: 15000 });
  await page.locator('a[href="/v2/leads/settings"]').click();
  await page.waitForTimeout(1000);

  // ── Step 3: Click Service Pricing tab ─────────────────────────────────────
  await packagePage.clickServicePricingTab();

  // ── Step 4: Click Add New (defaults to Packages view) ─────────────────────
  await packagePage.clickCreatePackage();

  // ── Step 5: Fill Package Name ──────────────────────────────────────────────
  await packagePage.fillPackageName('Roxon');

  // ── Step 6: Fill Package Description ──────────────────────────────────────
  await packagePage.fillPackageDescription('Roxon clothing brand');

// ── Step 7: Add Service 1 — Branding ──────────────────────────────────────
console.log('🖱️ Adding Service 1: Branding...');
await packagePage.openServiceDropdown();
const dropdown1 = page.getByRole('textbox', { name: 'Service name' }).nth(0).locator('../..');
await dropdown1.getByRole('button', { name: 'Branding ₹1,000 /hr' }).waitFor({ state: 'visible', timeout: 15000 });
await dropdown1.getByRole('button', { name: 'Branding ₹1,000 /hr' }).click();
await page.waitForTimeout(500);

// ── Step 8: Add Service 2 — Design ────────────────────────────────────────
console.log('🖱️ Adding Service 2: Design...');
await page.getByRole('button', { name: 'Add Service' }).click();
await page.getByRole('textbox', { name: 'Service name' }).nth(1).waitFor({ state: 'visible', timeout: 15000 });
await page.getByRole('textbox', { name: 'Service name' }).nth(1).click();
await page.waitForTimeout(500);
const dropdown2 = page.getByRole('textbox', { name: 'Service name' }).nth(1).locator('../..');
await dropdown2.getByRole('button', { name: 'Design ₹1,000 /mo' }).waitFor({ state: 'visible', timeout: 15000 });
await dropdown2.getByRole('button', { name: 'Design ₹1,000 /mo' }).click();
await page.waitForTimeout(500);

// ── Step 9: Add Service 3 — Marketing ─────────────────────────────────────
console.log('🖱️ Adding Service 3: Marketing...');
await page.getByRole('button', { name: 'Add Service' }).click();
await page.getByRole('textbox', { name: 'Service name' }).nth(2).waitFor({ state: 'visible', timeout: 15000 });
await page.getByRole('textbox', { name: 'Service name' }).nth(2).click();
await page.waitForTimeout(500);
const dropdown3 = page.getByRole('textbox', { name: 'Service name' }).nth(2).locator('../..');
await dropdown3.getByRole('button', { name: 'Marketing ₹1,000 /unit' }).waitFor({ state: 'visible', timeout: 15000 });
await dropdown3.getByRole('button', { name: 'Marketing ₹1,000 /unit' }).click();
await page.waitForTimeout(500);
  // ── Step 10: Fill Quantities ───────────────────────────────────────────────
  console.log('📝 Filling quantities...');
  await page.getByPlaceholder('Qty').first().waitFor({ state: 'visible', timeout: 15000 });
  await page.getByPlaceholder('Qty').first().fill('5');
  await page.getByPlaceholder('Qty').nth(1).fill('5');
  await page.getByPlaceholder('Qty').nth(2).fill('5');
  await page.waitForTimeout(300);

  // ── Step 11: Fill Grand Total ──────────────────────────────────────────────
  await packagePage.fillQuantity(50000); // reusing fillQuantity which targets textbox '0' (Grand Total)

  // ── Step 12: Save ──────────────────────────────────────────────────────────
  await packagePage.clickSave();
  await packagePage.verifyPackageAdded();

  console.log('✅ FLOW PASSED — Package "Roxon" added with 3 services!');
}