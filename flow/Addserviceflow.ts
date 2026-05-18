import { Page } from '@playwright/test';
import { AddServicePage } from '../pages/Addservicepage';

export async function addServiceFlow(page: Page) {
  const addServicePage = new AddServicePage(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — Adding Service');
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
  await addServicePage.clickServicePricingTab();

  // ── Step 4: Click Services sub-tab ────────────────────────────────────────
  await addServicePage.clickServicesSubTab();

  // ── Step 5: Click Add Service ──────────────────────────────────────────────
  await addServicePage.clickAddService();

  // ── Step 6: Fill Service Name ──────────────────────────────────────────────
  await addServicePage.fillServiceName('testing');

  // ── Step 7: Fill Price ─────────────────────────────────────────────────────
  await addServicePage.fillPrice(200000);

  // ── Step 8: Save ───────────────────────────────────────────────────────────
  await addServicePage.clickSave();
  await addServicePage.verifyServiceAdded();

  console.log('✅ FLOW PASSED — Service added successfully!');
}