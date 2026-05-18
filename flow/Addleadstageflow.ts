import { Page } from '@playwright/test';
import { LeadStagePage } from '../pages/Leadstagepage';

export async function addLeadStageFlow(page: Page) {
  const leadStagePage = new LeadStagePage(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — Lead Stage: Add, Edit, Delete');
  console.log('════════════════════════════════════════');

  // ── Step 1: Navigate to Leads → Settings ──────────────────────────────────
  console.log('🖱️ Clicking Leads...');
  await page.getByRole('link', { name: 'Leads' }).first().click();
  await page.waitForTimeout(1000);

  console.log('🖱️ Clicking Settings...');
  await page.getByRole('link', { name: 'Settings' }).click();
  await page.waitForTimeout(1000);

  // ── Step 2: Click Pipelines & Lead Stages tab ─────────────────────────────
  console.log('🖱️ Clicking Pipelines & Lead stages tab...');
  await page.getByRole('button', { name: 'Pipelines & Lead stages' }).click();
  await page.waitForTimeout(1000);

  // ── Step 3: Add New Stage ──────────────────────────────────────────────────
  await leadStagePage.clickAddNew();
  await leadStagePage.fillStageName('tesftinglead');
  await leadStagePage.selectProperty();
  await leadStagePage.clickAddStage();
  await leadStagePage.verifyStageAdded();

  // ── Step 4: Edit stage 0 (Created) ────────────────────────────────────────
  await leadStagePage.clickStageMenu(0);
  await leadStagePage.clickEdit();
  await leadStagePage.fillStageDescription('Created');
  await leadStagePage.clickUpdateStage();

  // ── Step 5: Edit stage 1 (Agreement) ──────────────────────────────────────
  await leadStagePage.clickStageMenu(1);
  await leadStagePage.clickEdit();
  await leadStagePage.fillStageDescription('Agreement');
  await leadStagePage.clickUpdateStage();

  // ── Step 6: Edit stage 2 (Proposal) ───────────────────────────────────────
  await leadStagePage.clickStageMenu(2);
  await leadStagePage.clickEdit();
  await leadStagePage.fillStageDescription('Proposal');
  await leadStagePage.clickUpdateStage();

  // ── Step 7: Edit stage 3 (Closure) ────────────────────────────────────────
  await leadStagePage.clickStageMenu(3);
  await leadStagePage.clickEdit();
  await leadStagePage.fillStageDescription('Closure');
  await leadStagePage.clickUpdateStage();

  // ── Step 8: Edit stage 4 (tesftinglead) ───────────────────────────────────
  await leadStagePage.clickStageMenu(4);
  await leadStagePage.clickEdit();
  await leadStagePage.fillStageDescription('im testing test');
  await leadStagePage.clickUpdateStage();

  // ── Step 9: Delete last stage (tesftinglead) ──────────────────────────────
  console.log('🗑️ Deleting last stage...');
  const finalCount = await leadStagePage.getStageCount();
  await leadStagePage.clickStageMenu(finalCount - 1);
  await leadStagePage.clickDelete();

  console.log('✅ FLOW PASSED — Lead stage added, all stages edited, last deleted!');
}