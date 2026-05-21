import { Page } from '@playwright/test';

export class AddServicePage {
  constructor(private page: Page) {}

  // ── Navigation ────────────────────────────────────────────────────────────
  async clickServicePricingTab() {
    console.log('🖱️ Clicking Service Pricing tab...');
    await this.page.getByRole('button', { name: 'Service Pricing' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Service Pricing' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Service Pricing tab clicked!');
  }

  async clickServicesSubTab() {
    console.log('🖱️ Clicking Services sub-tab...');
    await this.page.getByRole('button', { name: 'Services' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Services' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Services sub-tab clicked!');
  }

  // ── Close any open panel (e.g. Genie) ────────────────────────────────────
  async closeIfOpen() {
    const closeBtn = this.page.getByRole('button', { name: 'Close', exact: true });
    if (await closeBtn.isVisible().catch(() => false)) {
      console.log('🔒 Closing open panel...');
      await closeBtn.click();
      await this.page.waitForTimeout(300);
    }
  }

  // ── Click Add Service button ──────────────────────────────────────────────
  async clickAddService() {
    console.log('🖱️ Clicking Add Service...');
    await this.page.getByRole('button', { name: 'Add Service' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Add Service' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Add Service clicked!');
  }

  // ── Fill service name ─────────────────────────────────────────────────────
  async fillServiceName(name: string) {
    console.log(`📝 Filling service name: ${name}`);
    const input = this.page.getByRole('textbox', { name: 'e.g., UI UX Design' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(name);
    console.log(`✅ Service name filled: ${name}`);
  }

  // ── Select Pricing Model ──────────────────────────────────────────────────
  async selectPricingModel(model: 'hours_based' | 'per_unit' | 'retainer') {
    console.log(`📝 Selecting pricing model: ${model}`);
    await this.page.getByRole('combobox').waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('combobox').selectOption(model);
    await this.page.waitForTimeout(300);
    console.log(`✅ Pricing model set to: ${model}`);
  }

  // ── Fill price based on placeholder ──────────────────────────────────────
  async fillHourlyPrice(price: number) {
    console.log(`📝 Filling hourly price: ${price}`);
    const input = this.page.getByPlaceholder('1500');
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(String(price));
    console.log('✅ Hourly price filled!');
  }

  async fillPerUnitPrice(price: number) {
    console.log(`📝 Filling per unit price: ${price}`);
    const input = this.page.getByPlaceholder('2500');
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(String(price));
    console.log('✅ Per unit price filled!');
  }

  async fillRetainerPrice(price: number) {
    console.log(`📝 Filling retainer price: ${price}`);
    const input = this.page.getByPlaceholder('75000');
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(String(price));
    console.log('✅ Retainer price filled!');
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  async clickSave() {
    console.log('🖱️ Clicking Save...');
    await this.page.getByRole('button', { name: 'Save' }).nth(1).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Save' }).nth(1).click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Saved!');
  }

  // ── Open edit drawer by icon button index ─────────────────────────────────
 
 
 
 
 
 
 
 
}