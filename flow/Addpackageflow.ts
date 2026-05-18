import { Page } from '@playwright/test';
import { PackagePage } from '../pages/packagepage';

export async function addPackageFlow(page: Page) {
  const packagePage = new PackagePage(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — Adding Package');
  console.log('════════════════════════════════════════');

  // ── Step 1: Navigate to Leads (use first to avoid strict mode violation) ───
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

  // ── Step 4: Click Packages sub-tab ────────────────────────────────────────
  await packagePage.clickPackagesSubTab();

  // ── Step 5: Click Create Package ──────────────────────────────────────────
  await packagePage.clickCreatePackage();

  // ── Step 6: Fill Package Name ──────────────────────────────────────────────
  await packagePage.fillPackageName('test1234');

  // ── Step 7: Fill Package Description ──────────────────────────────────────
  await packagePage.fillPackageDescription('this is test');

  // ── Step 8: Open service dropdown & select first service ──────────────────
  await packagePage.openServiceDropdown();
  const serviceName = await packagePage.selectFirstService();

  // ── Step 9: Fill quantity ──────────────────────────────────────────────────
  await packagePage.fillQuantity(20000);

  // ── Step 10: Save ──────────────────────────────────────────────────────────
  await packagePage.clickSave();
  await packagePage.verifyPackageAdded();

  console.log(`✅ FLOW PASSED — Package added with service "${serviceName}"!`);
}