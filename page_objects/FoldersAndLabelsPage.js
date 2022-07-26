// playwright-dev-page.js
const { test, expect } = require("@playwright/test");
const data = require("../data/folderAndLabel.js");

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
    this.useFolderColorsCheckbox = page.locator(
      `//label[@for="folder-colors" and @class="toggle-label"]`
    );
    this.useFolderColorsChecked = page.locator(
      `//label[@for="folder-colors" and contains(@class,"toggle-label--checked")]`
    );
    this.useFolderColorsBtn = page.locator(
      `//input[@id="folder-colors"]//following-sibling::span[1]`
    );
    this.inheritColorFromParentCheckbox = page.locator(
      `//label[@for="parent-folder-color" and contains(@class,"toggle-label--checked")]`
    );
    this.dropdownDeleteBtn = page.locator(
      `//div[@class="dropdown-content"]//button[text()="Delete"]`
    );
    this.modalDeleteBtn = page.locator(
      `//div[@class="modal-two-dialog-container"]//button[text()="Delete"]`
    );
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

  async useFolderColors() {
    if (
      (await this.useFolderColorsCheckbox.isVisible({ timeout: 1000 })) == true
    ) {
      await this.useFolderColorsBtn.click();
      const preference = "Preference saved";
      await expect(
        this.page.locator(`//div[text()="${preference}"]`)
      ).toBeVisible();
      await expect(this.useFolderColorsChecked).toBeVisible();
      await expect(this.inheritColorFromParentCheckbox).toBeVisible();
    } else {
      console.log("The 'Use Folder Colors' checkbox is already checked");
    }
  }

  async deleteFolder(folderName) {
    const folderDropdown = this.page.locator(
      `//*[text()="Folders"]//ancestor::div//following-sibling::ul/li[@title="${folderName}"]//button[@title="Open actions dropdown"]`
    );
    await folderDropdown.waitFor();
    await folderDropdown.click();
    await this.dropdownDeleteBtn.waitFor();
    await this.dropdownDeleteBtn.click();
    await expect(this.modalContainer).toBeVisible();
    await this.modalDeleteBtn.waitFor();
    await this.modalDeleteBtn.click();
    const folderRemoved = folderName + " removed";
    await expect(
      this.page.locator(`//div[text()="${folderRemoved}"]`)
    ).toBeVisible();
    await expect(
      this.page.locator(
        `//*[text()="Folders"]//ancestor::div//following-sibling::ul/li[@title="${folderName}"]`
      )
    ).not.toBeVisible();
  }

  async deleteLabel(labelName) {
    const labelDropdown = this.page.locator(
      `//*[text()="Labels"]//ancestor::table//span[text()="${labelName}"]//ancestor::tr//button[@title="Open actions dropdown"]`
    );
    await labelDropdown.waitFor();
    await labelDropdown.click();
    await this.dropdownDeleteBtn.waitFor();
    await this.dropdownDeleteBtn.click();
    await expect(this.modalContainer).toBeVisible();
    await this.modalDeleteBtn.waitFor();
    await this.modalDeleteBtn.click();
    const labelRemoved = labelName + " removed";
    await expect(
      this.page.locator(`//div[text()="${labelRemoved}"]`)
    ).toBeVisible();
    await expect(
      this.page.locator(
        `//*[text()="Labels"]//ancestor::table//span[text()="${labelName}"]`
      )
    ).not.toBeVisible();
  }
};
