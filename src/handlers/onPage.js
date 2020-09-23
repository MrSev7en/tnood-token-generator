class OnPage {
  constructor(browser, webdriver) {
    this.init(browser, webdriver);
  }

  init = async function (browser, webdriver) {
    browser.on('targetcreated', async (target) => {
      const page = await target.page();

      if (page) {
        await page.evaluate(webdriver).catch(() => {});
      }
    });
  };
}

module.exports = OnPage;
