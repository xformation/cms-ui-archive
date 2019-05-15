import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
var OptionGroup = /** @class */ (function (_super) {
    tslib_1.__extends(OptionGroup, _super);
    function OptionGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            expanded: false,
        };
        _this.onToggleChildren = function () {
            _this.setState(function (prevState) { return ({
                expanded: !prevState.expanded,
            }); });
        };
        return _this;
    }
    OptionGroup.prototype.componentDidMount = function () {
        if (this.props.selectProps) {
            var value_1 = this.props.selectProps.value[this.props.selectProps.value.length - 1];
            if (value_1 && this.props.options.some(function (option) { return option.value === value_1; })) {
                this.setState({ expanded: true });
            }
        }
    };
    OptionGroup.prototype.componentDidUpdate = function (nextProps) {
        if (nextProps.selectProps.inputValue !== '') {
            this.setState({ expanded: true });
        }
    };
    OptionGroup.prototype.render = function () {
        var _a = this.props, children = _a.children, label = _a.label;
        var expanded = this.state.expanded;
        return (React.createElement("div", { className: "gf-form-select-box__option-group" },
            React.createElement("div", { className: "gf-form-select-box__option-group__header", onClick: this.onToggleChildren },
                React.createElement("span", { className: "flex-grow" }, label),
                React.createElement("i", { className: "fa " + (expanded ? 'fa-caret-left' : 'fa-caret-down') }),
                ' '),
            expanded && children));
    };
    return OptionGroup;
}(PureComponent));
export default OptionGroup;
//# sourceMappingURL=OptionGroup.js.map