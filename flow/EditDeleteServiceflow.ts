import { Page } from "@playwright/test";    
import {EditDeleteServicePage} from '../pages/EditDeleteServicePage';

export async function editDeleteServiceFlow(page: Page) {
  const svc = new EditDeleteServicePage(page);

  console.log('════════════════════════════════════════');
  console.log('TEST 6 — Add, Edit & Delete Services');
  console.log('════════════════════════════════════════');
//  await svc.clickServicePricingTab();

 await svc.clickServicesSubTab();
   // ════════════════════════════════════════
 // EDIT — Service 1: change to per_unit + price 10000
 // (icon button nth(3) opens first row edit drawer)
 // ════════════════════════════════════════
 console.log('✏️ Editing Service 1 — set Per Unit + 10000...');
 await svc.clickEditIcon(3);
 await svc.selectPricingModel('per_unit');
 await svc.fillPerUnitPrice(10000);
 await svc.clickSave();
 // ════════════════════════════════════════
 // EDIT — Service 2: change to hours_based + price 10000
 // (icon button nth(5) opens second row edit drawer)
 // ════════════════════════════════════════
 console.log('✏️ Editing Service 2 — set Hours Based + 10000...');
 await svc.clickEditIcon(5);
 await svc.selectPricingModel('hours_based');
 
 await svc.fillHourlyPrice(10000);
 await svc.clickSave();
 // ════════════════════════════════════════
 // EDIT — Service 3: change to per_unit + price 10000
 // (specific row CSS locator from recording)
 // ════════════════════════════════════════
 console.log('✏️ Editing Service 3 — set Per Unit + 10000...');
 await svc.clickEditOnRow(
   'tr:nth-child(3) > td:nth-child(4) > .flex.items-center.justify-center.gap-1 > .flex.items-center.gap-1 > button:nth-child(1)'
 );
 await svc.selectPricingModel('per_unit');
 await svc.fillPerUnitPrice(10000);
 await svc.clickSave();
 console.log('✅ All 3 services edited!');
 // ════════════════════════════════════════
 // DELETE — 3 services
 // Always nth(4) because rows shift up after each delete
 // ════════════════════════════════════════
 console.log('🗑️ Deleting Service 1...');
 await svc.clickDeleteIcon(4);
 await svc.confirmDelete();
 console.log('🗑️ Deleting Service 2...');
 await svc.clickDeleteIcon(4);
 await svc.confirmDelete();
 console.log('🗑️ Deleting Service 3...');
 await svc.clickDeleteIcon(4);
 await svc.confirmDelete();
 console.log('✅ TEST 5 PASSED — 3 added, 3 edited, 3 deleted!');
}
