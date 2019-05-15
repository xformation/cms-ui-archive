import * as tslib_1 from "tslib";
import React from 'react';
export default function withPopper(WrappedComponent) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1(props) {
            var _this = _super.call(this, props) || this;
            _this.showPopper = function () {
                _this.setState(function (prevState) { return (tslib_1.__assign({}, prevState, { show: true })); });
            };
            _this.hidePopper = function () {
                _this.setState(function (prevState) { return (tslib_1.__assign({}, prevState, { show: false })); });
            };
            _this.setState = _this.setState.bind(_this);
            _this.state = {
                placement: _this.props.placement || 'auto',
                show: false,
            };
            return _this;
        }
        class_1.prototype.componentWillReceiveProps = function (nextProps) {
            if (nextProps.placement && nextProps.placement !== this.state.placement) {
                this.setState(function (prevState) {
                    return tslib_1.__assign({}, prevState, { placement: nextProps.placement });
                });
            }
        };
        class_1.prototype.renderContent = function (content) {
            if (typeof content === 'function') {
                // If it's a function we assume it's a React component
                var ReactComponent = content;
                return React.createElement(ReactComponent, null);
            }
            return content;
        };
        class_1.prototype.render = function () {
            var _a = this.state, show = _a.show, placement = _a.placement;
            var className = this.props.className || '';
            return (React.createElement(WrappedComponent, tslib_1.__assign({}, this.props, { showPopper: this.showPopper, hidePopper: this.hidePopper, renderContent: this.renderContent, show: show, placement: placement, className: className })));
        };
        return class_1;
    }(React.Component));
}
//# sourceMappingURL=withPopper.js.map