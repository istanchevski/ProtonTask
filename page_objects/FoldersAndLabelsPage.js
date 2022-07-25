// playwright-dev-page.js
const { expect } = require("@playwright/test");

exports.FoldersAndLabelsPage = class FoldersAndLabelsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator(
      `//main[contains(@class, "main-area")]//*[text()="Folders and labels"]`
    );
    this.addFolderBtn = page.locator(`//button[text()="Add folder"]`);
    this.addLabelBtn = page.locator(`//button[text()="Add label"]`);
    this.modalContainer = page.locator(
      `//div[@class="modal-two-dialog-container"]`
    );
    this.folderName = page.locator(`//input[@placeholder="Folder name"]`);
    this.labelName = page.locator(`//input[@placeholder="Label name"]`);
    this.saveBtn = page.locator(`//button[text()="Save"]`);
  }

  async waitForPageToLoad() {
    await expect(this.page).toHaveURL(/.*folders-labels/);
    await this.title.waitFor();
  }

  async addFolder(folderName) {
    await this.addFolderBtn.waitFor();
    await this.addFolderBtn.click();
    await expect(this.modalContainer).toBeVisible();
    await this.folderName.type(folderName);
    await this.saveBtn.click();
    const folder = folderName + " created";
    await expect(this.page.locator(`//div[text()="${folder}"]`)).toBeVisible();
    await expect(
      this.page.locator(
        `//*[text()="Folders"]//ancestor::div//following-sibling::ul/li[@title="${folderName}"]`
      )
    ).toBeVisible();
  }

  async AddLabel(labelName) {
    await this.addLabelBtn.waitFor();
    await this.addLabelBtn.click();
    await expect(this.modalContainer).toBeVisible();
    await this.labelName.type(labelName);
    await this.saveBtn.click();
    const label = labelName + " created";
    await expect(this.page.locator(`//div[text()="${label}"]`)).toBeVisible();
    await expect(
      this.page.locator(
        `//*[text()="Labels"]//ancestor::table//span[text()="${labelName}"]`
      )
    ).toBeVisible();
  }
};
