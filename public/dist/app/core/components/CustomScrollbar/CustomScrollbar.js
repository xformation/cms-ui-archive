import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import Scrollbars from 'react-custom-scrollbars';
/**
 * Wraps component into <Scrollbars> component from `react-custom-scrollbars`
 */
var CustomScrollbar = /** @class */ (function (_super) {
    tslib_1.__extends(CustomScrollbar, _super);
    function CustomScrollbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomScrollbar.prototype.render = function () {
        var _a = this.props, customClassName = _a.customClassName, children = _a.children, scrollProps = tslib_1.__rest(_a, ["customClassName", "children"]);
        return (React.createElement(Scrollbars, tslib_1.__assign({ className: customClassName, autoHeight: true, autoHeightMin: 'inherit', autoHeightMax: 'inherit', renderTrackHorizontal: function (props) { return React.createElement("div", tslib_1.__assign({}, props, { className: "track-horizontal" })); }, renderTrackVertical: function (props) { return React.createElement("div", tslib_1.__assign({}, props, { className: "track-vertical" })); }, renderThumbHorizontal: function (props) { return React.createElement("div", tslib_1.__assign({}, props, { className: "thumb-horizontal" })); }, renderThumbVertical: function (props) { return React.createElement("div", tslib_1.__assign({}, props, { className: "thumb-vertical" })); }, renderView: function (props) { return React.createElement("div", tslib_1.__assign({}, props, { className: "view" })); } }, scrollProps), children));
    };
    CustomScrollbar.defaultProps = {
        customClassName: 'custom-scrollbars',
        autoHide: true,
        autoHideTimeout: 200,
        autoHideDuration: 200,
        hideTracksWhenNotNeeded: false,
    };
    return CustomScrollbar;
}(PureComponent));
export default CustomScrollbar;
//# sourceMappingURL=CustomScrollbar.js.map