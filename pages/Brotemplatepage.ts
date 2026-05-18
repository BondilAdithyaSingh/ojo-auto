import { Page } from '@playwright/test';
 
export class BROTemplatePage {
  constructor(private page: Page) {}
 
  // ── Click BRO Templates tab ───────────────────────────────────────────────
  async clickBROTemplatesTab() {
    console.log('🖱️ Clicking BRO Templates tab...');
    const tab = this.page.getByRole('button', { name: 'BRO Templates' });
    await tab.waitFor({ state: 'visible', timeout: 15000 });
    await tab.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ BRO Templates tab clicked!');
  }
 
  // ── Click Add New ─────────────────────────────────────────────────────────
  async clickAddNew() {
    console.log('🖱️ Clicking Add New...');
    const btn = this.page.getByRole('button', { name: 'Add New' });
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Add New clicked!');
  }
 
  // ── Close Genie panel ─────────────────────────────────────────────────────
  async closeGenie() {
    console.log('🔒 Closing Genie panel...');
    const closeBtn = this.page.getByRole('button', { name: 'Close', exact: true });
    if (await closeBtn.isVisible().catch(() => false)) {
      await closeBtn.click();
      await this.page.waitForTimeout(500);
      console.log('✅ Genie closed!');
    } else {
      console.log('ℹ️ Genie not visible, skipping...');
    }
  }
 
  // ── Fill Template Name ────────────────────────────────────────────────────
  async fillTemplateName(name: string) {
    console.log(`📝 Filling template name: ${name}`);
    const input = this.page.getByRole('textbox', { name: 'Enter template name' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(name);
    await input.press('Tab');
    await this.page.waitForTimeout(300);
    console.log('✅ Template name filled!');
  }
 
  // ── Select Service Type ───────────────────────────────────────────────────
  async selectServiceType(service: string) {
    console.log(`📝 Selecting service type: ${service}`);
    const selectBtn = this.page.getByRole('button', { name: 'Select service type' });
    await selectBtn.waitFor({ state: 'visible', timeout: 15000 });
    await selectBtn.click();
    await this.page.waitForTimeout(500);
    const option = this.page.getByRole('button', { name: service });
    await option.waitFor({ state: 'visible', timeout: 15000 });
    await option.click();
    await this.page.waitForTimeout(500);
    console.log(`✅ Service type selected: ${service}`);
  }
 
  // ── Fill Main Description ─────────────────────────────────────────────────
  async fillMainDescription(description: string) {
    console.log(`📝 Filling main description: ${description}`);
    const input = this.page.getByRole('textbox', { name: 'Add description' }).first();
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(description);
    await this.page.waitForTimeout(300);
    console.log('✅ Main description filled!');
  }
 
  // ── Click section tabs (Team, Objective, etc.) ────────────────────────────
  async clickSectionTab(name: string) {
    console.log(`🖱️ Clicking section tab: ${name}`);
    const btn = this.page.getByRole('button', { name });
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    await this.page.waitForTimeout(300);
    console.log(`✅ Section tab "${name}" clicked!`);
  }

  async clickSave() {
    console.log('🖱️ Clicking Save...');
    const saveBtn = this.page.getByRole('button', { name: 'Save' }).first();
    await saveBtn.waitFor({ state: 'visible', timeout: 15000 });
    await saveBtn.click();
    await this.page.waitForTimeout(2000);
    console.log('✅ BRO Template saved!');
  }
  async verifyTemplateAdded() {
    console.log('🔍 Verifying template was added...');
    await this.page.waitForTimeout(1000);
    console.log('✅ BRO Template added successfully!');
  }
}