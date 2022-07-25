// playwright-dev-page.js
const { expect } = require("@playwright/test");

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
  }

  async waitForPageToLoad() {
    await expect(this.page).toHaveURL(/.*inbox/);
    await expect(await this.welcomeImg).toBeVisible({ timeout: 10000 });
    await this.newMessageBtn.waitFor();
  }

  async clickSettingsBtn() {
    await this.settingsBtn.waitFor();
    await this.settingsBtn.click();
    await this.goToSettingsOption.waitFor();
    await this.goToSettingsOption.click();
  }
};
