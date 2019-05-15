import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import config from 'app/core/config';
import classNames from 'classnames';
import { getAngularLoader } from 'app/core/services/AngularLoader';
import { importPluginModule } from 'app/features/plugins/plugin_loader';
import { AddPanelPanel } from './AddPanelPanel';
import { getPanelPluginNotFound } from './PanelPluginNotFound';
import { DashboardRow } from './DashboardRow';
import { PanelChrome } from './PanelChrome';
import { PanelEditor } from './PanelEditor';
var DashboardPanel = /** @class */ (function (_super) {
    tslib_1.__extends(DashboardPanel, _super);
    function DashboardPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.specialPanels = {};
        _this.onPluginTypeChanged = function (plugin) {
            _this.loadPlugin(plugin.id);
        };
        _this.onMouseEnter = function () {
            _this.props.dashboard.setPanelFocus(_this.props.panel.id);
        };
        _this.onMouseLeave = function () {
            _this.props.dashboard.setPanelFocus(0);
        };
        _this.state = {
            plugin: null,
            angularPanel: null,
        };
        _this.specialPanels['row'] = _this.renderRow.bind(_this);
        _this.specialPanels['add-panel'] = _this.renderAddPanel.bind(_this);
        return _this;
    }
    DashboardPanel.prototype.isSpecial = function (pluginId) {
        return this.specialPanels[pluginId];
    };
    DashboardPanel.prototype.renderRow = function () {
        return React.createElement(DashboardRow, { panel: this.props.panel, dashboard: this.props.dashboard });
    };
    DashboardPanel.prototype.renderAddPanel = function () {
        return React.createElement(AddPanelPanel, { panel: this.props.panel, dashboard: this.props.dashboard });
    };
    DashboardPanel.prototype.loadPlugin = function (pluginId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var panel, plugin, fromAngularPanel, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isSpecial(pluginId)) {
                            return [2 /*return*/];
                        }
                        panel = this.props.panel;
                        if (!(!this.state.plugin || this.state.plugin.id !== pluginId)) return [3 /*break*/, 3];
                        plugin = config.panels[pluginId] || getPanelPluginNotFound(pluginId);
                        fromAngularPanel = this.state.angularPanel != null;
                        // unmount angular panel
                        this.cleanUpAngularPanel();
                        if (panel.type !== pluginId) {
                            this.props.panel.changeType(pluginId, fromAngularPanel);
                        }
                        if (!plugin.exports) return [3 /*break*/, 1];
                        this.setState({ plugin: plugin, angularPanel: null });
                        return [3 /*break*/, 3];
                    case 1:
                        _a = plugin;
                        return [4 /*yield*/, importPluginModule(plugin.module)];
                    case 2:
                        _a.exports = _b.sent();
                        this.setState({ plugin: plugin, angularPanel: null });
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPanel.prototype.componentDidMount = function () {
        this.loadPlugin(this.props.panel.type);
    };
    DashboardPanel.prototype.componentDidUpdate = function () {
        if (!this.element || this.state.angularPanel) {
            return;
        }
        var loader = getAngularLoader();
        var template = '<plugin-component type="panel" class="panel-height-helper"></plugin-component>';
        var scopeProps = { panel: this.props.panel, dashboard: this.props.dashboard };
        var angularPanel = loader.load(this.element, scopeProps, template);
        this.setState({ angularPanel: angularPanel });
    };
    DashboardPanel.prototype.cleanUpAngularPanel = function () {
        if (this.state.angularPanel) {
            this.state.angularPanel.destroy();
            this.element = null;
        }
    };
    DashboardPanel.prototype.componentWillUnmount = function () {
        this.cleanUpAngularPanel();
    };
    DashboardPanel.prototype.renderReactPanel = function () {
        var _a = this.props, dashboard = _a.dashboard, panel = _a.panel;
        var plugin = this.state.plugin;
        return React.createElement(PanelChrome, { plugin: plugin, panel: panel, dashboard: dashboard });
    };
    DashboardPanel.prototype.renderAngularPanel = function () {
        var _this = this;
        return React.createElement("div", { ref: function (element) { return (_this.element = element); }, className: "panel-height-helper" });
    };
    DashboardPanel.prototype.render = function () {
        var _a = this.props, panel = _a.panel, dashboard = _a.dashboard, isFullscreen = _a.isFullscreen, isEditing = _a.isEditing;
        var _b = this.state, plugin = _b.plugin, angularPanel = _b.angularPanel;
        if (this.isSpecial(panel.type)) {
            return this.specialPanels[panel.type]();
        }
        // if we have not loaded plugin exports yet, wait
        if (!plugin || !plugin.exports) {
            return null;
        }
        var containerClass = classNames({ 'panel-editor-container': isEditing, 'panel-height-helper': !isEditing });
        var panelWrapperClass = classNames({
            'panel-wrapper': true,
            'panel-wrapper--edit': isEditing,
            'panel-wrapper--view': isFullscreen && !isEditing,
        });
        return (React.createElement("div", { className: containerClass },
            React.createElement("div", { className: panelWrapperClass, onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave },
                plugin.exports.Panel && this.renderReactPanel(),
                plugin.exports.PanelCtrl && this.renderAngularPanel()),
            panel.isEditing && (React.createElement(PanelEditor, { panel: panel, plugin: plugin, dashboard: dashboard, angularPanel: angularPanel, onTypeChanged: this.onPluginTypeChanged }))));
    };
    return DashboardPanel;
}(PureComponent));
export { DashboardPanel };
//# sourceMappingURL=DashboardPanel.js.map