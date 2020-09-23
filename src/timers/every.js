class Every {
  constructor(browser, webdriver) {
    this.init(browser, webdriver);
  }

  init = async function (browser, webdriver) {
    setInterval(async () => {
      for (let i = 0; i < (await browser.pages()).length; i++) {
        const page = (await browser.pages())[i];

        if (page) {
          await page.evaluate(webdriver).catch(() => {});
        }
      }
    }, 5000);
  };
}

module.exports = Every;
