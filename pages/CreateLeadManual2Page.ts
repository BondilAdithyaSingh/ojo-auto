import { Page, expect } from '@playwright/test';

export class CreateLeadManual2Page {
  constructor(private page: Page) {}

  // ── Locators ───────────────────────────────────────────────────────────────
  private newLeadBtn         = () => this.page.getByRole('button', { name: 'New lead' });
  private createManuallyItem = () => this.page.getByRole('menuitem', { name: 'Create manually' });
  private selectContactBtn   = () => this.page.getByRole('button', { name: 'Select or Add new Contact' });
  private titleInput         = () => this.page.getByRole('textbox', { name: 'Title' });
  private descriptionInput   = () => this.page.getByRole('textbox', { name: 'Description' });
  private createLeadBtn      = () => this.page.getByRole('button', { name: 'Create Lead' });
  private closeBtn           = () => this.page.getByRole('button', { name: 'Close' });

  // ── Navigate to Leads list ─────────────────────────────────────────────────
  async goToLeads() {
    console.log('🖱️ Navigating to Leads...');
    await this.page.locator('a[href="/v2/leads"]').waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('a[href="/v2/leads"]').click();
    await this.page.waitForTimeout(500);
    console.log('✅ On Leads page!');
  }

  // ── Close any panel that auto-opens ───────────────────────────────────────

  // ── Open New Lead → Create manually ───────────────────────────────────────
  async clickNewLeadManually() {
    console.log('🖱️ Clicking New Lead → Create manually...');
    await this.newLeadBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.newLeadBtn().click();
    await this.createManuallyItem().waitFor({ state: 'visible', timeout: 15000 });
    await this.createManuallyItem().click();
    console.log('✅ Create manually form opened!');
  }

    // ── Close any auto-opened panel ────────────────────────────────────────────
   async closeIfOpen() {
   if (await this.closeBtn().isVisible().catch(() => false)) {
     console.log('🔒 Closing auto-opened panel...');
     await this.closeBtn().click();
     await this.page.waitForTimeout(300);
   }
 }

  // ── Select existing contact by search text ────────────────────────────────
  async selectExistingContact(searchText: string) {
    console.log(`📝 Selecting existing contact: ${searchText}`);
    await this.selectContactBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.selectContactBtn().click();
    await this.page.locator('span').filter({ hasText: searchText }).nth(1)
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('span').filter({ hasText: searchText }).nth(1).click();
    console.log('✅ Existing contact selected!');
  }

  // ── Fill Lead Title ────────────────────────────────────────────────────────
  async fillTitle(title: string) {
    console.log(`📝 Filling title: ${title}`);
    await this.titleInput().waitFor({ state: 'visible', timeout: 15000 });
    await this.titleInput().click();
    await this.titleInput().fill(title);
    console.log('✅ Title filled!');
  }

  // ── Fill Description ───────────────────────────────────────────────────────
  async fillDescription(description: string) {
    console.log(`📝 Filling description...`);
    await this.descriptionInput().waitFor({ state: 'visible', timeout: 15000 });
    await this.descriptionInput().click();
    await this.descriptionInput().fill(description);
    console.log('✅ Description filled!');
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  async clickCreateLead() {
    console.log('🖱️ Clicking Create Lead...');
    await this.createLeadBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.createLeadBtn().click();
    await this.page.waitForTimeout(3000);
    console.log('✅ Create Lead clicked!');
  }

  // ── Assertions ─────────────────────────────────────────────────────────────
  // async assertLeadCreated() {
    // console.log('🔍 Asserting lead was created...');
    // await expect(this.page).not.toHaveURL('**/leads/new**', { timeout: 15000 });
    // console.log('✅ Redirected away from form — lead created!');
  // }

  // async assertLeadInList(title: string) {
    // console.log(`🔍 Asserting "${title}" appears in leads list...`);
    // await expect(this.page.getByText(title)).toBeVisible({ timeout: 15000 });
    // console.log(`✅ "${title}" found in leads list!`);
  // }
}
