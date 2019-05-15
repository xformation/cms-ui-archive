import * as tslib_1 from "tslib";
import React, { Component } from 'react';
var KeyboardNavigation = /** @class */ (function (_super) {
    tslib_1.__extends(KeyboardNavigation, _super);
    function KeyboardNavigation(props) {
        var _this = _super.call(this, props) || this;
        _this.goToNext = function (maxSelectedIndex) {
            var nextIndex = _this.state.selected >= maxSelectedIndex ? 0 : _this.state.selected + 1;
            _this.setState({
                selected: nextIndex,
            });
        };
        _this.goToPrev = function (maxSelectedIndex) {
            var nextIndex = _this.state.selected <= 0 ? maxSelectedIndex : _this.state.selected - 1;
            _this.setState({
                selected: nextIndex,
            });
        };
        _this.onKeyDown = function (evt, maxSelectedIndex, onEnterAction) {
            if (evt.key === 'ArrowDown') {
                evt.preventDefault();
                _this.goToNext(maxSelectedIndex);
            }
            if (evt.key === 'ArrowUp') {
                evt.preventDefault();
                _this.goToPrev(maxSelectedIndex);
            }
            if (evt.key === 'Enter' && onEnterAction) {
                onEnterAction();
            }
        };
        _this.onMouseEnter = function (mouseEnterIndex) {
            _this.setState({
                selected: mouseEnterIndex,
            });
        };
        _this.state = {
            selected: 0,
        };
        return _this;
    }
    KeyboardNavigation.prototype.render = function () {
        var injectProps = {
            onKeyDown: this.onKeyDown,
            onMouseEnter: this.onMouseEnter,
            selected: this.state.selected,
        };
        return React.createElement(React.Fragment, null, this.props.render(tslib_1.__assign({}, injectProps)));
    };
    return KeyboardNavigation;
}(Component));
export default KeyboardNavigation;
//# sourceMappingURL=KeyboardNavigation.js.map