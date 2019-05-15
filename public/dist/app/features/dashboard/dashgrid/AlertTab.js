import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { getAngularLoader } from 'app/core/services/AngularLoader';
import { EditorTabBody } from './EditorTabBody';
import 'app/features/alerting/AlertTabCtrl';
var AlertTab = /** @class */ (function (_super) {
    tslib_1.__extends(AlertTab, _super);
    function AlertTab(props) {
        return _super.call(this, props) || this;
    }
    AlertTab.prototype.componentDidMount = function () {
        if (this.shouldLoadAlertTab()) {
            this.loadAlertTab();
        }
    };
    AlertTab.prototype.componentDidUpdate = function (prevProps) {
        if (this.shouldLoadAlertTab()) {
            this.loadAlertTab();
        }
    };
    AlertTab.prototype.shouldLoadAlertTab = function () {
        return this.props.angularPanel && this.element;
    };
    AlertTab.prototype.componentWillUnmount = function () {
        if (this.component) {
            this.component.destroy();
        }
    };
    AlertTab.prototype.loadAlertTab = function () {
        var _this = this;
        var angularPanel = this.props.angularPanel;
        var scope = angularPanel.getScope();
        // When full page reloading in edit mode the angular panel has on fully compiled & instantiated yet
        if (!scope.$$childHead) {
            setTimeout(function () {
                _this.forceUpdate();
            });
            return;
        }
        var panelCtrl = scope.$$childHead.ctrl;
        var loader = getAngularLoader();
        var template = '<alert-tab />';
        var scopeProps = {
            ctrl: panelCtrl,
        };
        this.component = loader.load(this.element, scopeProps, template);
    };
    AlertTab.prototype.render = function () {
        var _this = this;
        return (React.createElement(EditorTabBody, { heading: "Alert", toolbarItems: [] },
            React.createElement("div", { ref: function (element) { return (_this.element = element); } })));
    };
    return AlertTab;
}(PureComponent));
export { AlertTab };
//# sourceMappingURL=AlertTab.js.map