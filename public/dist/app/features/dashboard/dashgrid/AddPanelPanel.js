import * as tslib_1 from "tslib";
import React from 'react';
import _ from 'lodash';
import config from 'app/core/config';
import store from 'app/core/store';
import { LS_PANEL_COPY_KEY } from 'app/core/constants';
import { updateLocation } from 'app/core/actions';
import { store as reduxStore } from 'app/store/store';
var AddPanelPanel = /** @class */ (function (_super) {
    tslib_1.__extends(AddPanelPanel, _super);
    function AddPanelPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.onCreateNewPanel = function () {
            var dashboard = _this.props.dashboard;
            var gridPos = _this.props.panel.gridPos;
            var newPanel = {
                type: 'graph',
                title: 'Panel Title',
                gridPos: { x: gridPos.x, y: gridPos.y, w: gridPos.w, h: gridPos.h },
            };
            dashboard.addPanel(newPanel);
            dashboard.removePanel(_this.props.panel);
            _this.moveToEdit(newPanel);
        };
        _this.onPasteCopiedPanel = function (panelPluginInfo) {
            var dashboard = _this.props.dashboard;
            var gridPos = _this.props.panel.gridPos;
            var newPanel = {
                type: panelPluginInfo.id,
                title: 'Panel Title',
                gridPos: { x: gridPos.x, y: gridPos.y, w: gridPos.w, h: gridPos.h },
            };
            // apply panel template / defaults
            if (panelPluginInfo.defaults) {
                _.defaults(newPanel, panelPluginInfo.defaults);
                newPanel.title = panelPluginInfo.defaults.title;
                store.delete(LS_PANEL_COPY_KEY);
            }
            dashboard.addPanel(newPanel);
            dashboard.removePanel(_this.props.panel);
        };
        _this.onCreateNewRow = function () {
            var dashboard = _this.props.dashboard;
            var newRow = {
                type: 'row',
                title: 'Row title',
                gridPos: { x: 0, y: 0 },
            };
            dashboard.addPanel(newRow);
            dashboard.removePanel(_this.props.panel);
        };
        _this.handleCloseAddPanel = _this.handleCloseAddPanel.bind(_this);
        _this.state = {
            copiedPanelPlugins: _this.getCopiedPanelPlugins(),
        };
        return _this;
    }
    AddPanelPanel.prototype.getCopiedPanelPlugins = function () {
        var panels = _.chain(config.panels)
            .filter({ hideFromList: false })
            .map(function (item) { return item; })
            .value();
        var copiedPanels = [];
        var copiedPanelJson = store.get(LS_PANEL_COPY_KEY);
        if (copiedPanelJson) {
            var copiedPanel = JSON.parse(copiedPanelJson);
            var pluginInfo = _.find(panels, { id: copiedPanel.type });
            if (pluginInfo) {
                var pluginCopy = _.cloneDeep(pluginInfo);
                pluginCopy.name = copiedPanel.title;
                pluginCopy.sort = -1;
                pluginCopy.defaults = copiedPanel;
                copiedPanels.push(pluginCopy);
            }
        }
        return _.sortBy(copiedPanels, 'sort');
    };
    AddPanelPanel.prototype.handleCloseAddPanel = function (evt) {
        evt.preventDefault();
        this.props.dashboard.removePanel(this.props.dashboard.panels[0]);
    };
    AddPanelPanel.prototype.copyButton = function (panel) {
        var _this = this;
        return (React.createElement("button", { className: "btn-inverse btn", onClick: function () { return _this.onPasteCopiedPanel(panel); }, title: panel.name }, "Paste copied Panel"));
    };
    AddPanelPanel.prototype.moveToEdit = function (panel) {
        reduxStore.dispatch(updateLocation({
            query: {
                panelId: panel.id,
                edit: true,
                fullscreen: true,
            },
            partial: true,
        }));
    };
    AddPanelPanel.prototype.render = function () {
        var addCopyButton;
        if (this.state.copiedPanelPlugins.length === 1) {
            addCopyButton = this.copyButton(this.state.copiedPanelPlugins[0]);
        }
        return (React.createElement("div", { className: "panel-container add-panel-container" },
            React.createElement("div", { className: "add-panel" },
                React.createElement("div", { className: "add-panel__header grid-drag-handle" },
                    React.createElement("i", { className: "gicon gicon-add-panel" }),
                    React.createElement("button", { className: "add-panel__close", onClick: this.handleCloseAddPanel },
                        React.createElement("i", { className: "fa fa-close" }))),
                React.createElement("div", { className: "add-panel-btn-container" },
                    React.createElement("button", { className: "btn-success btn btn-large", onClick: this.onCreateNewPanel }, "Edit Panel"),
                    addCopyButton,
                    React.createElement("button", { className: "btn-inverse btn", onClick: this.onCreateNewRow }, "Add Row")))));
    };
    return AddPanelPanel;
}(React.Component));
export { AddPanelPanel };
//# sourceMappingURL=AddPanelPanel.js.map