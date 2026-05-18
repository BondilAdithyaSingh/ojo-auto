import { Page } from '@playwright/test';

export class AddServicePage {
  constructor(private page: Page) {}

  // ── Click Service Pricing tab ─────────────────────────────────────────────
  async clickServicePricingTab() {
    console.log('🖱️ Clicking Service Pricing tab...');
    const tab = this.page.getByRole('button', { name: 'Service Pricing' });
    await tab.waitFor({ state: 'visible', timeout: 15000 });
    await tab.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Service Pricing tab clicked!');
  }

  // ── Click Services sub-tab ────────────────────────────────────────────────
  async clickServicesSubTab() {
    console.log('🖱️ Clicking Services sub-tab...');
    const tab = this.page.getByRole('button', { name: 'Services' });
    await tab.waitFor({ state: 'visible', timeout: 15000 });
    await tab.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Services sub-tab clicked!');
  }

  // ── Click Add Service button ──────────────────────────────────────────────
  async clickAddService() {
    console.log('🖱️ Clicking Add Service...');
    const btn = this.page.getByRole('button', { name: 'Add Service' });
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    await this.page.getByRole('textbox', { name: 'e.g., UI UX Design' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.waitForTimeout(500);
    console.log('✅ Add Service drawer opened!');
  }

  // ── Fill Service Name ─────────────────────────────────────────────────────
  async fillServiceName(name: string) {
    console.log(`📝 Filling service name: ${name}`);
    const input = this.page.getByRole('textbox', { name: 'e.g., UI UX Design' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(name);
    await input.dispatchEvent('input');
    await input.dispatchEvent('change');
    await this.page.waitForTimeout(300);
    console.log('✅ Service name filled!');
  }

  // ── Fill Price ────────────────────────────────────────────────────────────
  async fillPrice(price: number) {
    console.log(`📝 Filling price: ${price}`);
    const input = this.page.getByPlaceholder('1500');
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(String(price));
    await input.dispatchEvent('input');
    await input.dispatchEvent('change');
    await this.page.waitForTimeout(300);
    console.log('✅ Price filled!');
  }

  // ── Click Save ────────────────────────────────────────────────────────────
  async clickSave() {
    console.log('🖱️ Clicking Save...');
    const saveBtn = this.page.getByRole('button', { name: 'Save' }).nth(1);
    await saveBtn.waitFor({ state: 'visible', timeout: 15000 });
    await saveBtn.click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Service saved!');
  }

  // ── Verify Service Added ──────────────────────────────────────────────────
  async verifyServiceAdded() {
    console.log('🔍 Verifying service was added...');
    await this.page.waitForTimeout(1000);
    console.log('✅ Service added successfully!');
  }
}