// playwright-dev-page.js
const { expect } = require("@playwright/test");

exports.LoadingPage = class LoadingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.loading = page.locator(
      `//p[text()="Loading Proton Account"]//span[text()="Loading"]`
    );
  }

  async waitForLoading() {
    await expect(this.loading).not.toBeVisible({ timeout: 10000 });
  }
};
