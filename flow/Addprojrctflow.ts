import { Page } from '@playwright/test';
import { AddProjectPage } from '../pages/Addprojectpage';

// ── Test Data ──────────────────────────────────────────────────────────────────
const PROJECT = {
  name:         'Smart Expense Tracker',
  description:  `The Smart Expense Tracker is a web and mobile application designed to help users manage their daily expenses efficiently. Users can add income and expenses, categorize transactions, and track their spending habits through charts and reports. The system provides monthly budget analysis, spending alerts, and savings recommendations using simple data analytics. It also includes secure user authentication and cloud data storage for easy access across devices. The project is developed using modern technologies such as React, Node.js, Express, and MongoDB, focusing on user-friendly design and real-time financial tracking.`,
  clientId:     '9c191ee6-67f8-437a-841b-4f4e4f494583',
  clientRole:   'PROJECT_MANAGER',
  teamMemberId: '12a14e01-7d6b-4951-b331-5cbc43214b4c',
  endDay:       '21',
  completion:   '50',
  budget:       '6000000',
};

const TEAM = {
  memberName: 'Aarav Joshi (Software',
  role:       'Project Manager',
};

const MILESTONE = {
  name:       'Development',
  description: 'Phase 1',
  dueDate:    '2026-05-31',
  assignee:   'sanjana Singh',
  editedDesc: 'Phase 2',
};

const TASK = {
  milestoneName: 'Development',
  title:         'Test',
  description:   'TEST',
  hours:         '0.5',
};

const NOTE = {
  text: 'Testing',
};

export async function addProjectFlow(page: Page) {
  const project = new AddProjectPage(page);

  console.log('════════════════════════════════════════');
  console.log('FLOW — Add Project (Full Flow)');
  console.log('════════════════════════════════════════');

  // ── Step 1: Navigate to All Projects ──────────────────────────────────────
  await project.goToAllProjects();

  // ── Step 2: Open Create Manually form ─────────────────────────────────────
  await project.clickNewProjectManually();

  // ── Step 3: Fill project name ──────────────────────────────────────────────
  await project.fillProjectName(PROJECT.name);

  // ── Step 4: Fill project description ──────────────────────────────────────
  await project.fillProjectDescription(PROJECT.description);

  // ── Step 5: Add client member ──────────────────────────────────────────────
  await project.addClient(PROJECT.clientId);

  // ── Step 6: Add team member ────────────────────────────────────────────────
  await project.addTeamMember(PROJECT.teamMemberId);

  // ── Step 7: Set start date to today ───────────────────────────────────────
  await project.setStartDateToday();

  // ── Step 8: Set end date ───────────────────────────────────────────────────
  await project.setEndDate(PROJECT.endDay);

  // ── Step 9: Fill completion percentage ────────────────────────────────────
  await project.fillCompletion(PROJECT.completion);

  // ── Step 10: Fill budget ───────────────────────────────────────────────────
  await project.fillBudget(PROJECT.budget);

  // ── Step 11: Submit form ───────────────────────────────────────────────────
  await project.clickCreateProject();

  // ── Step 12: Open newly created project ───────────────────────────────────
  await project.openProject(PROJECT.name);

  // ---------------------------------------------------------------------------
  // Team & Timesheet
  // ---------------------------------------------------------------------------

  // ── Step 13: Go to Team & Timesheet tab ───────────────────────────────────
  await project.clickTeamAndTimesheet();

  // ── Step 14: Add team member ───────────────────────────────────────────────
  await project.addTeamMemberFromTab(TEAM.memberName, TEAM.role);

  // ---------------------------------------------------------------------------
  // Milestones & Tasks
  // ---------------------------------------------------------------------------

  // ── Step 15: Go to Milestones & Tasks tab ─────────────────────────────────
  await project.clickMilestonesAndTasks();

  // ── Step 16: Create milestone ─────────────────────────────────────────────
  await project.addMilestone(MILESTONE.name, MILESTONE.description, MILESTONE.dueDate);

  // ── Step 17: Assign milestone ─────────────────────────────────────────────
  await project.openMilestoneMenu(0);
  await project.assignMilestone(MILESTONE.assignee);

  // ── Step 18: Add task ─────────────────────────────────────────────────────
  await project.addTask(TASK.milestoneName, TASK.title, TASK.description, TASK.hours);

  // ── Step 19: Duplicate task ───────────────────────────────────────────────
//   await project.duplicateTask(0);

  // ── Step 20: Edit duplicated milestone description ────────────────────────
//   await project.editLastMilestone(MILESTONE.editedDesc);

  // ── Step 21: Delete last milestone ────────────────────────────────────────
//   await project.deleteLastMilestone();

  // ---------------------------------------------------------------------------
  // Notes & Files
  // ---------------------------------------------------------------------------
    
  // ── Step 22: Go to Notes & Files tab ──────────────────────────────────────
  await project.clickNotesAndFiles();

  // ── Step 23: Add note ─────────────────────────────────────────────────────
  await project.addNote(NOTE.text);

  console.log('✅ FLOW PASSED — Project fully created with team, milestones, tasks, and notes!');
}