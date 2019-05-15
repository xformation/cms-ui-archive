import * as tslib_1 from "tslib";
import React from 'react';
import baron from 'baron';
var ScrollBar = /** @class */ (function (_super) {
    tslib_1.__extends(ScrollBar, _super);
    function ScrollBar(props) {
        var _this = _super.call(this, props) || this;
        _this.handleRef = function (ref) {
            _this.container = ref;
        };
        return _this;
    }
    ScrollBar.prototype.componentDidMount = function () {
        this.scrollbar = baron({
            root: this.container.parentElement,
            scroller: this.container,
            bar: '.baron__bar',
            barOnCls: '_scrollbar',
            scrollingCls: '_scrolling',
            track: '.baron__track',
        });
    };
    ScrollBar.prototype.componentDidUpdate = function () {
        this.scrollbar.update();
    };
    ScrollBar.prototype.componentWillUnmount = function () {
        this.scrollbar.dispose();
    };
    // methods can be invoked by outside
    ScrollBar.prototype.setScrollTop = function (top) {
        if (this.container) {
            this.container.scrollTop = top;
            this.scrollbar.update();
            return true;
        }
        return false;
    };
    ScrollBar.prototype.setScrollLeft = function (left) {
        if (this.container) {
            this.container.scrollLeft = left;
            this.scrollbar.update();
            return true;
        }
        return false;
    };
    ScrollBar.prototype.update = function () {
        this.scrollbar.update();
    };
    ScrollBar.prototype.render = function () {
        return (React.createElement("div", { className: "baron baron__root baron__clipper" },
            React.createElement("div", { className: this.props.className + ' baron__scroller', ref: this.handleRef }, this.props.children),
            React.createElement("div", { className: "baron__track" },
                React.createElement("div", { className: "baron__bar" }))));
    };
    return ScrollBar;
}(React.Component));
export default ScrollBar;
//# sourceMappingURL=ScrollBar.js.map