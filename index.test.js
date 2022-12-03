const cp = require('child_process');
const path = require('path');


test('test runs', () => {
  process.env['INPUT_DIRPATH'] = 'data';
  const ip = path.join(__dirname, 'index.mjs');
  const result = cp.execSync(`node ${ip}`, {env: process.env}).toString();
  console.log(result);
})
