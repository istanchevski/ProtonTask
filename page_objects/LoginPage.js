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

  /**
   * Method used for opening specific web page.
   * @param url - the url of the desired page
   */
  async goto(url) {
    await this.page.goto(url);
    await expect(this.page).toHaveURL(/.*login/);
  }

  /**
   * Method used for entering username and password on the Login Page.
   * @param username, password
   */
  async inputUsernameAndPass(username, password) {
    await this.username.waitFor();
    await this.username.type(username);
    await this.password.waitFor();
    await this.password.type(password);
  }

  /**
   * Method used for clicking on the Sign In button on the Login page.
   */
  async clickSignInBtn() {
    await this.signInBtn.waitFor();
    await this.signInBtn.click();
    await expect(this.signInLoading).not.toBeVisible({ timeout: 10000 });
  }

  /**
   * Method used for entering username, password and clicking on the Sign In button.
   * @param username, password
   */
  async signIn(username, password) {
    await this.inputUsernameAndPass(username, password);
    await this.clickSignInBtn();
    await this.loadingPage.waitForLoading();
  }
};
