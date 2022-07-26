// playwright-dev-page.js
const { expect } = require("@playwright/test");
const { LoadingPage } = require("./LoadingPage.js");

exports.LoginPage = class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.username = page.locator("#username");
    this.password = page.locator("#password");
    this.signInBtn = page.locator(`//button[@type="submit"][text()="Sign in"]`);
    this.signInLoading = page.locator(
      `//span[@class="button-loader-container"]`
    );
    this.loadingPage = new LoadingPage(page);
  }

  async goto(url) {
    await this.page.goto(url);
    await expect(this.page).toHaveURL(/.*login/);
  }

  async inputUsernameAndPass(username, password) {
    await this.username.waitFor();
    await this.username.type(username);
    await this.password.waitFor();
    await this.password.type(password);
  }

  async clickSignInBtn() {
    await this.signInBtn.waitFor();
    await this.signInBtn.click();
    await expect(this.signInLoading).not.toBeVisible({ timeout: 10000 });
  }

  async signIn(username, password) {
    await this.inputUsernameAndPass(username, password);
    await this.clickSignInBtn();
    await this.loadingPage.waitForLoading();
  }
};
