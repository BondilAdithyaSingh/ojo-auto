import { test, Browser, BrowserContext, Page } from '@playwright/test';
import { loginFlow } from '../flow/Loginflow';
import { addLeadStageFlow } from '../flow/Addleadstageflow';
import { addPackageFlow } from '../flow/Addpackageflow';
import { addServiceFlow } from '../flow/Addserviceflow';
import { addBROTemplateFlow } from '../flow/Addbrotemplateflow';
import { editDeleteServiceFlow } from '../flow/EditDeleteServiceflow';
import { createLeadManualFlow } from '../flow/CreateLeadManualFlow';
import { createLeadFlow } from '../flow/Createleadflow';
import { createLeadManualFlow2 } from '../flow/CreateLeadManualflow2';
import { leadDetailsFlow,leadDetailsSlaFlow,leadInvoiceFlow, leadMessagesFlow } from '../flow/LeadDetailsflow';
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

  test('1 - Login', async () => {
    await loginFlow(page);
  });

  test('2 - Add Lead Stage', async () => {
    await addLeadStageFlow(page);
  });

  // test('3 - Add Service', async () => {
    // await addServiceFlow(page);
  // });

  // test('4 - Add Package', async () => {
    // await addPackageFlow(page);
  // });

  // 
    // test('6 - Edit & Delete Services', async () => {
    // await editDeleteServiceFlow(page);
  // });
// 
  // test('5 - Add BRO Template', async () => {
    // await addBROTemplateFlow(page);
  // });

// 
  // test('5 - Create Lead with OJO', async () => {
  // await createLeadFlow(page);

// });
// 
    // test('6 - Create Lead Manually', async () => {
    // 
    // await createLeadManualFlow(page);
  // });
// 
    test('7 - Create Lead Manually (Existing Contact) ', async () => {

      // 
      await createLeadManualFlow2(page);

});

    test('8 - Lead Details Flow: Add Services + Edit', async () => {
      await leadDetailsFlow(page);
    });

    test('9  - Lead SLA', async () => {
  await leadDetailsSlaFlow(page);
});

 test('10 - Invoice', async () => {
  await leadInvoiceFlow(page);
});
test('11 - Lead Messages', async () => {
  await leadMessagesFlow(page);
});
});
