import { Page } from '@playwright/test';
import { SignupPage } from '../pages/Signuppage';

export async function signupFlow(page: Page) {
  const signupPage = new SignupPage(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — Sign Up');
  console.log('════════════════════════════════════════');

  // ── Step 1: Go to signup ──────────────────────────────────────────────────
  await signupPage.gotoSignup();

  // ── Step 2: Fill personal details ────────────────────────────────────────
  await signupPage.fillPersonalDetails(
    'Adithya',
    'bondil.adithyasingh+dojo2@gmail.com'
  );

  // ── Step 3: Continue ──────────────────────────────────────────────────────
  await signupPage.clickContinue();

  // ── Step 4: Manual OTP verification ──────────────────────────────────────
  await signupPage.waitForOTPVerification();

  // ── Step 5: Wait 1.5 mins for superadmin approval ───────────────────────────
  await signupPage.waitForSuperadminApproval();



  // ── Step 6: Get Started ───────────────────────────────────────────────────
  await signupPage.clickGetStarted();

  // ── Step 7: Fill company details ─────────────────────────────────────────
  await signupPage.fillCompanyDetails('Samsung', '50');

  // ── Step 8: Continue ──────────────────────────────────────────────────────
  await signupPage.clickContinue();

  // ── Step 9: Add services ──────────────────────────────────────────────────
  await signupPage.addServices(['Marketing', 'Sales', 'Call Services']);

  // ── Step 10: Continue ─────────────────────────────────────────────────────
  await signupPage.clickContinue();

  // ── Step 11: Launch org ───────────────────────────────────────────────────
  await signupPage.launchOrg('Samsung');

  console.log('✅ FLOW PASSED — Signup completed!');
}