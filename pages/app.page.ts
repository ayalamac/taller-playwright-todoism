import { Page, Locator, expect } from "@playwright/test";

export class TodoismAppPage {
    readonly page            : Page;
    readonly newTaskInputText: Locator;
    readonly tasksList       : Locator;
    readonly clearButton     : Locator

    constructor(page: Page) {
        this.page             = page;
        this.newTaskInputText = this.page.locator('#item-input');
        this.tasksList        = this.page.locator('.items');
        this.clearButton      = this.page.locator('#clear-btn');
    }

    awaitForAppToBeReady = async () => {
        await expect(this.newTaskInputText).toBeVisible();
    }

    createTask = async (task: string) => {
        await this.newTaskInputText.click();
        await this.newTaskInputText.pressSequentially(task);
        await this.newTaskInputText.press('Enter');
    }

    completeTask = async (task: string) => {
        const taskChecker = this.page.locator(`//span[@class = "item-body" and contains(.,"${task}")]/a/i`);
        await taskChecker.click()
    }

    clearCompletedTasks = async () => {
        await this.clearButton.click();
    }

    validateTaskCreation = async (task: string) => {
        await expect(this.tasksList.getByText(task)).toHaveClass('active-item');
    }

    validateTaskCompletion = async (task: string) => {
        await expect(this.tasksList.getByText(task)).toHaveClass('inactive-item');
    }

    validateTaskCleared = async (task: string) => {
        await expect(this.tasksList).not.toHaveText(task);
    }
}