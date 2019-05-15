import _ from 'lodash';
var versionPattern = /^(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:-([0-9A-Za-z\.]+))?/;
var SemVersion = /** @class */ (function () {
    function SemVersion(version) {
        var match = versionPattern.exec(version);
        if (match) {
            this.major = Number(match[1]);
            this.minor = Number(match[2] || 0);
            this.patch = Number(match[3] || 0);
            this.meta = match[4];
        }
    }
    SemVersion.prototype.isGtOrEq = function (version) {
        var compared = new SemVersion(version);
        return !(this.major < compared.major || this.minor < compared.minor || this.patch < compared.patch);
    };
    SemVersion.prototype.isValid = function () {
        return _.isNumber(this.major);
    };
    return SemVersion;
}());
export { SemVersion };
export function isVersionGtOrEq(a, b) {
    var aSemver = new SemVersion(a);
    return aSemver.isGtOrEq(b);
}
//# sourceMappingURL=version.js.map