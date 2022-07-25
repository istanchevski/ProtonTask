// playwright-dev-page.js
const { expect } = require("@playwright/test");

exports.DashboardPage = class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.backToMailBtn = page.locator(`//a[@title="Back to Mail"]`);
    this.foldersAndLabels = page.locator(`//span[@title="Folders and labels"]`);
  }

  async waitForPageToLoad() {
    await expect(this.page).toHaveURL(/.*dashboard/);
    await this.backToMailBtn.waitFor();
  }

  async clickFoldersAndLabelsBtn() {
    await this.foldersAndLabels.waitFor();
    await this.foldersAndLabels.click();
  }
};
