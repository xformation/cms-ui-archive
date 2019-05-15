import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
// import PageHeader from 'app/core/components/PageHeader/PageHeader';
import OrgActionBar from 'app/core/components/OrgActionBar/OrgActionBar';
import PageLoader from 'app/core/components/PageLoader/PageLoader';
import PluginList from './PluginList';
import { loadPlugins, setPluginsLayoutMode, setPluginsSearchQuery } from './state/actions';
import { getNavModel } from '../../core/selectors/navModel';
import { getLayoutMode, getPlugins, getPluginsSearchQuery } from './state/selectors';
var PluginListPage = /** @class */ (function (_super) {
    tslib_1.__extends(PluginListPage, _super);
    function PluginListPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PluginListPage.prototype.componentDidMount = function () {
        this.fetchPlugins();
    };
    PluginListPage.prototype.fetchPlugins = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.loadPlugins()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginListPage.prototype.render = function () {
        var _a = this.props, hasFetched = _a.hasFetched, 
        // navModel,
        plugins = _a.plugins, layoutMode = _a.layoutMode, setPluginsLayoutMode = _a.setPluginsLayoutMode, setPluginsSearchQuery = _a.setPluginsSearchQuery, searchQuery = _a.searchQuery;
        var linkButton = {
            href: 'https://grafana.com/plugins?utm_source=grafana_plugin_list',
            title: 'Find more plugins on Grafana.com',
        };
        return (React.createElement("div", null,
            React.createElement("div", { className: "plugin-container" },
                React.createElement(OrgActionBar, { searchQuery: searchQuery, layoutMode: layoutMode, onSetLayoutMode: function (mode) { return setPluginsLayoutMode(mode); }, setSearchQuery: function (query) { return setPluginsSearchQuery(query); }, linkButton: linkButton }),
                hasFetched ? (plugins && React.createElement(PluginList, { plugins: plugins, layoutMode: layoutMode })) : (React.createElement(PageLoader, { pageName: "Plugins" })))));
    };
    return PluginListPage;
}(PureComponent));
export { PluginListPage };
function mapStateToProps(state) {
    return {
        navModel: getNavModel(state.navIndex, 'plugins'),
        plugins: getPlugins(state.plugins),
        layoutMode: getLayoutMode(state.plugins),
        searchQuery: getPluginsSearchQuery(state.plugins),
        hasFetched: state.plugins.hasFetched,
    };
}
var mapDispatchToProps = {
    loadPlugins: loadPlugins,
    setPluginsLayoutMode: setPluginsLayoutMode,
    setPluginsSearchQuery: setPluginsSearchQuery,
};
export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(PluginListPage));
//# sourceMappingURL=PluginListPage.js.map