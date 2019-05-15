import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { QueriesTab } from './QueriesTab';
import { VisualizationTab } from './VisualizationTab';
import { GeneralTab } from './GeneralTab';
import { AlertTab } from './AlertTab';
import config from 'app/core/config';
import { store } from 'app/store/store';
import { updateLocation } from 'app/core/actions';
import Tooltip from 'app/core/components/Tooltip/Tooltip';
var PanelEditor = /** @class */ (function (_super) {
    tslib_1.__extends(PanelEditor, _super);
    function PanelEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.onChangeTab = function (tab) {
            store.dispatch(updateLocation({
                query: { tab: tab.id },
                partial: true,
            }));
            _this.forceUpdate();
        };
        return _this;
    }
    PanelEditor.prototype.renderCurrentTab = function (activeTab) {
        var _a = this.props, panel = _a.panel, dashboard = _a.dashboard, onTypeChanged = _a.onTypeChanged, plugin = _a.plugin, angularPanel = _a.angularPanel;
        switch (activeTab) {
            case 'advanced':
                return React.createElement(GeneralTab, { panel: panel });
            case 'queries':
                return React.createElement(QueriesTab, { panel: panel, dashboard: dashboard });
            case 'alert':
                return React.createElement(AlertTab, { angularPanel: angularPanel });
            case 'visualization':
                return (React.createElement(VisualizationTab, { panel: panel, dashboard: dashboard, plugin: plugin, onTypeChanged: onTypeChanged, angularPanel: angularPanel }));
            default:
                return null;
        }
    };
    PanelEditor.prototype.render = function () {
        var _this = this;
        var plugin = this.props.plugin;
        var activeTab = store.getState().location.query.tab || 'queries';
        var tabs = [
            { id: 'queries', text: 'Queries' },
            { id: 'visualization', text: 'Visualization' },
            { id: 'advanced', text: 'Panel Options' },
        ];
        // handle panels that do not have queries tab
        if (plugin.exports.PanelCtrl) {
            if (!plugin.exports.PanelCtrl.prototype.onDataReceived) {
                // remove queries tab
                tabs.shift();
                // switch tab
                if (activeTab === 'queries') {
                    activeTab = 'visualization';
                }
            }
        }
        if (config.alertingEnabled && plugin.id === 'graph') {
            tabs.push({
                id: 'alert',
                text: 'Alert',
            });
        }
        return (React.createElement("div", { className: "panel-editor-container__editor" },
            React.createElement("div", { className: "panel-editor-tabs" }, tabs.map(function (tab) {
                return React.createElement(TabItem, { tab: tab, activeTab: activeTab, onClick: _this.onChangeTab, key: tab.id });
            })),
            React.createElement("div", { className: "panel-editor__right" }, this.renderCurrentTab(activeTab))));
    };
    return PanelEditor;
}(PureComponent));
export { PanelEditor };
function TabItem(_a) {
    var tab = _a.tab, activeTab = _a.activeTab, onClick = _a.onClick;
    var tabClasses = classNames({
        'panel-editor-tabs__link': true,
        active: activeTab === tab.id,
    });
    return (React.createElement("div", { className: "panel-editor-tabs__item", onClick: function () { return onClick(tab); } },
        React.createElement("a", { className: tabClasses },
            React.createElement(Tooltip, { content: "" + tab.text, className: "popper__manager--block", placement: "auto" },
                React.createElement("i", { className: "gicon gicon-" + tab.id + (activeTab === tab.id ? '-active' : '') })))));
}
//# sourceMappingURL=PanelEditor.js.map