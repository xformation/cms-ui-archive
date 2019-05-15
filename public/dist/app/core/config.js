import _ from 'lodash';
var Settings = /** @class */ (function () {
    function Settings(options) {
        var defaults = {
            datasources: {},
            windowTitlePrefix: 'CMS - ',
            panels: {},
            newPanelTitle: 'Panel Title',
            playlist_timespan: '1m',
            unsaved_changes_warning: true,
            appSubUrl: '',
            buildInfo: {
                version: 'v1.0',
                commit: '1',
                env: 'production',
                isEnterprise: false,
            },
        };
        _.extend(this, defaults, options);
    }
    return Settings;
}());
export { Settings };
var bootData = window.grafanaBootData || {
    settings: {},
    user: {},
};
var options = bootData.settings;
options.bootData = bootData;
var config = new Settings(options);
export default config;
//# sourceMappingURL=config.js.map