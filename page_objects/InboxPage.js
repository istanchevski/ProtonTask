// playwright-dev-page.js
const { expect } = require("@playwright/test");
const { LoadingPage } = require("./LoadingPage.js");

exports.InboxPage = class InboxPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.newMessageBtn = page.locator(
      `//button[@data-testid="sidebar:compose"]`
    );
    this.welcomeImg = page.locator(`//img[@alt="Welcome"]`);
    this.settingsBtn = page.locator(`//button[@title="Open settings menu"]`);
    this.goToSettingsOption = page.locator(`//*[text()="Go to settings"]`);
    this.loadingPage = new LoadingPage(page);
  }

  /**
   * Method used in order to wait for the inbox page to load with several assertions implemented.
   */
  async waitForPageToLoad() {
    await expect(this.page).toHaveURL(/.*inbox/);
    await expect(await this.welcomeImg).toBeVisible({ timeout: 10000 });
    await this.newMessageBtn.waitFor();
  }

  /**
   * Method used to click on the Settings button within the Inbox page.
   */
  async clickSettingsBtn() {
    await this.settingsBtn.waitFor();
    await this.settingsBtn.click();
    await this.goToSettingsOption.waitFor();
    await this.goToSettingsOption.click();
    await this.loadingPage.waitForLoading();
  }
};
