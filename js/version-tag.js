const childProcess = require('child_process');

class VersionTag {

    static dateVersion() {

        const now = new Date();

        return [ now.getUTCFullYear() ].concat([
                                                   now.getUTCMonth() + 1,
                                                   now.getUTCDate()
                                               ].map((num) => num < 10 ? `0${num}` : num))
                                       .join('.');
    }

    static getRevision(tag) {

        const list = childProcess.execSync(`git tag -l ${tag}*`).toString().trim();

        return 1 + (list ? list.split("\n").length : 0);
    }

    constructor(release) {

        this.release = release;
        this.version = this.constructor.dateVersion();
        this.revision = this.constructor.getRevision(this.toString());
    }

    toString() {

        return `v.${this.release}.${this.version}${(this.revision > 1 ? '-' + this.revision : '')}`;
    }
}

module.exports = VersionTag;