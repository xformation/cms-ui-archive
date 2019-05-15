import * as tslib_1 from "tslib";
// Libraries
import React, { PureComponent } from 'react';
import { AutoSizer } from 'react-virtualized';
// Services
import { getTimeSrv } from '../time_srv';
// Components
import { PanelHeader } from './PanelHeader/PanelHeader';
import { DataPanel } from './DataPanel';
// Utils
import { applyPanelTimeOverrides } from 'app/features/dashboard/utils/panel';
import { PANEL_HEADER_HEIGHT } from 'app/core/constants';
var PanelChrome = /** @class */ (function (_super) {
    tslib_1.__extends(PanelChrome, _super);
    function PanelChrome(props) {
        var _this = _super.call(this, props) || this;
        _this.timeSrv = getTimeSrv();
        _this.onRefresh = function () {
            console.log('onRefresh');
            if (!_this.isVisible) {
                return;
            }
            var panel = _this.props.panel;
            var timeData = applyPanelTimeOverrides(panel, _this.timeSrv.timeRange());
            _this.setState({
                refreshCounter: _this.state.refreshCounter + 1,
                timeRange: timeData.timeRange,
                timeInfo: timeData.timeInfo,
            });
        };
        _this.onRender = function () {
            _this.setState({
                renderCounter: _this.state.renderCounter + 1,
            });
        };
        _this.state = {
            refreshCounter: 0,
            renderCounter: 0,
        };
        return _this;
    }
    PanelChrome.prototype.componentDidMount = function () {
        this.props.panel.events.on('refresh', this.onRefresh);
        this.props.panel.events.on('render', this.onRender);
        this.props.dashboard.panelInitialized(this.props.panel);
    };
    PanelChrome.prototype.componentWillUnmount = function () {
        this.props.panel.events.off('refresh', this.onRefresh);
    };
    Object.defineProperty(PanelChrome.prototype, "isVisible", {
        get: function () {
            return !this.props.dashboard.otherPanelInFullscreen(this.props.panel);
        },
        enumerable: true,
        configurable: true
    });
    PanelChrome.prototype.render = function () {
        var _this = this;
        var _a = this.props, panel = _a.panel, dashboard = _a.dashboard, plugin = _a.plugin;
        var _b = this.state, refreshCounter = _b.refreshCounter, timeRange = _b.timeRange, timeInfo = _b.timeInfo, renderCounter = _b.renderCounter;
        var datasource = panel.datasource, targets = panel.targets, transparent = panel.transparent;
        var PanelComponent = plugin.exports.Panel;
        var containerClassNames = "panel-container panel-container--absolute " + (transparent ? 'panel-transparent' : '');
        return (React.createElement(AutoSizer, null, function (_a) {
            var width = _a.width, height = _a.height;
            if (width === 0) {
                return null;
            }
            return (React.createElement("div", { className: containerClassNames },
                React.createElement(PanelHeader, { panel: panel, dashboard: dashboard, timeInfo: timeInfo, title: panel.title, description: panel.description, scopedVars: panel.scopedVars, links: panel.links }),
                React.createElement(DataPanel, { datasource: datasource, queries: targets, timeRange: timeRange, isVisible: _this.isVisible, widthPixels: width, refreshCounter: refreshCounter }, function (_a) {
                    var loading = _a.loading, timeSeries = _a.timeSeries;
                    return (React.createElement("div", { className: "panel-content" },
                        React.createElement(PanelComponent, { loading: loading, timeSeries: timeSeries, timeRange: timeRange, options: panel.getOptions(plugin.exports.PanelDefaults), width: width, height: height - PANEL_HEADER_HEIGHT, renderCounter: renderCounter })));
                })));
        }));
    };
    return PanelChrome;
}(PureComponent));
export { PanelChrome };
//# sourceMappingURL=PanelChrome.js.map