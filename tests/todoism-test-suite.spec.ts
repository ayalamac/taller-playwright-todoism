import { test } from '@playwright/test';
import { TodoismIntroPage } from '../pages/intro.page';
import { TodoismLoginPage } from '../pages/login.page';
import { TodoismAppPage } from '../pages/app.page';
import { dummyTask } from './../data/todoism-task.data';

test.describe('Todoism Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    test.slow();

    const introPage = new TodoismIntroPage(page);
    const loginPage = new TodoismLoginPage(page);
    
    await introPage.openWebPage();
    await introPage.clickOnLogin();

    await loginPage.clickOnGetTestAccount();
    await loginPage.awaitForUserGeneration();
    await loginPage.clickOnLogin();
  });

  test('Create a task', async ({ page }) => {
    test.slow();

    const appPage = new TodoismAppPage(page);

    await appPage.awaitForAppToBeReady();
    await appPage.createTask(dummyTask);

    await appPage.validateTaskCreation(dummyTask);

    await page.screenshot({ path: `evidences/task-created.png` });
  });

  test('Complete a task', async ({ page }) => {
    test.slow();

    const appPage = new TodoismAppPage(page);

    await appPage.awaitForAppToBeReady();
    await appPage.createTask(dummyTask);
    await appPage.completeTask(dummyTask);

    await appPage.validateTaskCompletion(dummyTask);

    await page.screenshot({ path: `evidences/task-completed.png` });
  });

  test('Clear completed tasks', async ({ page }) => {
    test.slow();

    const appPage = new TodoismAppPage(page);

    await appPage.awaitForAppToBeReady();
    await appPage.createTask(dummyTask);
    await appPage.completeTask(dummyTask);
    await appPage.clearCompletedTasks();

    await appPage.validateTaskCleared(dummyTask);

    await page.screenshot({ path: `evidences/task-cleared.png` });
  });

});