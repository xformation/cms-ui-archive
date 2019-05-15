import * as tslib_1 from "tslib";
import React, { Component } from 'react';
var AppNotificationItem = /** @class */ (function (_super) {
    tslib_1.__extends(AppNotificationItem, _super);
    function AppNotificationItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppNotificationItem.prototype.shouldComponentUpdate = function (nextProps) {
        return this.props.appNotification.id !== nextProps.appNotification.id;
    };
    AppNotificationItem.prototype.componentDidMount = function () {
        var _a = this.props, appNotification = _a.appNotification, onClearNotification = _a.onClearNotification;
        setTimeout(function () {
            onClearNotification(appNotification.id);
        }, appNotification.timeout);
    };
    AppNotificationItem.prototype.render = function () {
        var _a = this.props, appNotification = _a.appNotification, onClearNotification = _a.onClearNotification;
        return (React.createElement("div", { className: "alert-" + appNotification.severity + " alert" },
            React.createElement("div", { className: "alert-icon" },
                React.createElement("i", { className: appNotification.icon })),
            React.createElement("div", { className: "alert-body" },
                React.createElement("div", { className: "alert-title" }, appNotification.title),
                React.createElement("div", { className: "alert-text" }, appNotification.text)),
            React.createElement("button", { type: "button", className: "alert-close", onClick: function () { return onClearNotification(appNotification.id); } },
                React.createElement("i", { className: "fa fa fa-remove" }))));
    };
    return AppNotificationItem;
}(Component));
export default AppNotificationItem;
//# sourceMappingURL=AppNotificationItem.js.map