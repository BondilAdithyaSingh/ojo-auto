import { test, Browser, BrowserContext, Page } from '@playwright/test';
import { loginFlow }        from '../flow/Loginflow';
import { addLeadStageFlow } from '../flow/Addleadstageflow';
import { addPackageFlow }   from '../flow/Addpackageflow';
import { addServiceFlow } from '../flow/Addserviceflow';
import { addBROTemplateFlow } from '../flow/Addbrotemplateflow';

let page: Page;
let context: BrowserContext;
let browser: Browser;

test.describe.serial('OJO App Tests', () => {

  test.setTimeout(600000);

  test.beforeAll(async ({ browser: b }) => {
    browser = b;
    context = await b.newContext();
    page = await context.newPage();
    console.log('🌐 Shared browser opened — will stay open for all tests!');
  });

  test.afterAll(async () => {
    await context.close();
    console.log('🔒 Shared browser closed!');
  });

  // ── TEST 1 — LOGIN ──────────────────────────────────────────────────────────
  test('1 - Login', async () => {
    await loginFlow(page);
  });

  // ── TEST 2 — ADD LEAD STAGE ─────────────────────────────────────────────────
  test('2 - Add Lead Stage', async () => {
    await addLeadStageFlow(page);
  });

  // ── TEST 3 — ADD PACKAGE ────────────────────────────────────────────────────

  test('3 - Add Service', async () => {
  await addServiceFlow(page);
});
// ── TEST 4 — ADD PACKAGE ──────────────────────────────────────────────────── 
test('4 - Add Package', async () => {
  await addPackageFlow(page);
});
//-─ TEST 5 — ADD BRO TEMPLATE ───────────────────────────────────────────────
test('5 - Add BRO Template', async () => {
  await addBROTemplateFlow(page);
});

});
