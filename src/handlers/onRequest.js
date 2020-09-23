const colors = require('colors');
const fs = require('fs');

const tokens = [];

class OnRequest {
  constructor(page, browser) {
    this.init(page, browser);
  }

  init = async function (page, browser) {
    page.on('request', async (request) => {
      const headers = request.headers();
      const url = await request.url();

      headers['Accept-Language'] = 'en,en-US;q=0,5';
      headers['Accept'] =
        'text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8';

      request.continue({
        headers,
      });

      if (url.includes('discord.com') && headers['authorization']) {
        const token = headers['authorization'];

        if (token && token.toString() != 'undefined') {
          if (!tokens.includes(token)) {
            tokens.push(token);

            console.log(
              `${colors.green.bold('[~Token]')} Token generated: ${colors.green(
                token
              )}`
            );

            let list = fs.readFileSync('./tokens.txt').toString();

            if (!list) {
              list = `${token}`;
            } else {
              list += `\n${token}`;
            }

            fs.writeFileSync('./tokens.txt', list);
          }
        }
      }
    });
  };
}

module.exports = OnRequest;
