import { Page, Locator, expect } from "@playwright/test";

export class TodoismLoginPage {
    readonly page                    : Page;
    readonly getTestAccountButton    : Locator;
    readonly usernameInput           : Locator;
    readonly successNotificationToast: Locator;
    readonly loginButton             : Locator;

    constructor(page: Page) {
        this.page                     = page;
        this.getTestAccountButton     = this.page.getByText('Get a test account');
        this.usernameInput            = this.page.getByPlaceholder('Username');
        this.successNotificationToast = this.page.locator('#toast-container').getByText('Generate success.');
        this.loginButton              = this.page.locator('#login-btn');
    }

    clickOnGetTestAccount = async (): Promise<void> => {
        console.log('Clicked on Get Test Account');
        await this.getTestAccountButton.click();
    }
    
    awaitForUserGeneration = async (): Promise<string> => {
        console.log('Waiting for user generation...');
        await expect(this.successNotificationToast).toHaveText('Generate success.');
        return this.usernameInput.inputValue();
    }
    
    clickOnLogin = async (): Promise<void> => {
        await this.loginButton.click();
    }
}