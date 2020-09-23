const colors = require('colors');
const randomName = require('node-random-name');
const rimraf = require('rimraf');

const navigate = require('./src/navigate');

(async () => {
  console.clear();
  console.log(
    `${colors.yellow.bold(
      '[~Start]'
    )} Starting the process of automatic token generator.`
  );
  console.log(
    `${colors.green.bold('Copyright')} ${colors.blue.bold(
      '©'
    )} ${colors.green.bold('Unman #7007')} ${colors.blue.bold(
      '2020'
    )} ${colors.green.bold('All Rights Reserved')}`
  );

  console.log();

  rimraf.sync('./tmp');

  new navigate(randomName());
})();
