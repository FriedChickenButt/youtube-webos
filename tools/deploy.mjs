import { spawnSync } from 'node:child_process';

process.exit(
  spawnSync(
    'node',
    [
      './node_modules/@webosose/ares-cli/bin/ares-install.js',
      `./youtube.leanback.v4_${process.env.npm_package_version}_all.ipk`
    ],
    { stdio: 'inherit' }
  ).status
);
