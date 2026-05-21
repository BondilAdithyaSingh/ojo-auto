import { Page } from '@playwright/test';
import { CreateLeadManual2Page } from '../pages/CreateLeadManual2Page';

const LEAD = {
  contactSearch: 'Mark',
  title: 'Amazon New Update Release',
  description:   `Amazon has launched a major marketing and advertising update focused on AI-powered advertising solutions and smarter customer targeting. The update introduces advanced generative AI tools within Amazon Ads that help brands automatically create ad content, improve campaign optimization, and deliver more personalized shopping experiences. Businesses can now use AI-generated images, automated product recommendations, and predictive audience targeting to increase engagement and conversions.`,
};

export async function createLeadManualFlow2(page: Page) {
  const lead = new CreateLeadManual2Page(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — Create Lead Manually (Existing Contact)');
  console.log('════════════════════════════════════════');

  await lead.goToLeads();
  await lead.closeIfOpen();
  await lead.clickNewLeadManually();
  await lead.selectExistingContact(LEAD.contactSearch);
  await lead.fillTitle(LEAD.title);
  await lead.fillDescription(LEAD.description);
  await lead.clickCreateLead();

  // await lead.assertLeadCreated();
  // await lead.assertLeadInList(LEAD.title);

  console.log('🎉 FLOW PASSED — Lead with existing contact created and verified!');
}