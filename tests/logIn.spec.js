// @ts-check
const dotenv = require("dotenv");
const { test, expect } = require("@playwright/test");
const { LoadingPage } = require("../page_objects/LoadingPage.js");
const { LoginPage } = require("../page_objects/LoginPage.js");
const { InboxPage } = require("../page_objects/InboxPage.js");
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

test.describe("Log In", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(baseURL);
  });

  test("Successful log in", async ({ page }) => {
    const loadingPage = new LoadingPage(page);
    const loginPage = new LoginPage(page);
    const inboxPage = new InboxPage(page);
    await loginPage.signIn(username, password);
    await inboxPage.waitForPageToLoad();
  });
});
