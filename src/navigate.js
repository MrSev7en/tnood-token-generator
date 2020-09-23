const colors = require('colors');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const fs = require('fs');

const args = require('./utils/args');
const ignoreDefaultArgs = require('./utils/ignoreDefaultArgs');
const every = require('./timers/every');
const onPage = require('./handlers/onPage');
const onPopup = require('./handlers/onPopup');
const onRequest = require('./handlers/onRequest');
const cookies = require('./utils/cookies');
const fill = require('./steps/fill');

class Navigate {
  constructor(user) {
    this.init(user);
  }

  init = async function (user) {
    console.log(
      `${colors.green.bold(
        '[~Init]'
      )} Starting generation of token for user ${colors.yellow.bold(user)}`
    );

    const browser = await puppeteer.use(StealthPlugin()).launch({
      executablePath:
        'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe' | 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      args: args,
      ignoreDefaultArgs: ignoreDefaultArgs,
      headless: false,
      defaultViewport: null,
      ignoreHTTPSErrors: true,
      userDataDir: './tmp',
    });

    const webdriver = fs.readFileSync('./src/plataform/webdriver.js', 'utf8');

    new every(browser, webdriver);
    new onPage(browser, webdriver);

    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await (await browser.pages())[0].close();

    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');

    await page.evaluate(webdriver).catch(() => {});
    await page.setRequestInterception(true);

    new onPopup(page, webdriver);
    new onRequest(page, browser);

    await page.goto('https://discord.com/new');
    await page.setCookie(...cookies);

    new fill(page, user);
  };
}

module.exports = Navigate;
