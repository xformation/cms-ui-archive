import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import classNames from 'classnames';
import PanelHeaderCorner from './PanelHeaderCorner';
import { PanelHeaderMenu } from './PanelHeaderMenu';
import { ClickOutsideWrapper } from 'app/core/components/ClickOutsideWrapper/ClickOutsideWrapper';
var PanelHeader = /** @class */ (function (_super) {
    tslib_1.__extends(PanelHeader, _super);
    function PanelHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            panelMenuOpen: false,
        };
        _this.onMenuToggle = function (event) {
            event.stopPropagation();
            _this.setState(function (prevState) { return ({
                panelMenuOpen: !prevState.panelMenuOpen,
            }); });
        };
        _this.closeMenu = function () {
            _this.setState({
                panelMenuOpen: false,
            });
        };
        return _this;
    }
    PanelHeader.prototype.render = function () {
        var isFullscreen = false;
        var isLoading = false;
        var panelHeaderClass = classNames({ 'panel-header': true, 'grid-drag-handle': !isFullscreen });
        var _a = this.props, panel = _a.panel, dashboard = _a.dashboard, timeInfo = _a.timeInfo;
        return (React.createElement(React.Fragment, null,
            React.createElement(PanelHeaderCorner, { panel: panel, title: panel.title, description: panel.description, scopedVars: panel.scopedVars, links: panel.links }),
            React.createElement("div", { className: panelHeaderClass },
                isLoading && (React.createElement("span", { className: "panel-loading" },
                    React.createElement("i", { className: "fa fa-spinner fa-spin" }))),
                React.createElement("div", { className: "panel-title-container", onClick: this.onMenuToggle },
                    React.createElement("div", { className: "panel-title" },
                        React.createElement("span", { className: "icon-gf panel-alert-icon" }),
                        React.createElement("span", { className: "panel-title-text" },
                            panel.title,
                            " ",
                            React.createElement("span", { className: "fa fa-caret-down panel-menu-toggle" })),
                        this.state.panelMenuOpen && (React.createElement(ClickOutsideWrapper, { onClick: this.closeMenu },
                            React.createElement(PanelHeaderMenu, { panel: panel, dashboard: dashboard }))),
                        timeInfo && (React.createElement("span", { className: "panel-time-info" },
                            React.createElement("i", { className: "fa fa-clock-o" }),
                            " ",
                            timeInfo)))))));
    };
    return PanelHeader;
}(Component));
export { PanelHeader };
//# sourceMappingURL=PanelHeader.js.map