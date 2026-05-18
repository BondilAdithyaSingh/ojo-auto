import { Page } from '@playwright/test';
import { BROTemplatePage } from '../pages/Brotemplatepage';

export async function addBROTemplateFlow(page: Page) {
  const broPage = new BROTemplatePage(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — Adding BRO Template');
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

  // ── Step 3: Click BRO Templates tab ───────────────────────────────────────
  await broPage.clickBROTemplatesTab();

  // ── Step 4: Click Add New ──────────────────────────────────────────────────
  await broPage.clickAddNew();

  // ── Step 5: Close Genie panel ──────────────────────────────────────────────
  await broPage.closeGenie();

  // ── Step 6: Fill Template Name ─────────────────────────────────────────────
  await broPage.fillTemplateName('testing123');

  // ── Step 7: Select Service Type ────────────────────────────────────────────
  await broPage.selectServiceType('UI UX Design');

  // ── Step 8: Fill Main Description ─────────────────────────────────────────
  await broPage.fillMainDescription('this is for testing');

  // ── Step 9: Click all section tabs to activate them ───────────────────────
  await broPage.clickSectionTab('Team');
  await broPage.clickSectionTab('Objective');
  await broPage.clickSectionTab('Goal');
  await broPage.clickSectionTab('KPIs');
  await broPage.clickSectionTab('Target Audience');
  await broPage.clickSectionTab('Communication');

  // ── Step 16: Save ──────────────────────────────────────────────────────────
  await broPage.clickSave();
  await broPage.verifyTemplateAdded();

  console.log('✅ FLOW PASSED — BRO Template created successfully!');
}