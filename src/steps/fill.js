const colors = require('colors');

const speed = require('../utils/speed');
const trySolve = require('./trySolve');

class Fill {
  constructor(page, user) {
    this.init(page, user);
  }

  init = async function (page, user) {
    await (
      await page.$(
        '#app-mount > div > div > div.grid-3Ykf_K.heroBackground-3m0TRU > div.row-3wW-Fx.heroContainer-3j1eQg > div > div.ctaContainer-3vWJHU > button'
      )
    ).click();

    await page.waitFor(3500);

    const input = await page.$(
      '#app-mount > div > div > div.grid-3Ykf_K.heroBackground-3m0TRU > div.row-3wW-Fx.heroContainer-3j1eQg > div > div.formContainer-1p5okg > form > input'
    );
    input.click();

    await input.type(user, { delay: new speed(30, 150).result });

    try {
      await (
        await page.$(
          '#app-mount > div > div > div.grid-3Ykf_K.heroBackground-3m0TRU > div.row-3wW-Fx.heroContainer-3j1eQg > div > div.formContainer-1p5okg > form > button'
        )
      ).click();

      await page.waitFor(7000);

      console.log(
        `${colors.yellow.bold('[~Captcha]')} Trying to solve recaptcha...`
      );

      new trySolve(page, user);
    } catch {
      console.log(
        `${colors.red.bold(
          '[~Error]'
        )} Cannot fill, wait a few minutes and try again.`
      );
    }
  };
}

module.exports = Fill;
