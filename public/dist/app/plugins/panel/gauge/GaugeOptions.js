import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { Switch } from 'app/core/components/Switch/Switch';
import { Label } from '../../../core/components/Label/Label';
var GaugeOptions = /** @class */ (function (_super) {
    tslib_1.__extends(GaugeOptions, _super);
    function GaugeOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onToggleThresholdLabels = function () {
            return _this.props.onChange(tslib_1.__assign({}, _this.props.options, { showThresholdLabels: !_this.props.options.showThresholdLabels }));
        };
        _this.onToggleThresholdMarkers = function () {
            return _this.props.onChange(tslib_1.__assign({}, _this.props.options, { showThresholdMarkers: !_this.props.options.showThresholdMarkers }));
        };
        _this.onMinValueChange = function (_a) {
            var target = _a.target;
            return _this.props.onChange(tslib_1.__assign({}, _this.props.options, { minValue: target.value }));
        };
        _this.onMaxValueChange = function (_a) {
            var target = _a.target;
            return _this.props.onChange(tslib_1.__assign({}, _this.props.options, { maxValue: target.value }));
        };
        return _this;
    }
    GaugeOptions.prototype.render = function () {
        var _a = this.props.options, maxValue = _a.maxValue, minValue = _a.minValue, showThresholdLabels = _a.showThresholdLabels, showThresholdMarkers = _a.showThresholdMarkers;
        return (React.createElement("div", { className: "section gf-form-group" },
            React.createElement("h5", { className: "section-heading" }, "Gauge"),
            React.createElement("div", { className: "gf-form" },
                React.createElement(Label, { width: 8 }, "Min value"),
                React.createElement("input", { type: "text", className: "gf-form-input width-12", onChange: this.onMinValueChange, value: minValue })),
            React.createElement("div", { className: "gf-form" },
                React.createElement(Label, { width: 8 }, "Max value"),
                React.createElement("input", { type: "text", className: "gf-form-input width-12", onChange: this.onMaxValueChange, value: maxValue })),
            React.createElement(Switch, { label: "Show labels", labelClass: "width-8", checked: showThresholdLabels, onChange: this.onToggleThresholdLabels }),
            React.createElement(Switch, { label: "Show markers", labelClass: "width-8", checked: showThresholdMarkers, onChange: this.onToggleThresholdMarkers })));
    };
    return GaugeOptions;
}(PureComponent));
export default GaugeOptions;
//# sourceMappingURL=GaugeOptions.js.map