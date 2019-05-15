import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { Label } from 'app/core/components/Label/Label';
import { Select } from 'app/core/components/Select/Select';
import { MappingType } from 'app/types';
var mappingOptions = [
    { value: MappingType.ValueToText, label: 'Value' },
    { value: MappingType.RangeToText, label: 'Range' },
];
var MappingRow = /** @class */ (function (_super) {
    tslib_1.__extends(MappingRow, _super);
    function MappingRow(props) {
        var _this = _super.call(this, props) || this;
        _this.onMappingValueChange = function (event) {
            _this.setState({ value: event.target.value });
        };
        _this.onMappingFromChange = function (event) {
            _this.setState({ from: event.target.value });
        };
        _this.onMappingToChange = function (event) {
            _this.setState({ to: event.target.value });
        };
        _this.onMappingTextChange = function (event) {
            _this.setState({ text: event.target.value });
        };
        _this.onMappingTypeChange = function (mappingType) {
            _this.setState({ type: mappingType });
        };
        _this.updateMapping = function () {
            _this.props.updateMapping(tslib_1.__assign({}, _this.state));
        };
        _this.state = tslib_1.__assign({}, props.mapping);
        return _this;
    }
    MappingRow.prototype.renderRow = function () {
        var _a = this.state, from = _a.from, text = _a.text, to = _a.to, type = _a.type, value = _a.value;
        if (type === MappingType.RangeToText) {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "gf-form" },
                    React.createElement(Label, { width: 4 }, "From"),
                    React.createElement("input", { className: "gf-form-input width-8", value: from, onBlur: this.updateMapping, onChange: this.onMappingFromChange })),
                React.createElement("div", { className: "gf-form" },
                    React.createElement(Label, { width: 4 }, "To"),
                    React.createElement("input", { className: "gf-form-input width-8", value: to, onBlur: this.updateMapping, onChange: this.onMappingToChange })),
                React.createElement("div", { className: "gf-form" },
                    React.createElement(Label, { width: 4 }, "Text"),
                    React.createElement("input", { className: "gf-form-input width-10", value: text, onBlur: this.updateMapping, onChange: this.onMappingTextChange }))));
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "gf-form" },
                React.createElement(Label, { width: 4 }, "Value"),
                React.createElement("input", { className: "gf-form-input width-8", onBlur: this.updateMapping, onChange: this.onMappingValueChange, value: value })),
            React.createElement("div", { className: "gf-form gf-form--grow" },
                React.createElement(Label, { width: 4 }, "Text"),
                React.createElement("input", { className: "gf-form-input", onBlur: this.updateMapping, value: text, onChange: this.onMappingTextChange }))));
    };
    MappingRow.prototype.render = function () {
        var _this = this;
        var type = this.state.type;
        return (React.createElement("div", { className: "gf-form-inline" },
            React.createElement("div", { className: "gf-form" },
                React.createElement(Label, { width: 5 }, "Type"),
                React.createElement(Select, { placeholder: "Choose type", isSearchable: false, options: mappingOptions, value: mappingOptions.find(function (o) { return o.value === type; }), onChange: function (type) { return _this.onMappingTypeChange(type.value); }, width: 7 })),
            this.renderRow(),
            React.createElement("div", { className: "gf-form" },
                React.createElement("button", { onClick: this.props.removeMapping, className: "gf-form-label gf-form-label--btn" },
                    React.createElement("i", { className: "fa fa-times" })))));
    };
    return MappingRow;
}(PureComponent));
export default MappingRow;
//# sourceMappingURL=MappingRow.js.map