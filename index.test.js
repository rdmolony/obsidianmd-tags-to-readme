const cp = require('child_process');
const path = require('path');


test('test runs', () => {
  const ip = path.join(__dirname, 'index.mjs');
  const result = cp.execSync(`node ${ip}`, {env: process.env}).toString();
  console.log(result);
})
