// @ts-check
const dotenv = require("dotenv");
const { test, expect } = require("@playwright/test");
const { LoadingPage } = require("../page_objects/LoadingPage.js");
const { LoginPage } = require("../page_objects/LoginPage.js");
const { InboxPage } = require("../page_objects/InboxPage.js");
const { DashboardPage } = require("../page_objects/DashboardPage.js");
const {
  FoldersAndLabelsPage,
} = require("../page_objects/FoldersAndLabelsPage.js");
const data = require("../data/folderAndLabel.js");
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const baseUrl = process.env.BASE_URL;

test.describe("Folders and Labels", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(baseUrl);
  });

  test("Create Folder", async ({ page }) => {
    const loadingPage = new LoadingPage(page);
    const loginPage = new LoginPage(page);
    const inboxPage = new InboxPage(page);
    const dashboardPage = new DashboardPage(page);
    const foldersAndLabelsPage = new FoldersAndLabelsPage(page);
    await loginPage.signIn(username, password);
    await loadingPage.waitForLoading();
    await inboxPage.waitForPageToLoad();
    await inboxPage.clickSettingsBtn();
    await loadingPage.waitForLoading();
    await dashboardPage.waitForPageToLoad();
    await dashboardPage.clickFoldersAndLabelsBtn();
    await foldersAndLabelsPage.waitForPageToLoad();
    await foldersAndLabelsPage.addFolder(data.folderName);
  });

  test("Create Label", async ({ page }) => {
    const loadingPage = new LoadingPage(page);
    const loginPage = new LoginPage(page);
    const inboxPage = new InboxPage(page);
    const dashboardPage = new DashboardPage(page);
    const foldersAndLabelsPage = new FoldersAndLabelsPage(page);
    await loginPage.inputUsernameAndPass(username, password);
    await loginPage.clickSignInBtn();
    await loadingPage.waitForLoading();
    await inboxPage.waitForPageToLoad();
    await inboxPage.clickSettingsBtn();
    await loadingPage.waitForLoading();
    await dashboardPage.waitForPageToLoad();
    await dashboardPage.clickFoldersAndLabelsBtn();
    await foldersAndLabelsPage.waitForPageToLoad();
    await foldersAndLabelsPage.AddLabel(data.labelName);
  });
});
