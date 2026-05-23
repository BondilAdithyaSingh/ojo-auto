import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // ── Go to login page ──────────────────────────────────────────────────────
  async goto() {
    console.log('🌐 Navigating to login page...');
    await this.page.goto('https://staging.ojo.io/login');
    await this.page.waitForTimeout(1000);
    console.log('✅ Login page loaded!');
  }

  // ── Fill email ────────────────────────────────────────────────────────────
  async fillEmail(email: string) {
    console.log(`📝 Filling email: ${email}`);
    const input = this.page.getByRole('textbox', { name: 'Work email' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(email);
    await this.page.waitForTimeout(300);
    console.log('✅ Email filled!');
  }

  // ── Click Continue ────────────────────────────────────────────────────────
  async clickContinue() {
    console.log('🖱️ Clicking Continue...');
    const btn = this.page.getByRole('button', { name: 'Continue' });
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Continue clicked!');
  }

  // ── Click OTP field (auto-filled from clipboard) ──────────────────────────
  async clickOTP() {
    console.log('📝 Clicking OTP field...');
    const input = this.page.getByRole('textbox', { name: '------' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click({ modifiers: ['ControlOrMeta'] });
    await this.page.waitForTimeout(500);
    console.log('✅ OTP field clicked!');
  }

  // ── Click Verify ──────────────────────────────────────────────────────────
  async clickVerify() {
    console.log('🖱️ Clicking Verify...');
    const btn = this.page.getByRole('button', { name: 'Verify' });
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Verify clicked!');
  }

  // ── Select Workspace ─────────────────────────────────────────────────────
   async selectWorkspace(workspaceName: string) {
    console.log(`🖱️ Selecting workspace: ${workspaceName}...`);

    const workspaceCard = this.page.locator('div').filter({
      has: this.page.getByText(workspaceName, { exact: true })
    });

    await workspaceCard.first().click();

    console.log('✅ Workspace selected!');
  }
}