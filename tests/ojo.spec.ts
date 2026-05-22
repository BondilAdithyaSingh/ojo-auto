import { test, Browser, BrowserContext, Page } from '@playwright/test';

import { loginFlow } from '../flow/Loginflow';
import { signupFlow } from '../flow/Signupflow';

import { addLeadStageFlow } from '../flow/Addleadstageflow';
import { addServiceFlow } from '../flow/Addserviceflow';
import { addPackageFlow } from '../flow/Addpackageflow';
import { addBROTemplateFlow } from '../flow/Addbrotemplateflow';

import { editDeleteServiceFlow } from '../flow/EditDeleteServiceflow';

import { createLeadFlow } from '../flow/CreateLeadflow';
// import { createLeadManualFlow } from '../flow/CreateLeadManualFlow';
import { createLeadManualFlow2 } from '../flow/CreateLeadManualflow2';

import { leadFullFlow } from '../flow/LeadDetailsflow';

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.describe.serial('OJO App Tests', () => {

  test.setTimeout(600000);

  // ---------------------------------------------------------------------------
  // Setup
  // ---------------------------------------------------------------------------

  test.beforeAll(async ({ browser: b }) => {
    browser = b;

    context = await browser.newContext();

    page = await context.newPage();

    console.log('🌐 Shared browser opened — will stay open for all tests!');
  });

  test.afterAll(async () => {
    await context.close();

    console.log('🔒 Shared browser closed!');
  });

  // ---------------------------------------------------------------------------
  // Authentication
  // ---------------------------------------------------------------------------

  test('1 - Login', async () => {
    await loginFlow(page);
  });

  // test('1 - Signup', async () => {
  //   await signupFlow(page);
  // });

  // ---------------------------------------------------------------------------
  // Lead Stage / Services / Packages
  // ---------------------------------------------------------------------------

  test('2 - Add Lead Stage', async () => {
    await addLeadStageFlow(page);
  });

  test('3 - Add Service', async () => {
    await addServiceFlow(page);
  });

  test('4 - Add Package', async () => {
    await addPackageFlow(page);
  });

  // ---------------------------------------------------------------------------
  // Service Management
  // ---------------------------------------------------------------------------

  // test('5 - Edit & Delete Services', async () => {
  //   await editDeleteServiceFlow(page);
  // });

  // ---------------------------------------------------------------------------
  // BRO Template
  // ---------------------------------------------------------------------------

  // test('6 - Add BRO Template', async () => {
  //   await addBROTemplateFlow(page);
  // });

  // ---------------------------------------------------------------------------
  // Lead Creation
  // ---------------------------------------------------------------------------
// 
  // test('7 - Create Lead with OJO', async () => {
    // await createLeadFlow(page);
  // });
// 
  // test('8 - Create Lead Manually', async () => {
  //   await createLeadManualFlow(page);
  // });

  test('9 - Create Lead Manually (Existing Contact)', async () => {
    await createLeadManualFlow2(page);
  });

  // ---------------------------------------------------------------------------
  // Complete Lead Flow
  // ---------------------------------------------------------------------------

  test('10 - Full Lead Flow', async () => {
    await leadFullFlow(page);
  });

});