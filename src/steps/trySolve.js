const colors = require('colors');
const cheerio = require('cheerio');
const https = require('https');
const axios = require('axios');

const speed = require('../utils/speed');
const reload = require('./reload');
const finish = require('./finish');

class TrySolve {
  constructor(page, user) {
    this.init(page, user);
  }

  init = async function (page, user) {
    try {
      const frames = await page.frames();
      const anchor = frames.find((frame) => frame.url().includes('anchor'));

      await (await anchor.$('#recaptcha-anchor')).click();

      setTimeout(async () => {
        const anchor2 = frames.find((frame) => frame.url().includes('bframe'));
        await (await anchor2.$('#recaptcha-audio-button')).click();

        try {
          setTimeout(async () => {
            const content = await anchor2.content();
            const $ = cheerio.load(content);

            const audioLink = $(
              'body > div > div > div.rc-audiochallenge-tdownload > a'
            ).attr('href');

            const audioBytes = await anchor2.evaluate((audioLink) => {
              return (async () => {
                const response = await window.fetch(audioLink);
                const buffer = await response.arrayBuffer();

                return Array.from(new Uint8Array(buffer));
              })();
            }, audioLink);

            const httsAgent = new https.Agent({ rejectUnauthorized: false });
            const response = await axios({
              httsAgent,
              method: 'post',
              url: 'https://api.wit.ai/speech?v=20170307',
              data: new Uint8Array(audioBytes).buffer,
              headers: {
                Authorization: 'Bearer JVHWCNWJLWLGN6MFALYLHAPKUFHMNTAC',
                'Content-Type': 'audio/mpeg3',
              },
            });

            const audioTranscript = response.data._text.trim();

            try {
              await (await anchor2.$('#audio-response')).click();
              await (await anchor2.$('#audio-response')).type(audioTranscript, {
                delay: new speed(30, 150).result,
              });

              await (await anchor2.$('#recaptcha-verify-button')).click();

              console.log(
                `${colors.green.bold(
                  '[~Thread]'
                )} Captcha solved with success, at thread ${colors.green('1')}`
              );

              new finish(page, user);
            } catch (err) {
              new reload(page, 2, user);
            }
          }, 1 * 1000);
        } catch (err) {
          new reload(page, 3, user);
        }
      }, 5 * 1000);
    } catch {
      console.log(
        `${colors.red.bold(
          '[~Error]'
        )} Cannot solve, wait a few minutes and try again.`
      );
    }
  };
}

module.exports = TrySolve;
