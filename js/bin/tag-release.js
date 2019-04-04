const childProcess = require('child_process');
const VersionTag = require('./version-tag');

const release = process.argv[ 2 ],
    versionTag = new VersionTag(release);

childProcess.execSync(`git tag ${versionTag}`);