import { Page, expect } from '@playwright/test';

export class CreateLeadPage {
  constructor(private page: Page) {}

  // ── Locators ───────────────────────────────────────────────────────────────
  private newLeadBtn        = () => this.page.getByRole('button', { name: 'New lead' });
  private createWithOjoItem = () => this.page.getByRole('menuitem', { name: 'Create with OJO' });
  private selectContactBtn  = () => this.page.getByRole('button', { name: 'Select or Add new Contact' });
  private titleInput        = () => this.page.getByRole('textbox', { name: 'Title' });
  private budgetInput       = () => this.page.getByRole('textbox', { name: 'Budget' });
  private descriptionInput  = () => this.page.getByRole('textbox', { name: 'Description' });
  private planWithOjoBtn    = () => this.page.getByRole('button', { name: 'Plan with Ojo' });
  private quickStartBtn     = () => this.page.getByRole('button', { name: 'Quick start Apply a saved' });
  private editBtn           = () => this.page.getByRole('button', { name: 'Edit' });
  private createLeadBtn     = () => this.page.getByRole('button', { name: 'Create lead' });
  private closeBtn          = () => this.page.getByRole('button', { name: 'Close' });
  private saveBtn           = () => this.page.getByRole('button', { name: 'Save' });
  private convertToSlaBtn   = () => this.page.getByRole('button', { name: 'Convert to SLA' });
  private generateSlaBtn    = () => this.page.getByRole('button', { name: 'Generate SLA' });
  private slaGeneratedBtn   = () => this.page.getByRole('button', { name: 'SLA Generated 100%' });
  private clearSignatureBtn = () => this.page.getByRole('button', { name: 'Clear signature' }).first();
  private generateInvoiceBtn = () => this.page.getByRole('button', { name: 'Generate Invoice' });
  private cancelBtn         = () => this.page.getByRole('button', { name: 'Cancel' });
  private canvas            = () => this.page.locator('canvas').first();

  // ── Navigate to Leads list ─────────────────────────────────────────────────
  async goToLeads() {
  console.log('🖱️ Navigating to Leads...');
  await this.page.locator('a[href="/v2/leads"]').waitFor({ state: 'visible', timeout: 15000 });
  await this.page.locator('a[href="/v2/leads"]').click();
  await this.page.waitForTimeout(500);
  console.log('✅ On Leads page!');
}

  // ── Close any panel that auto-opens ───────────────────────────────────────
  async closeIfOpen() {
    if (await this.closeBtn().isVisible().catch(() => false)) {
      console.log('🔒 Closing auto-opened panel...');
      await this.closeBtn().click();
      await this.page.waitForTimeout(300);
    }
  }

  // ── Open New Lead → Create with OJO ───────────────────────────────────────
  async clickNewLead() {
    console.log('🖱️ Clicking New Lead → Create with OJO...');
    await this.newLeadBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.newLeadBtn().click();
    await this.createWithOjoItem().waitFor({ state: 'visible', timeout: 15000 });
    await this.createWithOjoItem().click();
    console.log('✅ Create with OJO opened!');
  }

  // ── Select existing contact by search text ────────────────────────────────
  async selectContact(searchText: string) {
    console.log(`📝 Selecting contact: ${searchText}`);
    await this.selectContactBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.selectContactBtn().click();
    await this.page.locator('span').filter({ hasText: searchText }).first()
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('span').filter({ hasText: searchText }).first().click();
    console.log(`✅ Contact selected!`);
  }

  // ── Fill Title ─────────────────────────────────────────────────────────────
  async fillTitle(title: string) {
    console.log(`📝 Filling title: ${title}`);
    await this.titleInput().waitFor({ state: 'visible', timeout: 15000 });
    await this.titleInput().click();
    await this.titleInput().fill(title);
    console.log('✅ Title filled!');
  }

  // ── Fill Budget ────────────────────────────────────────────────────────────
  async fillBudget(budget: string) {
    console.log(`📝 Filling budget: ${budget}`);
    await this.budgetInput().waitFor({ state: 'visible', timeout: 15000 });
    await this.budgetInput().click();
    await this.budgetInput().fill(budget);
    console.log('✅ Budget filled!');
  }

  // ── Fill Description ───────────────────────────────────────────────────────
  async fillDescription(description: string) {
    console.log(`📝 Filling description...`);
    await this.descriptionInput().waitFor({ state: 'visible', timeout: 15000 });
    await this.descriptionInput().click();
    await this.descriptionInput().fill(description);
    console.log('✅ Description filled!');
  }

  // ── Click Plan with Ojo ────────────────────────────────────────────────────
  async clickPlanWithOjo() {
    console.log('🖱️ Clicking Plan with Ojo...');
    await this.planWithOjoBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.planWithOjoBtn().click();
    await this.page.waitForURL('**/leads/new/review', { timeout: 90000 });
    console.log('✅ On review page!');
  }

  // ── Apply saved template ───────────────────────────────────────────────────
  async applyTemplate(templateName: string) {
    console.log(`📝 Applying template: ${templateName}`);
    await this.quickStartBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.quickStartBtn().click();
    await this.page.getByRole('button', { name: templateName })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: templateName }).click();
    await this.page.waitForTimeout(1000);
    console.log(`✅ Template applied!`);
  }

  // ── Click Edit (on review page) ────────────────────────────────────────────
  async clickEdit() {
    console.log('🖱️ Clicking Edit...');
    await this.editBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.editBtn().click();
    await this.page.waitForTimeout(500);
    console.log('✅ Edit clicked!');
  }

  // ── Fill Start Date ────────────────────────────────────────────────────────
  async fillStartDate(date: string) {
    console.log(`📝 Filling start date: ${date}`);
    await this.page.locator('input[type="date"]').first()
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('input[type="date"]').first().fill(date);
    console.log('✅ Start date filled!');
  }

  // ── Fill End Date ──────────────────────────────────────────────────────────
  async fillEndDate(date: string) {
    console.log(`📝 Filling end date: ${date}`);
    await this.page.locator('input[type="date"]').nth(1)
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('input[type="date"]').nth(1).fill(date);
    console.log('✅ End date filled!');
  }

  // ── Create Lead ────────────────────────────────────────────────────────────
  async clickCreateLead() {
    console.log('🖱️ Clicking Create lead...');
    await this.createLeadBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.createLeadBtn().click();
    await this.page.waitForTimeout(3000);
    console.log('✅ Lead created!');
  }

  // ── Open created lead from list ────────────────────────────────────────────
  async openLeadFromList(leadTitle: string) {
    console.log(`🖱️ Opening lead: ${leadTitle}`);
    await this.page.getByRole('cell', { name: leadTitle })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('cell', { name: leadTitle }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Lead opened!');
  }

  // ── Click Details tab ──────────────────────────────────────────────────────
  async clickDetailsTab() {
    console.log('🖱️ Clicking Details tab...');
    await this.page.getByRole('button', { name: 'Details' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Details' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Details tab opened!');
  }

  // ── Click Edit on details page ─────────────────────────────────────────────
  async clickEditDetails() {
    console.log('🖱️ Clicking Edit on details...');
    await this.page.getByRole('button', { name: 'Edit', description: 'Edit', exact: true })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Edit', description: 'Edit', exact: true }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Edit mode on!');
  }

  // ── Fill Duration for first service ───────────────────────────────────────
  async fillDuration(duration: string) {
    console.log(`📝 Filling duration: ${duration}`);
    await this.page.getByPlaceholder('Duration').first()
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByPlaceholder('Duration').first().click();
    await this.page.getByPlaceholder('Duration').first().fill(duration);
    console.log('✅ Duration filled!');
  }

  // ── Add deliverable to a service by index ─────────────────────────────────
  async addDeliverable(index: number, deliverable: string) {
    console.log(`📝 Adding deliverable (nth ${index}): ${deliverable}`);
    const input = this.page.getByRole('textbox', { name: 'Add deliverable...' }).nth(index);
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(deliverable);
    console.log('✅ Deliverable added!');
  }

  // ── Delete a deliverable tag ───────────────────────────────────────────────
  async deleteDeliverable(cssLocator: string) {
    console.log('🗑️ Deleting deliverable...');
    await this.page.locator(cssLocator).first()
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator(cssLocator).first().click();
    console.log('✅ Deliverable deleted!');
  }

  // ── Fill project objective by index ───────────────────────────────────────
  async fillObjective(index: number, objective: string) {
    console.log(`📝 Filling objective (nth ${index}): ${objective}`);
    const input = this.page.getByRole('textbox', { name: 'Enter project objective...' }).nth(index);
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(objective);
    console.log('✅ Objective filled!');
  }

  // ── Save ───────────────────────────────────────────────────────────────────
  async clickSave() {
    console.log('🖱️ Clicking Save...');
    await this.saveBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.saveBtn().click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Saved!');
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLA METHODS
  // ══════════════════════════════════════════════════════════════════════════

  // ── Click Convert to SLA ───────────────────────────────────────────────────
  async clickConvertToSla() {
    console.log('🖱️ Clicking Convert to SLA...');
    await this.convertToSlaBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.convertToSlaBtn().click();
    await this.page.waitForTimeout(500);
    console.log('✅ Convert to SLA clicked!');
  }

  // ── Click Generate SLA ─────────────────────────────────────────────────────
  async clickGenerateSla() {
    console.log('🖱️ Clicking Generate SLA...');
    await this.generateSlaBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.generateSlaBtn().click();
    console.log('✅ Generate SLA clicked!');
  }

  // ── Wait for SLA to finish generating ─────────────────────────────────────
  async waitForSlaGenerated() {
    console.log('⏳ Waiting for SLA to generate...');
    await this.slaGeneratedBtn().waitFor({ state: 'visible', timeout: 60000 });
    await this.slaGeneratedBtn().click();
    await this.page.waitForTimeout(1000);
    console.log('✅ SLA generated!');
  }

  // ── Draw signature on canvas at given positions ────────────────────────────
  async drawSignature(positions: { x: number; y: number }[]) {
    console.log('✍️ Drawing signature...');
    await this.canvas().waitFor({ state: 'visible', timeout: 15000 });
    for (const pos of positions) {
      await this.canvas().click({ position: pos });
    }
    console.log('✅ Signature drawn!');
  }

  // ── Clear signature ────────────────────────────────────────────────────────
  async clearSignature() {
    console.log('🗑️ Clearing signature...');
    await this.clearSignatureBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.clearSignatureBtn().click();
    await this.page.waitForTimeout(300);
    console.log('✅ Signature cleared!');
  }

  // ── Click CLIENT REPRESENTATIVE signature area ──────────────────────────────
  async clickClientSignatureArea() {
    console.log('🖱️ Clicking Client Representative signature area...');
    await this.page.getByText('CLIENT REPRESENTATIVEDraw').click();
    await this.page.waitForTimeout(300);
    console.log('✅ Client signature area active!');
  }

  // ── Click Generate Invoice ─────────────────────────────────────────────────
  async clickGenerateInvoice() {
    console.log('🖱️ Clicking Generate Invoice...');
    await this.generateInvoiceBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.generateInvoiceBtn().click();
    await this.page.waitForTimeout(500);
    console.log('✅ Generate Invoice clicked!');
  }

  // ── Click Cancel (dismisses invoice dialog) ────────────────────────────────
  async clickCancel() {
    console.log('🖱️ Clicking Cancel...');
    await this.cancelBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.cancelBtn().click();
    await this.page.waitForTimeout(300);
    console.log('✅ Cancelled!');
  }

  // ── Edit SLA text content ──────────────────────────────────────────────────
  async editSlaContent(content: string) {
    console.log('📝 Editing SLA content...');
    await this.page.getByRole('button', { name: 'Edit', description: 'Edit', exact: true })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Edit', description: 'Edit', exact: true }).click();
    await this.page.waitForTimeout(500);
    // Fill the SLA text area
    const slaTextArea = this.page.getByText('Service Level Agreement (SLA)Date:');
    await slaTextArea.waitFor({ state: 'visible', timeout: 15000 });
    await slaTextArea.fill(content);
    console.log('✅ SLA content edited!');
  }

  // ── Assertions ─────────────────────────────────────────────────────────────
  async assertLeadCreated() {
    console.log('🔍 Asserting lead was created...');
    await expect(this.page).not.toHaveURL('**/leads/new/review', { timeout: 15000 });
    console.log('✅ Lead created successfully!');
  }

  async assertLeadInList(title: string) {
    console.log(`🔍 Asserting "${title}" in leads list...`);
    await expect(this.page.getByText(title)).toBeVisible({ timeout: 15000 });
    console.log(`✅ "${title}" found in list!`);
  }

  async assertSlaVisible() {
    console.log('🔍 Asserting SLA is visible...');
    await expect(this.page.getByText('Service Level Agreement')).toBeVisible({ timeout: 15000 });
    console.log('✅ SLA is visible!');
  }
}
