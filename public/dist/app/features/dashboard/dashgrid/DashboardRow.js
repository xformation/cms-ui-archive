import * as tslib_1 from "tslib";
import React from 'react';
import classNames from 'classnames';
import templateSrv from 'app/features/templating/template_srv';
import appEvents from 'app/core/app_events';
var DashboardRow = /** @class */ (function (_super) {
    tslib_1.__extends(DashboardRow, _super);
    function DashboardRow(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            collapsed: _this.props.panel.collapsed,
        };
        _this.toggle = _this.toggle.bind(_this);
        _this.openSettings = _this.openSettings.bind(_this);
        _this.delete = _this.delete.bind(_this);
        _this.update = _this.update.bind(_this);
        return _this;
    }
    DashboardRow.prototype.toggle = function () {
        this.props.dashboard.toggleRow(this.props.panel);
        this.setState(function (prevState) {
            return { collapsed: !prevState.collapsed };
        });
    };
    DashboardRow.prototype.update = function () {
        this.props.dashboard.processRepeats();
        this.forceUpdate();
    };
    DashboardRow.prototype.openSettings = function () {
        appEvents.emit('show-modal', {
            templateHtml: "<row-options row=\"model.row\" on-updated=\"model.onUpdated()\" dismiss=\"dismiss()\"></row-options>",
            modalClass: 'modal--narrow',
            model: {
                row: this.props.panel,
                onUpdated: this.update.bind(this),
            },
        });
    };
    DashboardRow.prototype.delete = function () {
        var _this = this;
        appEvents.emit('confirm-modal', {
            title: 'Delete Row',
            text: 'Are you sure you want to remove this row and all its panels?',
            altActionText: 'Delete row only',
            icon: 'fa-trash',
            onConfirm: function () {
                _this.props.dashboard.removeRow(_this.props.panel, true);
            },
            onAltAction: function () {
                _this.props.dashboard.removeRow(_this.props.panel, false);
            },
        });
    };
    DashboardRow.prototype.render = function () {
        var classes = classNames({
            'dashboard-row': true,
            'dashboard-row--collapsed': this.state.collapsed,
        });
        var chevronClass = classNames({
            fa: true,
            'fa-chevron-down': !this.state.collapsed,
            'fa-chevron-right': this.state.collapsed,
        });
        var title = templateSrv.replaceWithText(this.props.panel.title, this.props.panel.scopedVars);
        var count = this.props.panel.panels ? this.props.panel.panels.length : 0;
        var panels = count === 1 ? 'panel' : 'panels';
        var canEdit = this.props.dashboard.meta.canEdit === true;
        return (React.createElement("div", { className: classes },
            React.createElement("a", { className: "dashboard-row__title pointer", onClick: this.toggle },
                React.createElement("i", { className: chevronClass }),
                title,
                React.createElement("span", { className: "dashboard-row__panel_count" },
                    "(",
                    count,
                    " ",
                    panels,
                    ")")),
            canEdit && (React.createElement("div", { className: "dashboard-row__actions" },
                React.createElement("a", { className: "pointer", onClick: this.openSettings },
                    React.createElement("i", { className: "fa fa-cog" })),
                React.createElement("a", { className: "pointer", onClick: this.delete },
                    React.createElement("i", { className: "fa fa-trash" })))),
            this.state.collapsed === true && (React.createElement("div", { className: "dashboard-row__toggle-target", onClick: this.toggle }, "\u00A0")),
            canEdit && React.createElement("div", { className: "dashboard-row__drag grid-drag-handle" })));
    };
    return DashboardRow;
}(React.Component));
export { DashboardRow };
//# sourceMappingURL=DashboardRow.js.map