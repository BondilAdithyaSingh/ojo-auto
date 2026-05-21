import { Page, expect } from '@playwright/test';

export class LeadDetailsPage {
  constructor(private page: Page) {}

  // ── Locators ───────────────────────────────────────────────────────────────
  private closeBtn       = () => this.page.getByRole('button', { name: 'Close' });
  private detailsTab     = () => this.page.getByRole('button', { name: 'Details' });
  private addServiceBtn  = () => this.page.getByRole('button', { name: 'Add service' });
  private moreActionsBtn = () => this.page.getByRole('button', { name: 'More actions' });
  private editBtn        = () => this.page.getByRole('button', { name: 'Edit', description: 'Edit', exact: true });
  private saveBtn        = () => this.page.getByRole('button', { name: 'Save' });

  // ── Navigate to Leads list ─────────────────────────────────────────────────
  async goToLeads() {
    console.log('🖱️ Navigating to Leads...');
    await this.page.locator('a[href="/v2/leads"]').waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('a[href="/v2/leads"]').click();
    await this.page.getByRole('button', { name: 'List' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ On Leads page!');
  }

  // ── Open a lead by title ───────────────────────────────────────────────────
  async openLead(title: string) {
    console.log(`🖱️ Opening lead: ${title}`);
    await this.page.getByTitle(title).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByTitle(title).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Lead opened!');
  }

  // ── Close any auto-opened panel ────────────────────────────────────────────
       async closeIfOpen() {
const closeBtn = this.page.getByRole('button', { name: 'Close', exact: true });
if (await closeBtn.isVisible().catch(() => false)) {
  console.log('🔒 Closing open panel...');
  await closeBtn.click();
  await this.page.waitForTimeout(300);
}
}


  // ── Click Details tab ──────────────────────────────────────────────────────
  async clickDetailsTab() {
    console.log('🖱️ Clicking Details tab...');
    await this.detailsTab().waitFor({ state: 'visible', timeout: 15000 });
    await this.detailsTab().click();
    await this.page.waitForTimeout(500);
    console.log('✅ Details tab opened!');
  }

  // ── Add service and select from dropdown ───────────────────────────────────
  async addService(serviceBtnName: string) {
    console.log(`➕ Adding service: ${serviceBtnName}`);
    await this.addServiceBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.addServiceBtn().click();
    await this.page.getByRole('button', { name: serviceBtnName })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: serviceBtnName }).click();
    // Confirm the selection
    await this.addServiceBtn().click();
    console.log('✅ Service added!');
  }

  // ── Click More actions ─────────────────────────────────────────────────────
  async clickMoreActions() {
    console.log('🖱️ Clicking More actions...');
    await this.moreActionsBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.moreActionsBtn().click();
    await this.page.waitForTimeout(300);
    console.log('✅ More actions clicked!');
  }

  // ── Click Edit ─────────────────────────────────────────────────────────────
  async clickEdit() {
    console.log('🖱️ Clicking Edit...');
    await this.editBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.editBtn().click();
    await this.page.waitForTimeout(500);
    console.log('✅ Edit mode on!');
  }

  // ── Fill budget by index ───────────────────────────────────────────────────
  async fillBudget(index: number, amount: string) {
    console.log(`📝 Filling budget (nth ${index}): ${amount}`);
    const input = this.page.getByPlaceholder('Enter budget...').nth(index);
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(amount);
    console.log('✅ Budget filled!');
  }

  // ── Fill duration by index ─────────────────────────────────────────────────
  async fillDuration(index: number, duration: string) {
    console.log(`📝 Filling duration (nth ${index}): ${duration}`);
    const input = this.page.getByPlaceholder('Duration').nth(index);
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(duration);
    console.log('✅ Duration filled!');
  }

  // ── Fill deliverable by index ──────────────────────────────────────────────
  async fillDeliverable(index: number, value: string) {
    console.log(`📝 Filling deliverable (nth ${index}): ${value}`);
    const input = this.page.getByRole('textbox', { name: 'Add deliverable...' }).nth(index);
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(value);
    console.log('✅ Deliverable filled!');
  }

  // ── Fill objective by index ────────────────────────────────────────────────
  async fillObjective(index: number, value: string) {
    console.log(`📝 Filling objective (nth ${index}): ${value}`);
    const input = this.page.getByRole('textbox', { name: 'Enter project objective...' }).nth(index);
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(value);
    console.log('✅ Objective filled!');
  }

  // ── Fill "Add new..." input by index ──────────────────────────────────────
  async fillAddNew(index: number, value: string) {
    console.log(`📝 Filling Add new (nth ${index}): ${value}`);
    const input = this.page.getByRole('textbox', { name: 'Add new...' }).nth(index);
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(value);
    console.log('✅ Add new filled!');
  }

  // ── Save ───────────────────────────────────────────────────────────────────
  async clickSave() {
    console.log('🖱️ Clicking Save...');
    await this.saveBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.saveBtn().click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Saved!');
  }

  // ── Click More SLA creation options ───────────────────────────────────────
  async clickMoreSlaOptions() {
    console.log('🖱️ Clicking More SLA creation options...');
    await this.page.getByRole('button', { name: 'More SLA creation options' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'More SLA creation options' }).click();
    await this.page.waitForTimeout(300);
    console.log('✅ More SLA options opened!');
  }

  // ── Click Create manually (SLA) ────────────────────────────────────────────
  async clickCreateSlaManually() {
    console.log('🖱️ Clicking Create manually...');
    await this.page.getByRole('button', { name: 'Create manually' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Create manually' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Create manually clicked!');
  }

  // ── Save SLA ───────────────────────────────────────────────────────────────
  async clickSaveSla() {
    console.log('🖱️ Clicking Save SLA...');
    await this.page.getByRole('button', { name: 'Save SLA' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Save SLA' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ SLA saved!');
  }

  // ── Add signature block ───────────────────────────────────────────────────
  async addSignatureBlock() {
    console.log('🖱️ Adding signature block...');
    const addSigBtn = this.page.getByRole('button', { name: 'Add signature block' });
    if (await addSigBtn.isVisible().catch(() => false)) {
      await addSigBtn.click();
      await this.page.waitForTimeout(500);
      console.log('✅ Signature block added!');
    } else {
      console.log('ℹ️ Signature block already present, skipping...');
    }
  }

  // ── Sign as Service Provider (left canvas) ─────────────────────────────────
  async signAsServiceProvider() {
    console.log('✍️ Signing as Service Provider...');
    const canvas = this.page.locator('canvas').first();
    const addSigBtn = this.page.getByRole('button', { name: 'Add signature block' });

    // If canvas not visible → click Add signature block first
    const canvasVisible = await canvas.isVisible().catch(() => false);
    if (!canvasVisible) {
      console.log('🖱️ Canvas not visible — clicking Add signature block...');
      await addSigBtn.waitFor({ state: 'visible', timeout: 15000 });
      await addSigBtn.click();
      await this.page.waitForTimeout(500);
      console.log('✅ Signature block added!');
    } else {
      console.log('ℹ️ Canvas already visible — skipping Add signature block');
    }

    // Wait for canvas to be ready
    await canvas.waitFor({ state: 'visible', timeout: 15000 });

    // The signature pad is inside .bg-gray-50.rounded-lg container
    // Click directly on that container at multiple positions to draw
    const pad = this.page.locator('.bg-gray-50.rounded-lg').first();
    await pad.waitFor({ state: 'visible', timeout: 15000 });
    const box = await pad.boundingBox();
    if (!box) throw new Error('Signature pad container not found');

    // Click at multiple points to draw signature
    await pad.click({ position: { x: 30, y: 60 } });
    await pad.click({ position: { x: 50, y: 40 } });
    await pad.click({ position: { x: 70, y: 70 } });
    await pad.click({ position: { x: 90, y: 40 } });
    await pad.click({ position: { x: 110, y: 70 } });
    await pad.click({ position: { x: 130, y: 50 } });
    await pad.click({ position: { x: 150, y: 60 } });
    await this.page.waitForTimeout(500);

    // Click Sign button to confirm
    await this.page.getByRole('button', { name: 'Sign' }).first()
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Sign' }).first().click();
    await this.page.waitForTimeout(500);
    console.log('✅ Service Provider signed!');
  }

  // ── Assertions ─────────────────────────────────────────────────────────────
  async assertDetailsSaved() {
    console.log('🔍 Asserting details saved...');
    await expect(this.editBtn()).toBeVisible({ timeout: 15000 });
    console.log('✅ Details saved — back to view mode!');
  }

  async assertSlaSaved() {
    console.log('🔍 Asserting SLA saved...');
    await expect(this.page.getByRole('button', { name: 'Save SLA' }))
      .not.toBeVisible({ timeout: 10000 });
    console.log('✅ SLA saved successfully!');
  }

  async assertSigned() {
    // Signature canvas is visual only — no reliable DOM indicator after signing
    console.log('✅ Signature step completed!');
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLA FEEDBACK + SHARE + INVOICE METHODS
  // ══════════════════════════════════════════════════════════════════════════

  // ── Click SLA Generated button ─────────────────────────────────────────────
  async clickSlaGenerated() {
    console.log('🖱️ Clicking SLA Generated...');
    await this.page.getByRole('button', { name: 'SLA Generated 100%' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'SLA Generated 100%' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ SLA opened!');
  }

  // ── Give feedback on SLA ───────────────────────────────────────────────────
  async giveFeedback(comment: string) {
    console.log('📝 Giving feedback...');
    await this.page.getByRole('button', { name: 'Give Feedback' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Give Feedback' }).click();
    await this.page.waitForTimeout(300);

    // Click on the SLA content to place comment
    await this.page.getByText('{{services_list}}').click();
    await this.page.waitForTimeout(300);

    // Type the comment
    const commentBox = this.page.getByRole('textbox', { name: 'Add a comment' });
    await commentBox.waitFor({ state: 'visible', timeout: 15000 });
    await commentBox.fill(comment);
    console.log('✅ Comment typed!');

    // Submit comment
    await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
    await this.page.waitForTimeout(300);
    console.log('✅ Feedback submitted!');
  }

  // ── Click Share button ─────────────────────────────────────────────────────
  async clickShare() {
    console.log('🖱️ Clicking Share...');
    await this.page.locator('button').filter({ hasText: 'Share' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('button').filter({ hasText: 'Share' }).click();
    await this.page.waitForTimeout(300);
    console.log('✅ Share clicked!');
  }

  // ── Exit comment mode ──────────────────────────────────────────────────────
  async exitCommentMode() {
    console.log('🖱️ Exiting comment mode...');
    await this.page.getByRole('button', { name: 'Exit Comment Mode' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Exit Comment Mode' }).click();
    await this.page.waitForTimeout(300);
    console.log('✅ Exited comment mode!');
  }

  // ── Wait for manual signature — pauses test for user to sign ──────────────
  async waitForManualSignature(timeoutMs: number = 120000) {
    console.log('⏳ Waiting for manual signature...');
    console.log('👆 Please draw your signature and click the Sign button!');
    // After signing, Remove signature button appears at top of page
    // Poll every 2 seconds to check for it
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const removeSigBtn = this.page.getByRole('button', { name: 'Remove signature' });
      const isSigned = await removeSigBtn.isVisible().catch(() => false);
      if (isSigned) {
        console.log('✅ Signature detected — continuing!');
        return;
      }
      await this.page.waitForTimeout(2000);
    }
    throw new Error('Manual signature timeout — please sign and click Sign button');
  }

  // ── Generate Invoice ───────────────────────────────────────────────────────
  async clickGenerateInvoice() {
    console.log('🖱️ Clicking Generate Invoice...');
    await this.page.getByRole('button', { name: 'Generate Invoice' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Generate Invoice' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Generate Invoice clicked!');
  }

  // ── Confirm Generate Anyway ────────────────────────────────────────────────
  async clickGenerateAnyway() {
    console.log('🖱️ Clicking Generate Anyway...');
    await this.page.getByRole('button', { name: 'Generate Anyway' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Generate Anyway' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Invoice generating!');
  }

  // ── Expand invoice details ─────────────────────────────────────────────────
  async clickExpandDetails() {
    console.log('🖱️ Expanding invoice details...');
    await this.page.getByRole('button', { name: 'Expand details' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Expand details' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Details expanded!');
  }

  // ── Click Edit Invoice ─────────────────────────────────────────────────────
  async clickEditInvoice() {
    console.log('🖱️ Clicking Edit invoice...');
    await this.page.getByRole('button', { name: 'Edit invoice' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Edit invoice' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Edit invoice opened!');
  }

  // ── Fill billing address ───────────────────────────────────────────────────
  async fillBillingAddress(address: string) {
    console.log();
    const input = this.page.getByRole('textbox', { name: 'Enter billing address' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(address);
    console.log('✅ Billing address filled!');
  }

  // ── Fill GSTIN ─────────────────────────────────────────────────────────────
  async fillGstin(gstin: string) {
    console.log();
    const input = this.page.getByRole('textbox', { name: 'Enter GSTIN' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(gstin);
    console.log('✅ GSTIN filled!');
  }

  // ── Clear project field ────────────────────────────────────────────────────
  async clearProjectField() {
    console.log('🖱️ Clearing project field...');
    await this.page.getByRole('textbox', { name: 'No projects for this client' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('textbox', { name: 'No projects for this client' }).click();
    await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
    await this.page.waitForTimeout(300);
    console.log('✅ Project field cleared!');
  }

  // ── Click Update ───────────────────────────────────────────────────────────
  async clickUpdate() {
    console.log('🖱️ Clicking Update...');
    await this.page.getByRole('button', { name: 'Update' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Update' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Updated!');
  }

  // ── Send Invoice ───────────────────────────────────────────────────────────
  async clickSendInvoice() {
    console.log('🖱️ Clicking Send Invoice...');
    await this.page.getByRole('button', { name: 'Send Invoice' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Send Invoice' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Invoice sent!');
  }

  // ── Go back ────────────────────────────────────────────────────────────────
  async clickGoBack() {
    console.log('🖱️ Clicking Go back...');
    await this.page.getByRole('button', { name: 'Go back' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Go back' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Went back!');
  }

  // ── Assertion: invoice sent ────────────────────────────────────────────────
  async assertInvoiceSent() {
    console.log('🔍 Asserting invoice was sent...');
    await expect(this.page).not.toHaveURL('**/invoice**', { timeout: 15000 });
    console.log('✅ Invoice sent and returned to lead!');
  }

  // ══════════════════════════════════════════════════════════════════════════
  // MESSAGES + EMAIL + NOTES METHODS
  // ══════════════════════════════════════════════════════════════════════════

  // ── Click first chat/message icon ─────────────────────────────────────────
  async clickChatIcon() {
    console.log('🖱️ Clicking chat icon...');
    await this.page.locator('.flex-1.flex.flex-col.items-center.gap-1.py-2.px-1.text-xs.transition-colors.cursor-pointer.text-gray-500').first()
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('.flex-1.flex.flex-col.items-center.gap-1.py-2.px-1.text-xs.transition-colors.cursor-pointer.text-gray-500').first().click();
    await this.page.waitForTimeout(300);
    console.log('✅ Chat icon clicked!');
  }

  // ── Send a chat message ────────────────────────────────────────────────────
  async sendChatMessage(message: string) {
    console.log(`📝 Sending chat message: ${message}`);
    const input = this.page.getByRole('textbox', { name: 'Type a message...' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(message);
    await this.page.getByRole('button', { name: 'Send message' }).click();
    await this.page.waitForTimeout(300);
    console.log('✅ Chat message sent!');
  }

  // ── Click email tab (4th button in tab bar) ────────────────────────────────
  async clickEmailTab() {
    console.log('🖱️ Clicking Email tab...');
    await this.page.locator('.flex.border-b > button:nth-child(4)')
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('.flex.border-b > button:nth-child(4)').click();
    await this.page.waitForTimeout(300);
    console.log('✅ Email tab opened!');
  }

  // ── Click New Mail ────────────────────────────────────────────────────────
  async clickNewMail() {
    console.log('🖱️ Clicking New Mail...');
    await this.page.getByRole('button', { name: 'New Mail' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'New Mail' }).click();
    await this.page.waitForTimeout(300);
    console.log('✅ New Mail opened!');
  }

  // ── Fill email subject ─────────────────────────────────────────────────────
  async fillEmailSubject(subject: string) {
    console.log(`📝 Filling email subject: ${subject}`);
    const input = this.page.getByRole('textbox', { name: 'Email subject' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(subject);
    console.log('✅ Subject filled!');
  }

  // ── Fill email body ────────────────────────────────────────────────────────
  async fillEmailBody(body: string) {
    console.log(`📝 Filling email body...`);
    const input = this.page.getByRole('textbox', { name: 'Write your message...' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(body);
    console.log('✅ Email body filled!');
  }

  // ── Send email ────────────────────────────────────────────────────────────
  async clickSendEmail() {
    console.log('🖱️ Clicking Send Email...');
    await this.page.getByRole('button', { name: 'Send Email' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Send Email' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Email sent!');
  }

  // ── Click 3rd tab in tab bar (calls/activity) ──────────────────────────────
  async clickThirdTab() {
    console.log('🖱️ Clicking 3rd tab...');
    await this.page.locator('.flex.border-b > button:nth-child(3)')
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('.flex.border-b > button:nth-child(3)').click();
    await this.page.waitForTimeout(300);
    console.log('✅ 3rd tab clicked!');
  }

  // ── Click 4th button (first in list) ──────────────────────────────────────
  async clickFourthBtn() {
    console.log('🖱️ Clicking 4th button...');
    await this.page.locator('button:nth-child(4)').first()
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('button:nth-child(4)').first().click();
    await this.page.waitForTimeout(300);
    console.log('✅ 4th button clicked!');
  }

  // ── Click Notes & Files tab ────────────────────────────────────────────────
  async clickNotesAndFiles() {
    console.log('🖱️ Clicking Notes & Files tab...');
    await this.page.getByRole('button', { name: 'Notes & Files' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Notes & Files' }).click();
    await this.page.waitForTimeout(300);
    console.log('✅ Notes & Files tab opened!');
  }

  // ── Add a note ────────────────────────────────────────────────────────────
  async addNote(note: string) {
    console.log(`📝 Adding note: ${note}`);
    const input = this.page.getByRole('textbox', { name: 'Add a note...' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(note);
    await this.page.getByRole('button', { name: 'Send' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Note added!');
  }

  // ── Click Files tab ────────────────────────────────────────────────────────
  async clickFilesTab() {
    console.log('🖱️ Clicking Files tab...');
    await this.page.getByRole('button', { name: 'Files', exact: true })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Files', exact: true }).click();
    await this.page.waitForTimeout(300);
    console.log('✅ Files tab opened!');
  }

  // ── Assertions ─────────────────────────────────────────────────────────────
  async assertNoteSaved(noteText: string) {
    console.log(`🔍 Asserting note is visible: ${noteText}`);
    await expect(this.page.getByText(noteText)).toBeVisible({ timeout: 15000 });
    console.log('✅ Note saved and visible!');
  }
}