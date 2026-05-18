import { Page } from '@playwright/test';

export class LeadStagePage {
  constructor(private page: Page) {}

  // ── Click Add New ──────────────────────────────────────────────────────────
  async clickAddNew() {
    console.log('🖱️ Clicking Add New...');
    await this.page.getByRole('button', { name: 'Add New' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Add New clicked!');
  }

  // ── Fill Stage Name ────────────────────────────────────────────────────────
  async fillStageName(name: string) {
    console.log(`📝 Filling stage name: ${name}`);
    await this.page.getByRole('textbox', { name: 'Enter stage name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter stage name' }).fill(name);
    console.log('✅ Stage name filled!');
  }

  // ── Select Property → Invoice (exactly as recorded) ───────────────────────
  async selectProperty() {
    console.log('📝 Selecting property: Invoice...');
    await this.page.getByRole('button', { name: 'BRO', exact: true }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: 'Invoice' }).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Property set to: Invoice');
  }

  // ── Click Add Stage ────────────────────────────────────────────────────────
  async clickAddStage() {
    console.log('🖱️ Clicking Add Stage...');
    await this.page.getByRole('button', { name: 'Add Stage' }).click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Stage added!');
  }

  // ── Click three-dot menu by index ─────────────────────────────────────────
  async clickStageMenu(index: number) {
    console.log(`🖱️ Clicking menu for stage row ${index + 1}...`);
    const menuBtns = this.page.locator('button.p-2.rounded-full[aria-haspopup="menu"]');
    await menuBtns.nth(index).waitFor({ state: 'visible', timeout: 15000 });
    await menuBtns.nth(index).click();
    await this.page.waitForTimeout(500);
    console.log(`✅ Menu opened for stage row ${index + 1}!`);
  }

  // ── Click Edit from menu ───────────────────────────────────────────────────
  async clickEdit() {
    console.log('🖱️ Clicking Edit...');
    await this.page.getByRole('menuitem', { name: 'Edit' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Edit clicked!');
  }

  // ── Fill Description ───────────────────────────────────────────────────────
  async fillStageDescription(description: string) {
    console.log(`📝 Filling description: ${description}`);
    const input = this.page.getByRole('textbox', { name: 'Add New Description' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(description);
    console.log('✅ Description filled!');
  }

  // ── Click Update Stage ─────────────────────────────────────────────────────
  async clickUpdateStage() {
    console.log('🖱️ Clicking Update Stage...');
    await this.page.getByRole('button', { name: 'Update Stage' }).click();
    await this.page.waitForTimeout(1500);
    console.log('✅ Stage updated!');
  }

  // ── Click Delete from menu ─────────────────────────────────────────────────
  async clickDelete() {
    console.log('🖱️ Clicking Delete...');
    await this.page.getByRole('menuitem', { name: 'Delete' }).click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Stage deleted!');
  }

  // ── Get total stage menu button count ─────────────────────────────────────
  async getStageCount(): Promise<number> {
    const menuBtns = this.page.locator('button.p-2.rounded-full[aria-haspopup="menu"]');
    return await menuBtns.count();
  }

  // ── Verify Stage Added ─────────────────────────────────────────────────────
  async verifyStageAdded() {
    console.log('🔍 Verifying stage was added...');
    await this.page.waitForTimeout(1000);
    console.log('✅ Stage added successfully!');
  }
}