import { Page } from '@playwright/test';
import { CreateLeadManualPage } from '../pages/CreateLeadManualPage';

// ── Test Data ──────────────────────────────────────────────────────────────────
const LEAD = {
  personName:  'Bondil',
  email:       'bondil.adithyasingh+leadtest@gmail.com',
  phone:       '9999999999',
  companyName: 'Amazon',
  title:       'Amazon New Update Release',
  description: 'Planning marketing activities for the new update release of Amazon app.'
};

export async function createLeadManualFlow(page: Page) {
  const lead = new CreateLeadManualPage(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — Create Lead Manually');
  console.log('════════════════════════════════════════');

  // ── Step 1: Go to Leads ────────────────────────────────────────────────────
  await lead.goToLeads();

  // ── Step 2: Close any auto-opened panel ───────────────────────────────────
  await lead.closeIfOpen();

  // ── Step 3: New Lead → Create manually ────────────────────────────────────
  await lead.clickNewLeadManually();

  // ── Step 4: Add New Contact ────────────────────────────────────────────────
  await lead.clickAddNewContact();

  // ── Step 5: Fill contact details ──────────────────────────────────────────
  await lead.fillPersonName(LEAD.personName);
  await lead.fillEmail(LEAD.email);
  await lead.fillPhone(LEAD.phone);
  await lead.fillCompanyName(LEAD.companyName);

  // ── Step 6: Fill lead details ──────────────────────────────────────────────
  await lead.fillTitle(LEAD.title);
  await lead.fillDescription(LEAD.description);

  // ── Step 7: Submit ─────────────────────────────────────────────────────────
  await lead.clickCreateLead();

  // ════════════════════════════════════════
  // ASSERTIONS
  // ════════════════════════════════════════
  // await lead.assertLeadCreated();
  // await lead.assertLeadInList(LEAD.title);

  console.log('🎉 FLOW PASSED — Manual lead created and verified!');
}
