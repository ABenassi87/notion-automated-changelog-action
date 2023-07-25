const path = require('path');
const process = require('node:process');
const cp = require('child_process');

jest.setTimeout(180000);

test('complete input should succeed with tags', () => {
  process.env.INPUT_DATABASE = 'def8dcfb1c1a4363b2af1d629c83ee6d';
  process.env.INPUT_TOKEN = process.env.NOTION_TOKEN;
  process.env.INPUT_NAME = 'd2ea1a4d6';
  process.env.INPUT_ENVIRONMENT = 'training';
  process.env.INPUT_CHANGELOG = `
* d2ea1a4d6 - (origin/master, origin/HEAD, master) Test 1
* 501eb1b9d - feat(feature-2): Test 2
* f10a1b66c - fix(fix-30): Test 3
`;

  const ip = path.join(__dirname, 'index.js');
  const options = {
    env: process.env,
    stdio: 'pipe',
  };
  const result = cp.execSync(`node ${ip}`, options).toString();
  console.log(result)
  expect(result).toBeDefined();
});
