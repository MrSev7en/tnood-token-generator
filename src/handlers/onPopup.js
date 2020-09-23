class OnPopup {
  constructor(page, webdriver) {
    this.init(page, webdriver);
  }

  init = async function (page, webdriver) {
    page.on('popup', async (p) => {
      if (p) {
        await p.evaluate(webdriver).catch(() => {});
      }
    });
  };
}

module.exports = OnPopup;
