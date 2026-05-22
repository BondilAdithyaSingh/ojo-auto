import { Page } from '@playwright/test';

export class SignupPage {
  constructor(private page: Page) {}

  // ── Navigate to signup ────────────────────────────────────────────────────
  async gotoSignup() {
    console.log('🌐 Opening OJO login page...');
    await this.page.goto('https://app.ojo.io/login');
    await this.page.getByRole('link', { name: 'Sign Up here' }).click();
    console.log('✅ Signup page opened!');
  }

  // ── Fill personal details ─────────────────────────────────────────────────
  async fillPersonalDetails(fullName: string, email: string) {
    console.log(`📝 Filling personal details: ${fullName} | ${email}`);

    const nameInput = this.page.getByRole('textbox', { name: 'Full Name' });
    await nameInput.waitFor({ state: 'visible', timeout: 10000 });
    await nameInput.fill(fullName);

    const emailInput = this.page.getByRole('textbox', { name: 'Work email' });
    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await emailInput.fill(email);

    // Accept terms
    const checkbox = this.page.getByRole('checkbox', { name: /I agree to OJO/i });
    await checkbox.waitFor({ state: 'visible', timeout: 10000 });
    await checkbox.check();

    console.log('✅ Personal details filled!');
  }

  // ── Click Continue ────────────────────────────────────────────────────────
  async clickContinue() {
    console.log('🖱️ Clicking Continue...');
    const btn = this.page.getByRole('button', { name: 'Continue' });
    await btn.waitFor({ state: 'visible', timeout: 10000 });
    await btn.click();
    console.log('✅ Continue clicked!');
  }

  // ── Wait for OTP verification (manual) ───────────────────────────────────
  async waitForOTPVerification() {
    console.log('');
    console.log('==============================================================');
    console.log('📋 ACTION REQUIRED:');
    console.log('   1. Check your email for the OTP');
    console.log('   2. Enter the OTP on the page');
    console.log('   3. Click Verify');
    console.log('==============================================================');
    console.log('');

    const verifyBtn = this.page.getByRole('button', { name: 'Verify' });
    await verifyBtn.waitFor({ state: 'visible', timeout: 10000 });
    await verifyBtn.click();
    console.log('✅ Verify clicked!');
  }

  // ── Wait for superadmin approval (2 mins) ────────────────────────────────
  async waitForSuperadminApproval() {
    console.log('⏳ Waiting 2 minutes for superadmin approval...');
    await this.page.waitForTimeout(90000);

    // Click Check Again after waiting
    const checkAgainBtn = this.page.getByRole('button', { name: 'Check Again' });
    await checkAgainBtn.waitFor({ state: 'visible', timeout: 10000 });
    await checkAgainBtn.click();
    console.log('✅ Check Again clicked!');
  }
   

  // ── Click Get Started ─────────────────────────────────────────────────────
  async clickGetStarted() {
    console.log('🖱️ Clicking Get Started...');
    const btn = this.page.getByRole('button', { name: 'Get Started' });
    await btn.waitFor({ state: 'visible', timeout: 30000 });
    await btn.click();
    console.log('✅ Get Started clicked!');
  }

  // ── Fill company details ──────────────────────────────────────────────────
  async fillCompanyDetails(companyName: string, teamSize: string) {
    console.log(`📝 Filling company details: ${companyName} | ${teamSize} people`);

    const companyInput = this.page.getByRole('textbox', { name: 'Company Name' });
    await companyInput.waitFor({ state: 'visible', timeout: 10000 });
    await companyInput.fill(companyName);

    // Click "We're a Team" button
    const teamBtn = this.page.getByRole('button', { name: "We're a Team" });
    await teamBtn.waitFor({ state: 'visible', timeout: 10000 });
    await teamBtn.click();

    // Fill team size
    const sizeInput = this.page.getByPlaceholder('No. of people');
    await sizeInput.waitFor({ state: 'visible', timeout: 10000 });
    await sizeInput.fill(teamSize);

    console.log('✅ Company details filled!');
  }

  // ── Add services ──────────────────────────────────────────────────────────
  async addServices(services: string[]) {
    console.log(`📝 Adding ${services.length} services...`);

    for (const service of services) {
      const input = this.page.getByRole('textbox', { name: 'Add a service...' });
      await input.waitFor({ state: 'visible', timeout: 10000 });
      await input.fill(service);

      const addBtn = this.page.getByRole('button', { name: 'Add' });
      await addBtn.waitFor({ state: 'visible', timeout: 10000 });
      await addBtn.click();
      await this.page.waitForTimeout(300);

      console.log(`✅ Service added: ${service}`);
    }
  }

  // ── Launch org ────────────────────────────────────────────────────────────
  async launchOrg(orgName: string) {
    console.log(`🚀 Launching ${orgName}...`);
    const launchBtn = this.page.getByRole('button', { name: `Launch ${orgName}` });
    await launchBtn.waitFor({ state: 'visible', timeout: 15000 });
    await launchBtn.click();
    console.log(`✅ ${orgName} launched!`);
    await this.page.waitForLoadState('networkidle');
  }
}