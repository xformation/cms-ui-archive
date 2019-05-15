import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { Label } from 'app/core/components/Label/Label';
import Select from 'app/core/components/Select/Select';
import UnitPicker from 'app/core/components/Select/UnitPicker';
var statOptions = [
    { value: 'min', label: 'Min' },
    { value: 'max', label: 'Max' },
    { value: 'avg', label: 'Average' },
    { value: 'current', label: 'Current' },
    { value: 'total', label: 'Total' },
    { value: 'name', label: 'Name' },
    { value: 'first', label: 'First' },
    { value: 'delta', label: 'Delta' },
    { value: 'diff', label: 'Difference' },
    { value: 'range', label: 'Range' },
    { value: 'last_time', label: 'Time of last point' },
];
var labelWidth = 6;
var ValueOptions = /** @class */ (function (_super) {
    tslib_1.__extends(ValueOptions, _super);
    function ValueOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onUnitChange = function (unit) { return _this.props.onChange(tslib_1.__assign({}, _this.props.options, { unit: unit.value })); };
        _this.onStatChange = function (stat) { return _this.props.onChange(tslib_1.__assign({}, _this.props.options, { stat: stat.value })); };
        _this.onDecimalChange = function (event) {
            if (!isNaN(event.target.value)) {
                _this.props.onChange(tslib_1.__assign({}, _this.props.options, { decimals: event.target.value }));
            }
        };
        _this.onPrefixChange = function (event) { return _this.props.onChange(tslib_1.__assign({}, _this.props.options, { prefix: event.target.value })); };
        _this.onSuffixChange = function (event) { return _this.props.onChange(tslib_1.__assign({}, _this.props.options, { suffix: event.target.value })); };
        return _this;
    }
    ValueOptions.prototype.render = function () {
        var _a = this.props.options, stat = _a.stat, unit = _a.unit, decimals = _a.decimals, prefix = _a.prefix, suffix = _a.suffix;
        return (React.createElement("div", { className: "section gf-form-group" },
            React.createElement("h5", { className: "section-heading" }, "Value"),
            React.createElement("div", { className: "gf-form" },
                React.createElement(Label, { width: labelWidth }, "Stat"),
                React.createElement(Select, { width: 12, options: statOptions, onChange: this.onStatChange, value: statOptions.find(function (option) { return option.value === stat; }) })),
            React.createElement("div", { className: "gf-form" },
                React.createElement(Label, { width: labelWidth }, "Unit"),
                React.createElement(UnitPicker, { defaultValue: unit, onChange: this.onUnitChange })),
            React.createElement("div", { className: "gf-form" },
                React.createElement(Label, { width: labelWidth }, "Decimals"),
                React.createElement("input", { className: "gf-form-input width-12", type: "number", placeholder: "auto", value: decimals || '', onChange: this.onDecimalChange })),
            React.createElement("div", { className: "gf-form" },
                React.createElement(Label, { width: labelWidth }, "Prefix"),
                React.createElement("input", { className: "gf-form-input width-12", type: "text", value: prefix || '', onChange: this.onPrefixChange })),
            React.createElement("div", { className: "gf-form" },
                React.createElement(Label, { width: labelWidth }, "Suffix"),
                React.createElement("input", { className: "gf-form-input width-12", type: "text", value: suffix || '', onChange: this.onSuffixChange }))));
    };
    return ValueOptions;
}(PureComponent));
export default ValueOptions;
//# sourceMappingURL=ValueOptions.js.map