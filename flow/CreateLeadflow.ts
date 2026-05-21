import { Page } from '@playwright/test';
import { CreateLeadPage } from '../pages/CreateLeadPage';

// ── Test Data ──────────────────────────────────────────────────────────────────
const LEAD = {
  contact:     'Mark',
  title:       'Google New Update Marketing',
  budget:      '50000',
  description: 'Google has launched a new update focused on AI-powered marketing and advertising tools to help businesses create smarter and more effective campaigns. The update introduces advanced features like AI Max for Search campaigns, Demand Gen campaign improvements, conversational ad creation tools powered by Gemini AI, and AI-driven campaign optimization. These tools help advertisers reach the right audience, improve ad performance, generate creative content automatically, and increase conversions with less manual effort',
  template:    'Roxon 3 items · Roxon',
  startDate:   '2026-05-19',
  endDate:     '2026-06-19',
  duration:    '3',
  deliverable:      'AI-Driven Testing',
  objective:        'UI Friendly Design ',
  figmaDeliverable: 'Figma Design',
};

export async function createLeadFlow(page: Page) {
  const lead = new CreateLeadPage(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — Create Lead with OJO + Edit Details + SLA');
  console.log('════════════════════════════════════════');

  // ════════════════════════════════════════
  // PART 1 — Create the Lead
  // ════════════════════════════════════════

  await lead.goToLeads();
  await lead.closeIfOpen();
  await lead.clickNewLead();
  await lead.selectContact(LEAD.contact);
  await lead.fillTitle(LEAD.title);
  await lead.fillBudget(LEAD.budget);
  await lead.fillDescription(LEAD.description);
  await lead.clickPlanWithOjo();
  await lead.applyTemplate(LEAD.template);
  await lead.clickEdit();
  await lead.fillStartDate(LEAD.startDate);
  await lead.fillEndDate(LEAD.endDate);
  await lead.clickCreateLead();

  // ── Assertions: lead created ───────────────────────────────────────────────
  await lead.assertLeadCreated();
  await lead.assertLeadInList(LEAD.title);

  // ════════════════════════════════════════
  // PART 2 — Edit Lead Details
  // ════════════════════════════════════════

  await lead.openLeadFromList(LEAD.title);
  await lead.clickDetailsTab();
  await lead.clickEditDetails();
  await lead.fillDuration(LEAD.duration);
  await lead.addDeliverable(0, LEAD.deliverable);
  await lead.deleteDeliverable('.grid > div:nth-child(2) > .flex.flex-wrap > div:nth-child(5) > .text-red-600');
  await lead.deleteDeliverable('.bg-surface.rounded-2xl.p-4.flex > .flex.flex-wrap > div:nth-child(7) > .text-red-600');
  await lead.fillObjective(3, LEAD.objective);
  await lead.addDeliverable(3, LEAD.figmaDeliverable);
  await lead.clickSave();

  // ════════════════════════════════════════
  // PART 3 — Generate & Sign SLA
  // ════════════════════════════════════════

  console.log('📄 Starting SLA generation...');

  // Convert to SLA → Generate
  await lead.clickConvertToSla();
  await lead.clickGenerateSla();
  await lead.waitForSlaGenerated();

  // Draw provider signature (attempt 1 — then clear and redo)
  await lead.drawSignature([
    { x: 82, y: 0  },
    { x: 69, y: 53 },
    { x: 45, y: 79 },
    { x: 71, y: 50 },
  ]);
  await lead.clearSignature();

  // Draw provider signature (final attempt)
  await lead.drawSignature([{ x: 26, y: 93 }]);

  // Switch to client signature area
  await lead.clickClientSignatureArea();
  await lead.drawSignature([
    { x: 92, y: 63 },
    { x: 32, y: 57 },
    { x: 80, y: 77 },
  ]);

  // Try Generate Invoice → Cancel
  await lead.clickGenerateInvoice();
  await lead.clickCancel();

  // Draw more on provider signature
  await lead.drawSignature([
    { x: 62, y: 65 },
    { x: 56, y: 23 },
    { x: 99, y: 58 },
    { x: 92, y: 72 },
    { x: 43, y: 43 },
  ]);

  // Switch back to client signature area
  await lead.clickClientSignatureArea();
  await lead.drawSignature([{ x: 95, y: 67 }]);

  // Edit SLA content then save
  await lead.editSlaContent(`Service Level Agreement (SLA)

Date: 2026-05-19
Provider: Roxon
Client: Google
Contact: Not specified (bondil.adithya2633@gmail.com)

Project Overview

This Service Level Agreement outlines the terms and conditions for the engagement between Roxon ("Provider") and Google ("Client") for the project Google New Update Marketing.

Services

marketing

branding

design

Timeline

Start Date: 2026-05-29
End Date: 2026-08-28

Budget

Total project budget: ₹25,000

Service Level Terms
Response Times

The Provider commits to the following response times:

Critical Issues: 4 hours

Resolution Target: 24 hours

Support Hours

Monday to Friday, 9 AM to 6 PM IST

Communication

Regular status updates will be provided via email and scheduled review meetings. The primary point of contact is Not specified.

Payment Terms

Payment will be made in milestone-based installments as agreed upon in the project scope. The total engagement value is ₹25,000.`);

  await lead.clickSave();

  // Final signature after save
  await lead.drawSignature([{ x: 51, y: 33 }]);

  // ── Assertion: SLA visible ─────────────────────────────────────────────────
  await lead.assertSlaVisible();

  console.log('🎉 FLOW PASSED — Lead created, details edited, SLA generated & signed!');
}
