// @ts-check
const dotenv = require("dotenv");
const { test, expect } = require("@playwright/test");
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

test.describe("Folders and Labels test cases", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(baseURL);
  });

  test("1. Create new folder", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inboxPage = new InboxPage(page);
    const dashboardPage = new DashboardPage(page);
    const foldersAndLabelsPage = new FoldersAndLabelsPage(page);
    await loginPage.signIn(username, password);
    await inboxPage.waitForPageToLoad();
    await inboxPage.clickSettingsBtn();
    await dashboardPage.waitForPageToLoad();
    await dashboardPage.clickFoldersAndLabelsBtn();
    await foldersAndLabelsPage.waitForPageToLoad();
    await foldersAndLabelsPage.addFolder(data.folderName);
  });

  test("2. Create new label", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inboxPage = new InboxPage(page);
    const dashboardPage = new DashboardPage(page);
    const foldersAndLabelsPage = new FoldersAndLabelsPage(page);
    await loginPage.signIn(username, password);
    await inboxPage.waitForPageToLoad();
    await inboxPage.clickSettingsBtn();
    await dashboardPage.waitForPageToLoad();
    await dashboardPage.clickFoldersAndLabelsBtn();
    await foldersAndLabelsPage.waitForPageToLoad();
    await foldersAndLabelsPage.AddLabel(data.labelName);
  });

  test("3. Use folder colors", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inboxPage = new InboxPage(page);
    const dashboardPage = new DashboardPage(page);
    const foldersAndLabelsPage = new FoldersAndLabelsPage(page);
    await loginPage.signIn(username, password);
    await inboxPage.waitForPageToLoad();
    await inboxPage.clickSettingsBtn();
    await dashboardPage.waitForPageToLoad();
    await dashboardPage.clickFoldersAndLabelsBtn();
    await foldersAndLabelsPage.waitForPageToLoad();
    await foldersAndLabelsPage.useFolderColors();
  });

  test("4. Delete existing folder", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inboxPage = new InboxPage(page);
    const dashboardPage = new DashboardPage(page);
    const foldersAndLabelsPage = new FoldersAndLabelsPage(page);
    await loginPage.signIn(username, password);
    await inboxPage.waitForPageToLoad();
    await inboxPage.clickSettingsBtn();
    await dashboardPage.waitForPageToLoad();
    await dashboardPage.clickFoldersAndLabelsBtn();
    await foldersAndLabelsPage.waitForPageToLoad();
    await foldersAndLabelsPage.deleteFolder("Test Folder");
  });

  test("5. Delete existing label", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inboxPage = new InboxPage(page);
    const dashboardPage = new DashboardPage(page);
    const foldersAndLabelsPage = new FoldersAndLabelsPage(page);
    await loginPage.signIn(username, password);
    await inboxPage.waitForPageToLoad();
    await inboxPage.clickSettingsBtn();
    await dashboardPage.waitForPageToLoad();
    await dashboardPage.clickFoldersAndLabelsBtn();
    await foldersAndLabelsPage.waitForPageToLoad();
    await foldersAndLabelsPage.deleteLabel("Test Label");
  });
});
