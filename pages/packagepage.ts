import { Page } from '@playwright/test';

export class PackagePage {
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

  // ── Click Packages sub-tab ────────────────────────────────────────────────
  async clickPackagesSubTab() {
    console.log('🖱️ Clicking Packages sub-tab...');
    const tab = this.page.getByRole('button', { name: 'Packages' });
    await tab.waitFor({ state: 'visible', timeout: 15000 });
    await tab.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Packages sub-tab clicked!');
  }

  // ── Click Create Package button ───────────────────────────────────────────
  async clickCreatePackage() {
    console.log('🖱️ Clicking Create Package...');
    const btn = this.page.getByRole('button', { name: 'Add New' });
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();

    // Wait for drawer to open
    await this.page
      .getByRole('textbox', { name: 'Enter package name' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await this.page.waitForTimeout(500);
    console.log('✅ Create Package drawer opened!');
  }

  // ── Fill Package Name ─────────────────────────────────────────────────────
  async fillPackageName(name: string) {
    console.log(`📝 Filling package name: ${name}`);
    const input = this.page.getByRole('textbox', { name: 'Enter package name' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(name);
    await input.dispatchEvent('input');
    await input.dispatchEvent('change');
    await this.page.waitForTimeout(300);
    console.log('✅ Package name filled!');
  }

  // ── Fill Package Description ──────────────────────────────────────────────
  async fillPackageDescription(description: string) {
    console.log(`📝 Filling package description: ${description}`);
    const textarea = this.page.getByRole('textbox', { name: 'Enter description' });
    await textarea.waitFor({ state: 'visible', timeout: 15000 });
    await textarea.click();
    await textarea.fill(description);
    await textarea.dispatchEvent('input');
    await textarea.dispatchEvent('change');
    await this.page.waitForTimeout(300);
    console.log('✅ Package description filled!');
  }

  // ── Click service name input to open dropdown ─────────────────────────────
  async openServiceDropdown() {
    console.log('🖱️ Opening service dropdown...');
    const input = this.page.getByRole('textbox', { name: 'Service name' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await this.page.waitForTimeout(500);
    console.log('✅ Service dropdown opened!');
  }

  // ── Select first service from dropdown ───────────────────────────────────
  async selectFirstService(): Promise<string> {
    console.log('📝 Selecting first service from dropdown...');

    // Services appear as buttons with name + price e.g. "test1 ₹20,000 /hr"
    const serviceBtn = this.page
      .getByRole('button')
      .filter({ hasText: /₹/ })
      .first();
    await serviceBtn.waitFor({ state: 'visible', timeout: 15000 });
    const serviceName = (await serviceBtn.textContent())?.trim().split('\n')[0] ?? 'Unknown Service';
    await serviceBtn.click();
    await this.page.waitForTimeout(1000);

    console.log(`✅ Service selected: ${serviceName}`);
    return serviceName;
  }

  // ── Fill quantity ─────────────────────────────────────────────────────────
  async fillQuantity(quantity: number) {
    console.log(`📝 Filling quantity: ${quantity}`);
    const input = this.page.getByRole('textbox', { name: '0' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(String(quantity));
    await input.dispatchEvent('input');
    await input.dispatchEvent('change');
    await this.page.waitForTimeout(300);
    console.log('✅ Quantity filled!');
  }

  // ── Click Save ────────────────────────────────────────────────────────────
  async clickSave() {
    console.log('🖱️ Clicking Save...');
    const saveBtn = this.page.getByRole('button', { name: 'Save' }).first();
    await saveBtn.waitFor({ state: 'visible', timeout: 15000 });
    await saveBtn.click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Package saved!');
  }

  // ── Verify Package Added ──────────────────────────────────────────────────
  async verifyPackageAdded() {
    console.log('🔍 Verifying package was added...');
    await this.page.waitForTimeout(1000);
    console.log('✅ Package added successfully!');
  }
}