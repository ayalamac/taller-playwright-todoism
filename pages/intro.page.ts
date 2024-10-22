import { Page, Locator } from "@playwright/test";

export class TodoismIntroPage {
    readonly page       : Page;
    readonly LoginButton: Locator;

    constructor(page: Page) {
        this.page        = page;
        this.LoginButton = this.page
                            .getByRole('navigation')
                            .getByRole('link', { name: 'Login' });
    }

    openWebPage = async () => {
        await this.page.goto('http://127.0.0.1:5000/#intro');
    }

    clickOnLogin = async () => {
        await this.LoginButton.click();
    }
}