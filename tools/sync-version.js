#!/usr/bin/env node

const fs = require('fs');

const packageInfo = JSON.parse(fs.readFileSync('package.json'));
const appInfo = JSON.parse(fs.readFileSync('assets/appinfo.json'));

fs.writeFileSync(
  'assets/appinfo.json',
  `${JSON.stringify(
    {
      ...appInfo,
      version: packageInfo.version,
    },
    null,
    4,
  )}\n`,
);
