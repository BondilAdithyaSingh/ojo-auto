
import { Page, expect } from '@playwright/test';

export class CreateLeadManualPage {
  constructor(private page: Page) {}

  // ── Locators ───────────────────────────────────────────────────────────────
  private newLeadBtn          = () => this.page.getByRole('button', { name: 'New lead' });
  private createManuallyItem  = () => this.page.getByRole('menuitem', { name: 'Create manually' });
  private selectContactBtn    = () => this.page.getByRole('button', { name: 'Select or Add new Contact' });
  private addNewContactItem   = () => this.page.getByRole('menuitem', { name: 'Add new Contact' });
  private personNameInput     = () => this.page.getByRole('textbox', { name: 'Person Name' });
  private emailInput          = () => this.page.getByRole('textbox', { name: 'email' });
  private phoneInput          = () => this.page.getByRole('textbox', { name: '00000000' });
  private companyNameInput    = () => this.page.getByRole('textbox', { name: 'Company Name' });
  private titleInput          = () => this.page.getByRole('textbox', { name: 'Title' });
  private descriptionInput    = () => this.page.getByRole('textbox', { name: 'Description' });
  private createLeadBtn       = () => this.page.getByRole('button', { name: 'Create Lead' });
  private closeBtn            = () => this.page.getByRole('button', { name: 'Close' });

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

  // ── Open New Lead → Create manually ───────────────────────────────────────
  async clickNewLeadManually() {
    console.log('🖱️ Clicking New Lead → Create manually...');
    await this.newLeadBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.newLeadBtn().click();
    await this.createManuallyItem().waitFor({ state: 'visible', timeout: 15000 });
    await this.createManuallyItem().click();
    console.log('✅ Create manually form opened!');
  }

  // ── Open Add New Contact form ──────────────────────────────────────────────
  async clickAddNewContact() {
    console.log('🖱️ Adding new contact...');
    await this.selectContactBtn().waitFor({ state: 'visible', timeout: 15000 });
    await this.selectContactBtn().click();
    await this.addNewContactItem().waitFor({ state: 'visible', timeout: 15000 });
    await this.addNewContactItem().click();
    console.log('✅ Add new Contact form opened!');
  }

  // ── Fill Person Name ───────────────────────────────────────────────────────
  async fillPersonName(name: string) {
    console.log(`📝 Filling person name: ${name}`);
    await this.personNameInput().waitFor({ state: 'visible', timeout: 15000 });
    await this.personNameInput().click();
    await this.personNameInput().fill(name);
    await this.personNameInput().press('Tab');
    console.log('✅ Person name filled!');
  }

  // ── Fill Email ─────────────────────────────────────────────────────────────
  async fillEmail(email: string) {
    console.log(`📝 Filling email: ${email}`);
    await this.emailInput().waitFor({ state: 'visible', timeout: 15000 });
    await this.emailInput().fill(email);
    console.log('✅ Email filled!');
  }

  // ── Fill Phone ─────────────────────────────────────────────────────────────
  async fillPhone(phone: string) {
    console.log(`📝 Filling phone: ${phone}`);
    await this.phoneInput().waitFor({ state: 'visible', timeout: 15000 });
    await this.phoneInput().click();
    await this.phoneInput().fill(phone);
    console.log('✅ Phone filled!');
  }

  // ── Fill Company Name ──────────────────────────────────────────────────────
  async fillCompanyName(company: string) {
    console.log(`📝 Filling company name: ${company}`);
    await this.companyNameInput().waitFor({ state: 'visible', timeout: 15000 });
    await this.companyNameInput().click();
    await this.companyNameInput().fill(company);
    console.log('✅ Company name filled!');
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

  // Assert redirected away from new lead form = created successfully
  async assertLeadCreated() {
    console.log('🔍 Asserting lead was created...');
    await expect(this.page).not.toHaveURL('**/leads/new**', { timeout: 15000 });
    console.log('✅ Redirected away from form — lead created!');
  }

  // Assert lead title appears in the leads list
  async assertLeadInList(title: string) {
    console.log(`🔍 Asserting "${title}" appears in leads list...`);
    await expect(this.page.getByText(title)).toBeVisible({ timeout: 15000 });
    console.log(`✅ "${title}" found in leads list!`);
  }
}
