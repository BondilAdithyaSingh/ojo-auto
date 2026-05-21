import { Page } from '@playwright/test';
import { LeadDetailsPage } from '../pages/LeadDetailsPage';

// ── Test Data ──────────────────────────────────────────────────────────────────
const LEAD = {
  title: 'Amazon New Update Release',
};

const SERVICES = {
  branding:  'Branding branding Common',
  design:    'Design design Common Default',
  marketing: 'Marketing marketing Common',
};

const BRANDING = {
  budget:      '5000',
  duration:    '2',
  deliverable: 'Branding',
  objective:   'Promote the product',
  kpi1:        'Branding',
  kpi2:        'Amazon',
  kpi3:        'Marketing Team',
};

const DESIGN = {
  budget:      '5000',
  deliverable: 'Design',
  objective:   'Design Team',
  kpi1:        'Design',
  kpi2:        'Amazon',
  kpi3:        'Desinging',
};

const MARKETING = {
  budget:      '5000',
  deliverable: 'Marketing',
  objective:   'Marketing the product',
  kpi1:        'Marketing',
  kpi2:        'Amazon',
  kpi3:        'Marketing Team',
};

export async function leadDetailsFlow(page: Page) {
  const details = new LeadDetailsPage(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — Lead Details: Add Services + Edit');
  console.log('════════════════════════════════════════');

  // ── Step 1: Navigate to Leads ──────────────────────────────────────────────
  await details.goToLeads();

  // ── Step 2: Open the lead ──────────────────────────────────────────────────
  await details.openLead(LEAD.title);

  // ── Step 3: Close auto-opened panel ───────────────────────────────────────
  await details.closeIfOpen();

  // ── Step 4: Go to Details tab ──────────────────────────────────────────────
  await details.clickDetailsTab();

  // ════════════════════════════════════════
  // ADD 3 SERVICES
  // ════════════════════════════════════════

  // Add Branding
  await details.addService(SERVICES.branding);
  await details.clickMoreActions();

  // Add Design
  await details.addService(SERVICES.design);
  await details.clickMoreActions();

  // Add Marketing
  await details.addService(SERVICES.marketing);
  await details.clickMoreActions();

  // ── Step 5: Click Edit ─────────────────────────────────────────────────────
  await details.clickEdit();

  // ════════════════════════════════════════
  // BRANDING SERVICE (index 0)
  // ════════════════════════════════════════
  console.log('📝 Filling Branding service details...');
  await details.fillBudget(0, BRANDING.budget);
  await details.fillDuration(0, BRANDING.duration);
  await details.fillDeliverable(0, BRANDING.deliverable);
  await details.fillObjective(0, BRANDING.objective);
  await details.fillAddNew(0, BRANDING.kpi1);
  await details.fillAddNew(1, BRANDING.kpi2);
  await details.fillAddNew(2, BRANDING.kpi3);

  // ════════════════════════════════════════
  // DESIGN SERVICE (index 1)
  // ════════════════════════════════════════
  console.log('📝 Filling Design service details...');
  await details.fillBudget(1, DESIGN.budget);
  await details.fillDeliverable(1, DESIGN.deliverable);
  await details.fillObjective(1, DESIGN.objective);
  await details.fillAddNew(3, DESIGN.kpi1);
  await details.fillAddNew(4, DESIGN.kpi2);
  await details.fillAddNew(5, DESIGN.kpi3);

  // ════════════════════════════════════════
  // MARKETING SERVICE (index 2)
  // ════════════════════════════════════════
  console.log('📝 Filling Marketing service details...');
  await details.fillBudget(2, MARKETING.budget);
  await details.fillDeliverable(2, MARKETING.deliverable);
  await details.fillObjective(2, MARKETING.objective);
  // CSS locator fields for marketing (from recording)
  await page.locator('div:nth-child(3) > .p-4.sm\\:p-6 > div:nth-child(2) > div:nth-child(2) > div > .flex.flex-wrap > .flex.items-center.gap-1 > .bg-white')
    .first().fill(MARKETING.kpi1);
  await page.locator('div:nth-child(3) > .p-4.sm\\:p-6 > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > .flex.flex-wrap > .flex.items-center.gap-1 > .bg-white')
    .fill(MARKETING.kpi2);
  await page.locator('div:nth-child(3) > .p-4.sm\\:p-6 > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > .flex.flex-wrap > .flex.items-center.gap-1 > .bg-white')
    .fill(MARKETING.kpi3);

  // ── Step 6: Save ───────────────────────────────────────────────────────────
  await details.clickSave();

  // ── Assertion ──────────────────────────────────────────────────────────────
  await details.assertDetailsSaved();

  console.log('🎉 FLOW PASSED — Services added and details saved!');
}

export async function leadDetailsSlaFlow(page: Page) {
  const details = new LeadDetailsPage(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — Lead Details: Add Design Service + Create SLA');
  console.log('════════════════════════════════════════');

  // ── Step 1: Navigate to Leads ──────────────────────────────────────────────
  // await details.goToLeads();

  // ── Step 2: Open the lead ──────────────────────────────────────────────────
  // await details.openLead('Amazon New Update Release');

  // ── Step 3: Go to Details tab ──────────────────────────────────────────────
  

  // ── Step 4: Close any open panel ──────────────────────────────────────────
  // await details.closeIfOpen();

  // ── Step 5: Click More actions → Add Design service ────────────────────────
  // await details.clickMoreActions();
  // await details.addService('Design design Common Default');

  // ════════════════════════════════════════
  // SLA CREATION
  // ════════════════════════════════════════

  // ── Step 6: More SLA options → Create manually ────────────────────────────
  await details.clickMoreSlaOptions();
  await details.clickCreateSlaManually();

  // ── Step 7: Save SLA ───────────────────────────────────────────────────────
  await details.clickSaveSla();

  // ── Step 8: Sign as Service Provider ─────────────────────────────────────
  // await details.signAsServiceProvider();

  // ── Assertions ─────────────────────────────────────────────────────────────
  await details.assertSlaSaved();
  // Signature is visual only — verified manually via screenshot

  console.log('🎉 FLOW PASSED — Design service added, SLA created and signed!');
}

export async function leadInvoiceFlow(page: Page) {
  const details = new LeadDetailsPage(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — SLA Feedback + Share + Invoice');
  console.log('(Continues after manual signature)');
  console.log('════════════════════════════════════════');

  // ── Step 1: Navigate to Leads ──────────────────────────────────────────────
  // await details.goToLeads();
  // await page.getByRole('button', { name: 'List' }).waitFor({ state: 'visible', timeout: 15000 });
  // await page.getByRole('button', { name: 'List' }).click();

  // ── Step 2: Open the lead ──────────────────────────────────────────────────
  // await details.openLead('Amazon New Update Release');
  // await details.closeIfOpen();

  // ── Step 3: Go to Details → SLA ───────────────────────────────────────────
  // await details.clickDetailsTab();
  // await details.clickSlaGenerated();
   
  // await details.waitForManualSignature(120000);
  // await page.pause();
  await details.signAsServiceProvider();


  // ── Step 4: Give Feedback ─────────────── ───────────────────────────────────
  await details.giveFeedback('Need to change it');

  // ── Step 5: Exit comment mode ──────────────────────────────────────────────
  await details.exitCommentMode();

  // ════════════════════════════════════════
  // MANUAL SIGNATURE STEP
  // ════════════════════════════════════════
  // The test pauses here — sign manually then click Sign
  // Once Sign is clicked the test continues automatically
   // 2 minutes to sign

  // ── Step 6: Share after signing ────────────────────────────────────────────
  await details.clickShare();

  // ════════════════════════════════════════
  // INVOICE
  // ════════════════════════════════════════

  // ── Step 8: Generate Invoice ───────────────────────────────────────────────
  await details.clickGenerateInvoice();
  await details.clickGenerateAnyway();

  // ── Step 9: Expand + Edit invoice ─────────────────────────────────────────
  await details.clickExpandDetails();
  await details.clickEditInvoice();

  // ── Step 10: Fill invoice details ─────────────────────────────────────────
  await details.fillBillingAddress('testing home');
  await details.fillGstin('123456');
  await details.clearProjectField();

  // ── Step 11: Update + Send ────────────────────────────────────────────────
  await details.clickUpdate();
  await details.clickSendInvoice();

  // ── Step 12: Go back ──────────────────────────────────────────────────────
  await details.clickGoBack();

  // ── Assertion ─────────────────────────────────────────────────────────────
  await details.assertInvoiceSent();

  console.log('🎉 FLOW PASSED — Feedback given, signed, invoice sent!');
}


export async function leadMessagesFlow(page: Page) {
  const details = new LeadDetailsPage(page);


  console.log('════════════════════════════════════════');
  console.log('FLOW — Messages + Email + Notes & Files');
  console.log('════════════════════════════════════════');


  // ── Step 1: Navigate to Leads ──────────────────────────────────────────────
  // await details.goToLeads();


  // ── Step 2: Open the lead ──────────────────────────────────────────────────
  // 
  // await details.openLead('Amazon New Update Release');
  await details.closeIfOpen();


  // ── Step 3: Go to Details tab ──────────────────────────────────────────────
  // await details.clickDetailsTab();


  // ════════════════════════════════════════
  // CHAT MESSAGE
  // ════════════════════════════════════════


  // ── Step 4: Open chat → send message ──────────────────────────────────────
  await details.clickChatIcon();
  await details.sendChatMessage('Hello');


  // ════════════════════════════════════════
  // EMAIL
  // ════════════════════════════════════════


  // ── Step 5: Switch to email tab → compose + send ───────────────────────────
  await details.clickEmailTab();
  await details.clickNewMail();
  await details.fillEmailSubject('Testing1234');
  await details.fillEmailBody('Helllo Adithya this is a test mail');
  await details.clickSendEmail();


  // ── Step 6: Go back to chat → switch tabs ─────────────────────────────────
  await details.clickChatIcon();
  await details.clickThirdTab();
  await details.clickFourthBtn();


  // ════════════════════════════════════════
  // NOTES & FILES
  // ════════════════════════════════════════


  // ── Step 7: Notes & Files → add note ──────────────────────────────────────
  await details.clickNotesAndFiles();
  await details.addNote('This is a new test note');


  // ── Step 8: Click Files tab ────────────────────────────────────────────────
  await details.clickFilesTab();


  // ── Assertion ──────────────────────────────────────────────────────────────
  await details.assertNoteSaved('This is a new test note');


  console.log('🎉 FLOW PASSED — Messages, email, notes all done!');
}


