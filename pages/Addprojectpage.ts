import { Page } from '@playwright/test';

export class AddProjectPage {
  constructor(private page: Page) {}

  // ── Navigate to Projects → All Projects ───────────────────────────────────
  async goToAllProjects() {
    console.log('🖱️ Clicking Projects...');
    await this.page.getByRole('link', { name: 'Projects' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('link', { name: 'Projects' }).click();
    await this.page.waitForTimeout(1000);

    console.log('🖱️ Closing any open panel...');
    const closeBtn = this.page.getByRole('button', { name: 'Close' });
    const isVisible = await closeBtn.isVisible().catch(() => false);
    if (isVisible) {
      await closeBtn.click();
      await this.page.waitForTimeout(500);
    }

    console.log('🖱️ Clicking All Projects...');
    await this.page.getByRole('link', { name: 'All Projects' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('link', { name: 'All Projects' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ On All Projects page!');
  }

  // ── Open New Project → Create Manually ────────────────────────────────────
  async clickNewProjectManually() {
    console.log('🖱️ Clicking New Project...');
    await this.page.getByRole('button', { name: 'New Project' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'New Project' }).click();
    await this.page.waitForTimeout(500);

    console.log('🖱️ Clicking Create Manually...');
    await this.page.getByRole('menuitem', { name: 'Create Manually' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('menuitem', { name: 'Create Manually' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Create Manually form opened!');
  }

  // ── Fill Project Name ──────────────────────────────────────────────────────
  async fillProjectName(name: string) {
    console.log(`📝 Filling project name: ${name}`);
    const input = this.page.getByRole('textbox', { name: 'Enter project name' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(name);
    await this.page.waitForTimeout(300);
    console.log('✅ Project name filled!');
  }

  // ── Fill Project Description ───────────────────────────────────────────────
  async fillProjectDescription(description: string) {
    console.log('📝 Filling project description...');
    const input = this.page.getByRole('textbox', { name: 'Enter project description' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(description);
    await this.page.waitForTimeout(300);
    console.log('✅ Project description filled!');
  }

  // ── Add Member (Client) ────────────────────────────────────────────────────
  async addClient(clientOptionValue: string) {
    console.log('🖱️ Opening member dropdown (client)...');
    const memberBtn = this.page.locator('form').getByRole('button').filter({ hasText: /^$/ });
    await memberBtn.waitFor({ state: 'visible', timeout: 15000 });
    await memberBtn.click();
    await this.page.waitForTimeout(500);

    console.log(`🖱️ Selecting client: ${clientOptionValue}`);
    await this.page.getByRole('combobox').nth(2).selectOption(clientOptionValue);
    await this.page.waitForTimeout(300);
    console.log('✅ Client selected!');
  }

  // ── Set Member Role ────────────────────────────────────────────────────────
  async setMemberRole(role: string) {
    console.log(`🖱️ Setting role: ${role}`);
    await this.page.getByRole('combobox').nth(3).selectOption(role);
    await this.page.waitForTimeout(300);
    console.log('✅ Role set!');
  }

  // ── Add Second Member (Team) ───────────────────────────────────────────────
  async addTeamMember(memberOptionValue: string) {
    console.log('🖱️ Clicking Add Member button...');
    await this.page.getByRole('button').nth(2).click();
    await this.page.waitForTimeout(500);

    console.log(`🖱️ Selecting team member: ${memberOptionValue}`);
    await this.page.getByRole('combobox').nth(4).selectOption(memberOptionValue);
    await this.page.waitForTimeout(300);
    console.log('✅ Team member selected!');
  }

  // ── Set Start Date to Today ────────────────────────────────────────────────
  async setStartDateToday() {
    console.log('🖱️ Selecting start date (Today)...');
    await this.page.locator('div').filter({ hasText: /^Select start date$/ }).nth(1).click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: 'Today' }).click();
    await this.page.waitForTimeout(300);
    console.log('✅ Start date set to today!');
  }

  // ── Set End Date ───────────────────────────────────────────────────────────
  async setEndDate(day: string) {
    console.log(`🖱️ Selecting end date: ${day}...`);
    await this.page.getByText('Select end date').click();
    await this.page.waitForTimeout(500);

    // Navigate to next month
    await this.page.locator('.flex.items-center.justify-between > button:nth-child(3)').click();
    await this.page.waitForTimeout(300);

    await this.page.getByRole('button', { name: day }).click();
    await this.page.waitForTimeout(300);
    console.log(`✅ End date set to ${day}!`);
  }

  // ── Fill Completion Percentage ─────────────────────────────────────────────
  async fillCompletion(percent: string) {
    console.log(`📝 Filling completion: ${percent}%`);
    const input = this.page.getByPlaceholder('0', { exact: true });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(percent);
    await this.page.waitForTimeout(300);
    console.log('✅ Completion filled!');
  }

  // ── Fill Budget ────────────────────────────────────────────────────────────
  async fillBudget(amount: string) {
    console.log(`📝 Filling budget: ₹${amount}`);
    const input = this.page.getByPlaceholder('Enter amount in rupees (e.g');
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(amount);
    await this.page.waitForTimeout(300);
    console.log('✅ Budget filled!');
  }

  // ── Click Create Project ───────────────────────────────────────────────────
  async clickCreateProject() {
    console.log('🖱️ Clicking Create Project...');
    const btn = this.page.getByRole('button', { name: 'Create Project' });
    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Create Project clicked!');
  }

  // ── Open Created Project ───────────────────────────────────────────────────
  async openProject(projectName: string) {
    console.log(`🖱️ Opening project: ${projectName}`);
    await this.page.getByTitle(projectName).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByTitle(projectName).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Project opened!');
  }

  // ── Click Milestones & Tasks tab ──────────────────────────────────────────
  async clickMilestonesAndTasks() {
    console.log('🖱️ Clicking Milestones & Tasks...');
    await this.page.getByRole('button', { name: 'Milestones & Tasks' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Milestones & Tasks' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Milestones & Tasks tab opened!');
  }

  // ── Click Overview tab ────────────────────────────────────────────────────
  async clickOverview() {
    console.log('🖱️ Clicking Overview...');
    await this.page.getByRole('button', { name: 'Overview' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Overview' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Overview tab opened!');
  }

  // ══════════════════════════════════════════════════════════════════════════
  // Team & Timesheet
  // ══════════════════════════════════════════════════════════════════════════

  // ── Click Team & Timesheet tab ────────────────────────────────────────────
  async clickTeamAndTimesheet() {
    console.log('🖱️ Clicking Team & Timesheet...');
    await this.page.getByRole('button', { name: 'Team & Timesheet' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Team & Timesheet' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Team & Timesheet tab opened!');
  }

  // ── Add a team member from Team tab ───────────────────────────────────────
  async addTeamMemberFromTab(memberName: string, role: string) {
    console.log(`➕ Adding team member: ${memberName} as ${role}...`);

    await this.page.getByRole('button', { name: 'Add a Member' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Add a Member' }).click();
    await this.page.waitForTimeout(500);

    await this.page.getByRole('button', { name: 'Select a user' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Select a user' }).click();
    await this.page.waitForTimeout(500);

    await this.page.getByRole('button', { name: memberName }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: memberName }).click();
    await this.page.waitForTimeout(500);

    // Switch role from default 'Member' to the desired role
    await this.page.getByRole('button', { name: 'Member' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Member' }).click();
    await this.page.waitForTimeout(300);
    await this.page.getByRole('button', { name: role }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: role }).click();
    await this.page.waitForTimeout(300);

    await this.page.getByRole('button', { name: 'Save' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(1000);
    console.log(`✅ Team member ${memberName} added as ${role}!`);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // Milestones
  // ══════════════════════════════════════════════════════════════════════════

  // ── Add a milestone ───────────────────────────────────────────────────────
  async addMilestone(name: string, description: string, dueDate: string) {
    console.log(`➕ Adding milestone: ${name}...`);

    await this.page.getByRole('button', { name: 'Add milestone' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Add milestone' }).click();
    await this.page.waitForTimeout(500);

    await this.page.getByRole('textbox', { name: 'Enter milestone name' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('textbox', { name: 'Enter milestone name' }).click();
    await this.page.getByRole('textbox', { name: 'Enter milestone name' }).fill(name);
    await this.page.waitForTimeout(300);

    await this.page.getByRole('textbox', { name: 'Enter milestone description' }).click();
    await this.page.getByRole('textbox', { name: 'Enter milestone description' }).fill(description);
    await this.page.waitForTimeout(300);

    await this.page.locator('input[type="date"]').fill(dueDate);
    await this.page.waitForTimeout(300);

    await this.page.getByRole('button', { name: 'Create Milestone' }).click();
    await this.page.waitForTimeout(1000);
    console.log(`✅ Milestone "${name}" created!`);
  }

  // ── Open milestone menu (by position, 0-indexed) ──────────────────────────
  async openMilestoneMenu(index: number) {
    console.log(`🖱️ Opening milestone menu at index ${index}...`);
    const menuBtns = this.page.locator('.p-1\\.5.rounded-lg.transition-colors');
    await menuBtns.nth(index).waitFor({ state: 'visible', timeout: 15000 });
    await menuBtns.nth(index).click();
    await this.page.waitForTimeout(500);
    console.log('✅ Milestone menu opened!');
  }

  // ── Assign milestone to a user ────────────────────────────────────────────
  async assignMilestone(userName: string) {
    console.log(`🖱️ Assigning milestone to: ${userName}...`);
    await this.page.getByRole('button', { name: 'Assign milestone' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Assign milestone' }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: userName }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: userName }).click();
    await this.page.waitForTimeout(500);
    console.log(`✅ Milestone assigned to ${userName}!`);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // Tasks
  // ══════════════════════════════════════════════════════════════════════════

  // ── Add a task to a milestone ─────────────────────────────────────────────
  async addTask(milestoneName: string, title: string, description: string, hours: string) {
    console.log(`➕ Adding task "${title}" to milestone "${milestoneName}"...`);

    await this.page.getByRole('button', { name: `Add task to ${milestoneName}` }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: `Add task to ${milestoneName}` }).click();
    await this.page.waitForTimeout(500);

    await this.page.getByRole('textbox', { name: 'Enter task title' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('textbox', { name: 'Enter task title' }).click();
    await this.page.getByRole('textbox', { name: 'Enter task title' }).fill(title);
    await this.page.waitForTimeout(300);

    await this.page.getByRole('textbox', { name: 'Enter task description' }).click();
    await this.page.getByRole('textbox', { name: 'Enter task description' }).fill(description);
    await this.page.waitForTimeout(300);

    await this.page.getByRole('textbox', { name: '0' }).click();
    await this.page.getByRole('textbox', { name: '0' }).fill(hours);
    await this.page.waitForTimeout(300);

    await this.page.getByRole('button', { name: 'Create Task' }).click();
    await this.page.waitForTimeout(1000);
    console.log(`✅ Task "${title}" created!`);
  }

  // ── Duplicate a task (by milestone menu index) ────────────────────────────
  async duplicateTask(menuIndex: number) {
    console.log(`🖱️ Duplicating task at menu index ${menuIndex}...`);
    await this.openMilestoneMenu(menuIndex);
    await this.page.getByRole('button', { name: 'Duplicate' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Duplicate' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Task duplicated!');
  }

  // ── Edit the duplicated milestone (last one by position) ──────────────────
  async editLastMilestone(newDescription: string) {
    console.log('🖱️ Editing last milestone...');

    // The duplicated milestone is always the last one — click its menu button
    const menuBtns = this.page.locator('.p-1\\.5.rounded-lg.transition-colors');
    const count = await menuBtns.count();
    await menuBtns.nth(count - 1).click();
    await this.page.waitForTimeout(500);

    await this.page.getByRole('button', { name: 'Edit', exact: true }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Edit', exact: true }).click();
    await this.page.waitForTimeout(500);

    await this.page.getByRole('textbox', { name: 'Enter milestone description' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('textbox', { name: 'Enter milestone description' }).click();
    await this.page.getByRole('textbox', { name: 'Enter milestone description' }).fill(newDescription);
    await this.page.waitForTimeout(300);

    await this.page.getByRole('button', { name: 'Update Milestone' }).click();
    await this.page.waitForTimeout(1000);
    console.log(`✅ Last milestone description updated to "${newDescription}"!`);
  }

  // ── Delete the last milestone (with Delete All confirmation) ─────────────
  async deleteLastMilestone() {
    console.log('🗑️ Deleting last milestone...');

    const menuBtns = this.page.locator('.p-1\\.5.rounded-lg.transition-colors');
    const count = await menuBtns.count();
    await menuBtns.nth(count - 1).click();
    await this.page.waitForTimeout(500);

    await this.page.getByRole('button', { name: 'Delete' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await this.page.waitForTimeout(500);

    await this.page.getByRole('button', { name: 'Delete All' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Delete All' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Last milestone deleted!');
  }

  // ══════════════════════════════════════════════════════════════════════════
  // Notes & Files
  // ══════════════════════════════════════════════════════════════════════════

  // ── Click Notes & Files tab ───────────────────────────────────────────────
  async clickNotesAndFiles() {
    console.log('🖱️ Clicking Notes & Files...');
    await this.page.getByRole('button', { name: 'Notes & Files' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('button', { name: 'Notes & Files' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Notes & Files tab opened!');
  }

  // ── Add a note and send ────────────────────────────────────────────────────
  async addNote(noteText: string) {
    console.log(`📝 Adding note: "${noteText}"...`);
    const input = this.page.getByRole('textbox', { name: 'Add a note...' });
    await input.waitFor({ state: 'visible', timeout: 15000 });
    await input.click();
    await input.fill(noteText);
    await this.page.waitForTimeout(300);

    await this.page.getByRole('button', { name: 'Send' }).click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Note sent!');
  }
}