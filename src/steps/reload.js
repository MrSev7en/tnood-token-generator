const colors = require('colors');

const recreate = require('./recreate');

class Reload {
  constructor(page, index, user) {
    this.init(page, index, user);
  }

  init = async function (page, index, user) {
    try {
      switch (index) {
        case 1: {
          console.log(
            `${colors.green.bold(
              '[~Thread]'
            )} Captcha solved with success, at thread ${colors.green(index)}`
          );
          break;
        }

        case 2: {
          console.log(
            `${colors.red.bold(
              '[~Thread]'
            )} Captcha intercepted with success, at thread ${colors.red(index)}`
          );
          break;
        }

        case 3: {
          console.log(
            `${colors.red.bold(
              '[~Thread]'
            )} Captcha falied, trying to continue, at thread ${colors.red(
              index
            )}`
          );
          break;
        }
      }

      await page.goto('https://discord.new');
      await page.waitFor(2500);
      await page.goto('https://discord.com/new');

      new recreate(page, user);
    } catch {
      console.log(
        `${colors.red.bold(
          '[~Error]'
        )} Cannot reload, wait a few minutes and try again.`
      );
    }
  };
}

module.exports = Reload;
