import { Page } from '@playwright/test';

export class EditDeleteServicePage {
    constructor(private page: Page) {}

async clickServicesSubTab() {
  console.log('🖱️ Clicking Services sub-tab...');
  const servicesTab = this.page.getByRole('button', { name: 'Services', exact: true });
  await servicesTab.waitFor({ state: 'visible', timeout: 15000 });
  await servicesTab.click();
  await this.page.waitForTimeout(500);
  console.log('✅ Services sub-tab clicked!');
}

  async clickEditIcon(iconIndex: number) {
   console.log(`🖱️ Clicking edit icon (nth ${iconIndex})...`);
   const btn = this.page.getByRole('button').filter({ hasText: /^$/ }).nth(iconIndex);
   await btn.waitFor({ state: 'visible', timeout: 15000 });
   await btn.click();
   await this.page.getByRole('combobox').waitFor({ state: 'visible', timeout: 15000 });
   console.log('✅ Edit drawer opened!');
 }
  // ── Open edit drawer by row CSS locator ──────────────────────────────────
  async clickEditOnRow(rowCss: string) {
    console.log(`🖱️ Clicking edit on row...`);
    await this.page.locator(rowCss).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator(rowCss).click();
    await this.page.getByRole('combobox').waitFor({ state: 'visible', timeout: 15000 });
    console.log('✅ Edit drawer opened!');
  }

   async selectPricingModel(model: 'hours_based' | 'per_unit' | 'retainer') {
   console.log(`📝 Selecting pricing model: ${model}`);
   await this.page.getByRole('combobox').waitFor({ state: 'visible', timeout: 15000 });
   await this.page.getByRole('combobox').selectOption(model);
   await this.page.waitForTimeout(300);
   console.log(`✅ Pricing model set to: ${model}`);
 }

  async fillHourlyPrice(price: number) {
   console.log(`📝 Filling hourly price: ${price}`);
   const input = this.page.getByPlaceholder('1500');
   await input.waitFor({ state: 'visible', timeout: 15000 })
   await input.click();
   await input.fill(String(price));
   console.log('✅ Hourly price filled!');
 }
 async fillPerUnitPrice(price: number) {
   console.log(`📝 Filling per unit price: ${price}`);
   const input = this.page.getByPlaceholder('2500');
   await input.waitFor({ state: 'visible', timeout: 15000 })
   await input.click();
   await input.fill(String(price));
   console.log('✅ Per unit price filled!');
 }
 async fillRetainerPrice(price: number) {
   console.log(`📝 Filling retainer price: ${price}`);
   const input = this.page.getByPlaceholder('75000');
   await input.waitFor({ state: 'visible', timeout: 15000 })
   await input.click();
   await input.fill(String(price));
   console.log('✅ Retainer price filled!');
 }

 async clickSave() {
  console.log('🖱️ Clicking Save...');
  await this.page.getByRole('button', { name: 'Save' }).nth(1).waitFor({ state: 'visible', timeout: 15000 });
  await this.page.getByRole('button', { name: 'Save' }).nth(1).click();
  await this.page.waitForTimeout(2000);
  console.log('✅ Saved!');
}


  // ── Delete by icon button index ───────────────────────────────────────────
  async clickDeleteIcon(iconIndex: number) {
    console.log(`🗑️ Clicking delete icon (nth ${iconIndex})...`);
    const btn = this.page.getByRole('button').filter({ hasText: /^$/ }).nth(iconIndex);
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    await this.page.waitForTimeout(300);
    console.log('✅ Delete icon clicked!');
  }


  // ── Confirm delete ────────────────────────────────────────────────────────
  async confirmDelete() {
    console.log('🗑️ Confirming delete...');
    await this.page.getByRole('button', { name: 'Delete' }).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await this.page.waitForTimeout(1500);
    console.log('✅ Service deleted!');
  }
}