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
  duration:    '3',
  deliverable: 'Test',
  objective:   'Testing ',
  kpi1:        'KPI TEST 1',
  kpi2:        'KPI TEST 1',
  kpi3:        'TESTING TEAM',
};

const DESIGN = {
  budget:      '5000',
  deliverable: 'TEST1',
  objective:   'THIS IS FOR TESTING',
  kpi1:        'TEST',
  kpi2:        'TEST',
  kpi3:        'TEAM',
};

const MARKETING = {
  budget:      '49998',
  deliverable: 'TEST12',
  objective:   'THIS IS TESTING',
  kpi1:        'TEST1',
  kpi2:        'TEST',
  kpi3:        'TEST TEAM',
};

const SLA_CONTENT = `Service Level Agreement (SLA)

Date: {{current_date}}
Provider: Test
Client: Testing
Contact: {{client_contact}} ({{client_email}})

Project Overview

This Service Level Agreement outlines the terms and conditions for the engagement between {{company_name}} ("Provider") and {{client_name}} ("Client") for the project {{project_title}}.

Services

{{services_list}}

Timeline

Start Date: {{start_date}}
End Date: {{end_date}}

Budget

Total project budget: {{budget}}

Service Level Terms
Response Times

The Provider commits to the following response times:

Critical Issues: {{sla_response_time}}

Resolution Target: {{sla_resolution_time}}

Support Hours

{{support_hours}}

Communication

Regular status updates will be provided via email and scheduled review meetings. The primary point of contact is {{client_contact}}.

Payment Terms

Payment will be made in milestone-based installments as agreed upon in the project scope. The total engagement value is {{budget}}.

Milestone

	

Amount

	

Description



Project Kickoff

	

30%

	

Upon signing of this agreement



Mid-Project Review

	

40%

	

Upon completion of core deliverables



Final Delivery

	

30%

	

Upon project completion and sign-off

Deliverables & Acceptance

All deliverables will be reviewed and accepted by the Client within 5 business days of submission. If no feedback is received within this period, deliverables will be considered accepted.

Revision Policy

Each deliverable includes up to 2 rounds of revisions. Additional revisions will be billed at the agreed hourly rate.

Intellectual Property

Upon full payment, all intellectual property rights for the deliverables will be transferred to {{client_name}}. {{company_name}} retains the right to showcase the work in its portfolio unless otherwise agreed.

Confidentiality

Both parties agree to maintain the confidentiality of all proprietary information shared during the engagement. This obligation survives the termination of this agreement.

Termination

Either party may terminate this agreement with 30 days written notice. In the event of termination, the Client will pay for all work completed up to the termination date.

Limitation of Liability

The Provider's total liability under this agreement shall not exceed the total project budget of {{budget}}.`;

export async function leadFullFlow(page: Page) {
  const details = new LeadDetailsPage(page);

  console.log('════════════════════════════════════════════════════════');
  console.log('FLOW — Full Lead: BRO + Feedback + SLA + Invoice + Messages');
  console.log('════════════════════════════════════════════════════════');

  // ════════════════════════════════════════
  // PART 1 — Navigate & Open Lead
  // ════════════════════════════════════════
  await details.goToLeads();
  await details.openLead(LEAD.title);
  await details.closeIfOpen();
  await details.clickDetailsTab();

  // ════════════════════════════════════════
  // PART 2 — Add 3 Services
  // ════════════════════════════════════════
  console.log('➕ Adding services...');

  // Branding
  await details.addService(SERVICES.branding);
  await details.clickEmptyIconBtn(3);
  await details.clickMoreActions();

  // Design
  await details.addService(SERVICES.design);
  await details.clickMoreActions();

  // Marketing
  await details.addService(SERVICES.marketing);
  await details.clickMoreActions();

  // ════════════════════════════════════════
  // PART 3 — Edit BRO Details
  // ════════════════════════════════════════
  await details.clickEdit();

  // BRANDING (index 0)
  console.log('📝 Filling Branding details...');
  await details.fillBudget(0, BRANDING.budget);
  await details.fillDuration(0, BRANDING.duration);
  await details.fillDeliverable(0, BRANDING.deliverable);
  await details.clickPlusBtn(0);
  await details.fillObjective(0, BRANDING.objective);
  await details.fillAddNew(0, BRANDING.kpi1);
  await details.clickPlusBtn(1);
  await details.fillAddNew(1, BRANDING.kpi2);
  await details.clickPlusBtn(2);
  await details.fillAddNew(2, BRANDING.kpi3);
  await details.clickPlusBtn(3);

  // DESIGN (index 1)
  console.log('📝 Filling Design details...');
  await details.fillBudget(1, DESIGN.budget);
  await details.fillDeliverable(1, DESIGN.deliverable);
  await details.fillObjective(1, DESIGN.objective);
  await details.fillAddNew(3, DESIGN.kpi1);
  await details.clickPlusBtn(5);
  await details.fillAddNew(4, DESIGN.kpi2);
  await page.locator('div:nth-child(2) > .p-4.sm\\:p-6 > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > .flex.flex-wrap > .flex.items-center.gap-1 > .gap-2').click();
  await details.fillAddNew(5, DESIGN.kpi3);
  await page.locator('div:nth-child(2) > .p-4.sm\\:p-6 > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > .flex.flex-wrap > .flex.items-center.gap-1 > .gap-2').click();

  // MARKETING (index 2)
  console.log('📝 Filling Marketing details...');
  await details.fillBudget(2, MARKETING.budget);
  await details.fillDeliverable(2, MARKETING.deliverable);
  await details.fillObjective(2, MARKETING.objective);
  await page.locator('div:nth-child(3) > .p-4.sm\\:p-6 > div:nth-child(2) > div:nth-child(2) > div > .flex.flex-wrap > .flex.items-center.gap-1 > .bg-white').first().fill(MARKETING.kpi1);
  await page.locator('div:nth-child(3) > .p-4.sm\\:p-6 > div:nth-child(2) > div:nth-child(2) > div > .flex.flex-wrap > .flex.items-center.gap-1 > .gap-2').first().click();
  await page.locator('div:nth-child(3) > .p-4.sm\\:p-6 > .flex.flex-col.gap-4.mb-4 > div:nth-child(2) > .flex.flex-wrap > .flex.items-center.gap-1 > .gap-2').click();
  await page.locator('div:nth-child(3) > .p-4.sm\\:p-6 > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > .flex.flex-wrap > .flex.items-center.gap-1 > .bg-white').fill(MARKETING.kpi2);
  await page.locator('div:nth-child(3) > .p-4.sm\\:p-6 > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > .flex.flex-wrap > .flex.items-center.gap-1 > .gap-2').click();
  await page.locator('div:nth-child(3) > .p-4.sm\\:p-6 > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > .flex.flex-wrap > .flex.items-center.gap-1 > .bg-white').fill(MARKETING.kpi3);
  await page.locator('div:nth-child(3) > .p-4.sm\\:p-6 > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > .flex.flex-wrap > .flex.items-center.gap-1 > .gap-2').click();

  // Save BRO
  await details.clickSave();
  await details.assertDetailsSaved();

  // ════════════════════════════════════════
  // PART 4 — Edit budget again + Save
  // ════════════════════════════════════════
  console.log('✏️ Updating Branding budget to 50000...');
  await details.clickEdit();
  await details.fillBudget(0, '50000');
  await details.clickSave();

  // ════════════════════════════════════════
  // PART 5 — Give BRO Feedback
  // ════════════════════════════════════════
  console.log('💬 Giving BRO feedback...');
  await page.getByRole('button', { name: 'Give Feedback' }).waitFor({ state: 'visible', timeout: 15000 });
  await page.getByRole('button', { name: 'Give Feedback' }).click();
  await details.giveBroFeedback(0, 'Make it lesser');

  // ════════════════════════════════════════
  // PART 6 — Create SLA
  // ════════════════════════════════════════
  console.log('📑 Creating SLA...');
  await details.clickMoreSlaOptions();
  await details.clickCreateSlaManually();
  await details.clickSaveSla();

  // Edit SLA content
  await details.clickEdit();
  await details.fillSlaContent(SLA_CONTENT);

  // ════════════════════════════════════════
  // PART 7 — Manual Signature (pause)
  // ════════════════════════════════════════

  await page.pause(); // ← pause here to manually sign the SLA in the UI, then unpause to continue the test
  // await details.addSignatureBlock();
  // await details.waitForManualSignature(120000);

  // ════════════════════════════════════════
  // PART 8 — Share + Invoice
  // ════════════════════════════════════════
  await details.clickShare();
  await details.clickGenerateInvoice();
  await details.clickGenerateAnyway();
  await details.clickExpandDetails();
  await details.clickEditInvoice();
  await details.fillBillingAddress('testing home');
  await details.fillGstin('123456');
  await details.clearProjectField();
  await details.clickUpdate();
  await details.clickSendInvoice();
  await details.clickGoBack();
  await details.assertInvoiceSent();

  // ════════════════════════════════════════
  // PART 9 — Chat + Email + Notes
  // ════════════════════════════════════════
  await details.clickChatIcon();
  await details.sendChatMessage('Hello');
  await details.clickEmailTab();
  await details.clickNewMail();
  await details.fillEmailSubject('Testing1234');
  await details.fillEmailBody('Helllo Adithya this is a test mail');
  await details.clickSendEmail();
  await details.clickChatIcon();
  await details.clickThirdTab();
  await details.clickFourthBtn();
  await details.clickNotesAndFiles();
  await details.addNote('This is a new test note');
  await details.clickFilesTab();
  await details.assertNoteSaved('This is a new test note');

  console.log('🎉 FULL FLOW PASSED — BRO + SLA + Invoice + Messages all done!');
}
