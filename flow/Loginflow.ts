import { Page } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';

export async function loginFlow(page: Page) {
  const loginPage = new LoginPage(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — Login');
  console.log('════════════════════════════════════════');

  // ── Step 1: Go to login page ───────────────────────────────────────────────
  await loginPage.goto();

  // ── Step 2: Fill email ─────────────────────────────────────────────────────
  await loginPage.fillEmail('bondil.adithyasingh@gmail.com');

  // ── Step 3: Click Continue ─────────────────────────────────────────────────
  await loginPage.clickContinue();

  // ── Step 4: Click OTP field (paste from clipboard) ────────────────────────
  await loginPage.clickOTP();

  // ── Step 5: Click Verify ───────────────────────────────────────────────────
  await loginPage.clickVerify();

  // ── Step 6: Select Workspace ───────────────────────────────────────────────
  await loginPage.selectWorkspace();

  console.log('✅ FLOW PASSED — Logged in successfully!');
}