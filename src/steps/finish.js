const colors = require('colors');

class Finish {
  constructor(page, user) {
    this.init(page, user);
  }

  init = async function (page, user) {
    try {
      await page.waitFor(10000);

      await (
        await page.$(
          '#app-mount > div:nth-child(6) > div.modal-3c3bKg > div > form > div > div.container-3bTSed.formItem-3yqJjH > div.inputs-14Hc7m > div:nth-child(1) > div > div > div > div'
        )
      ).click();

      await (
        await page.$(
          '#app-mount > div.popouts-2bnG9Z > div > div.popout-2sKjHu.lookFilled-1h1y05.sizeMedium-6vZ9JV.thin-1ybCId.scrollerBase-289Jih > div:nth-child(1)'
        )
      ).click();

      await (
        await page.$(
          '#app-mount > div:nth-child(6) > div.modal-3c3bKg > div > form > div > div.container-3bTSed.formItem-3yqJjH > div.inputs-14Hc7m > div:nth-child(2) > div > div > div > div'
        )
      ).click();

      await (
        await page.$(
          '#app-mount > div.popouts-2bnG9Z > div > div.popout-2sKjHu.lookFilled-1h1y05.sizeMedium-6vZ9JV.thin-1ybCId.scrollerBase-289Jih > div:nth-child(5)'
        )
      ).click();

      await (
        await page.$(
          '#app-mount > div:nth-child(6) > div.modal-3c3bKg > div > form > div > div.container-3bTSed.formItem-3yqJjH > div.inputs-14Hc7m > div:nth-child(3) > div > div > div > div'
        )
      ).click();

      await (
        await page.$(
          '#app-mount > div.popouts-2bnG9Z > div > div.popout-2sKjHu.lookFilled-1h1y05.sizeMedium-6vZ9JV.thin-1ybCId.scrollerBase-289Jih > div:nth-child(23)'
        )
      ).click();

      await (
        await page.$(
          '#app-mount > div:nth-child(6) > div.modal-3c3bKg > div > form > div > button'
        )
      ).click();

      await page.waitFor(1 * 1000);

      await (await page.$('#uid_5 > button')).click();

      await (
        await page.$('#app-mount > div:nth-child(6) > div.backdrop-1wrmKB')
      ).click();

      console.log(
        `${colors.green.bold(
          '[~Done]'
        )} Token generated with success for user ${colors.blue(user)}`
      );
    } catch {
      console.log(
        `${colors.red.bold(
          '[~Error]'
        )} Cannot finish, wait a few minutes and try again.`
      );
    }
  };
}

module.exports = Finish;
