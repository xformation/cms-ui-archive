import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import appEvents from '../../app_events';
import { contextSrv } from 'app/core/services/context_srv';
import TopSection from './TopSection';
import BottomSection from './BottomSection';
var SideMenu = /** @class */ (function (_super) {
    tslib_1.__extends(SideMenu, _super);
    function SideMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toggleSideMenu = function () {
            contextSrv.toggleSideMenu();
            appEvents.emit('toggle-sidemenu');
        };
        _this.toggleSideMenuSmallBreakpoint = function () {
            appEvents.emit('toggle-sidemenu-mobile');
        };
        return _this;
    }
    SideMenu.prototype.render = function () {
        return [
            // <div className="sidemenu__logo" onClick={this.toggleSideMenu} key="logo">
            React.createElement("div", { className: "sidemenu__logo", key: "logo" },
                React.createElement("i", { className: "fa fa-university s-univ", "aria-hidden": "true" })),
            React.createElement("div", { className: "sidemenu__logo_small_breakpoint", onClick: this.toggleSideMenuSmallBreakpoint, key: "hamburger" },
                React.createElement("i", { className: "fa fa-bars" }),
                React.createElement("span", { className: "sidemenu__close" },
                    React.createElement("i", { className: "fa fa-times" }),
                    "\u00A0Close")),
            React.createElement(TopSection, { key: "topsection" }),
            React.createElement(BottomSection, { key: "bottomsection" }),
        ];
    };
    return SideMenu;
}(PureComponent));
export { SideMenu };
//# sourceMappingURL=SideMenu.js.map