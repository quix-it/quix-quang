const { execSync } = require('child_process');
const packageJson = require('../package.json');

const majorVersion = parseInt(packageJson.version.split('.')[0], 10);
const latestMajorVersion = 21;

// Use "latest" tag for the current major version, otherwise use "v{major}-lts" tag (like Angular Material)
const tag = majorVersion >= latestMajorVersion ? 'latest' : `v${majorVersion}-lts`;

require('./npm-login');

console.log(`Publishing version ${packageJson.version} with tag "${tag}"`);

execSync(`npm publish --tag ${tag}`, { stdio: 'inherit', cwd: 'dist/quang' });
