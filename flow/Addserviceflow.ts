import { Page } from '@playwright/test';
import { AddServicePage } from '../pages/AddServicePage';

export async function addServiceFlow(page: Page) {
  const svc = new AddServicePage(page);

  console.log('════════════════════════════════════════');
  console.log('TEST 5 — Add, Edit & Delete Services');
  console.log('════════════════════════════════════════');

  // ── Navigate to Service Pricing → Services ────────────────────────────────
  await svc.clickServicePricingTab();
  await svc.clickServicesSubTab();

  // Close any panel that auto-opens (e.g. Genie)
  await svc.closeIfOpen();

  // ════════════════════════════════════════
  // ADD — Service 1: "test" — hours_based — price 1000
  // ════════════════════════════════════════
  console.log('➕ Adding Service 1 (test / hours_based / 1000)...');
  await svc.clickAddService();
  await svc.fillServiceName('Branding');
  await svc.fillHourlyPrice(1000);
  await svc.clickSave();

  // ════════════════════════════════════════
  // ADD — Service 2: "test1" — per_unit — price 1000
  // ════════════════════════════════════════
  console.log('➕ Adding Service 2 (test1 / per_unit / 1000)...');
  await svc.clickAddService();
  await svc.fillServiceName('Marketing');
  await svc.selectPricingModel('per_unit');
  await svc.fillPerUnitPrice(1000);
  await svc.clickSave();

  // ════════════════════════════════════════
  // ADD — Service 3: "test2" — retainer — price 1000
  // ════════════════════════════════════════
  console.log('➕ Adding Service 3 (test2 / retainer / 1000)...');
  await svc.clickAddService();
  await svc.fillServiceName('Design');
  await svc.selectPricingModel('retainer');
  await svc.fillRetainerPrice(1000);
  await svc.clickSave();

  console.log('✅ All 3 services added!');

  // Note: Edit and Delete steps are in separate flow for better organization and to avoid long flows
}