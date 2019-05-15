import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import tinycolor from 'tinycolor2';
import { ColorPicker } from 'app/core/components/colorpicker/ColorPicker';
import { BasicGaugeColor } from 'app/types';
var Thresholds = /** @class */ (function (_super) {
    tslib_1.__extends(Thresholds, _super);
    function Thresholds(props) {
        var _this = _super.call(this, props) || this;
        _this.onAddThreshold = function (index) {
            var _a = _this.props.options, maxValue = _a.maxValue, minValue = _a.minValue;
            var thresholds = _this.state.thresholds;
            var newThresholds = thresholds.map(function (threshold) {
                if (threshold.index >= index) {
                    threshold = tslib_1.__assign({}, threshold, { index: threshold.index + 1 });
                }
                return threshold;
            });
            // Setting value to a value between the previous thresholds
            var value;
            if (index === 0 && thresholds.length === 0) {
                value = maxValue - (maxValue - minValue) / 2;
            }
            else if (index === 0 && thresholds.length > 0) {
                value = newThresholds[index + 1].value - (newThresholds[index + 1].value - minValue) / 2;
            }
            else if (index > newThresholds[newThresholds.length - 1].index) {
                value = maxValue - (maxValue - newThresholds[index - 1].value) / 2;
            }
            // Set a color that lies between the previous thresholds
            var color;
            if (index === 0 && thresholds.length === 0) {
                color = tinycolor.mix(BasicGaugeColor.Green, BasicGaugeColor.Red, 50).toRgbString();
            }
            else {
                color = tinycolor.mix(thresholds[index - 1].color, BasicGaugeColor.Red, 50).toRgbString();
            }
            _this.setState({
                thresholds: _this.sortThresholds(newThresholds.concat([{ index: index, value: value, color: color }])),
            }, function () { return _this.updateGauge(); });
        };
        _this.onRemoveThreshold = function (threshold) {
            _this.setState(function (prevState) { return ({
                thresholds: prevState.thresholds.filter(function (t) { return t !== threshold; }),
            }); }, function () { return _this.updateGauge(); });
        };
        _this.onChangeThresholdValue = function (event, threshold) {
            var thresholds = _this.state.thresholds;
            var newThresholds = thresholds.map(function (t) {
                if (t === threshold) {
                    t = tslib_1.__assign({}, t, { value: event.target.value });
                }
                return t;
            });
            _this.setState({
                thresholds: newThresholds,
            });
        };
        _this.onChangeThresholdColor = function (threshold, color) {
            var thresholds = _this.state.thresholds;
            var newThresholds = thresholds.map(function (t) {
                if (t === threshold) {
                    t = tslib_1.__assign({}, t, { color: color });
                }
                return t;
            });
            _this.setState({
                thresholds: newThresholds,
            }, function () { return _this.updateGauge(); });
        };
        _this.onChangeBaseColor = function (color) { return _this.props.onChange(tslib_1.__assign({}, _this.props.options, { baseColor: color })); };
        _this.onBlur = function () {
            _this.setState(function (prevState) { return ({
                thresholds: _this.sortThresholds(prevState.thresholds),
            }); });
            _this.updateGauge();
        };
        _this.updateGauge = function () {
            _this.props.onChange(tslib_1.__assign({}, _this.props.options, { thresholds: _this.state.thresholds }));
        };
        _this.sortThresholds = function (thresholds) {
            return thresholds.sort(function (t1, t2) {
                return t2.value - t1.value;
            });
        };
        _this.state = {
            thresholds: props.options.thresholds,
            baseColor: props.options.baseColor,
        };
        return _this;
    }
    Thresholds.prototype.renderThresholds = function () {
        var _this = this;
        var thresholds = this.state.thresholds;
        return thresholds.map(function (threshold, index) {
            return (React.createElement("div", { className: "threshold-row", key: threshold.index + "-" + index },
                React.createElement("div", { className: "threshold-row-inner" },
                    React.createElement("div", { className: "threshold-row-color" }, threshold.color && (React.createElement("div", { className: "threshold-row-color-inner" },
                        React.createElement(ColorPicker, { color: threshold.color, onChange: function (color) { return _this.onChangeThresholdColor(threshold, color); } })))),
                    React.createElement("input", { className: "threshold-row-input", type: "text", onChange: function (event) { return _this.onChangeThresholdValue(event, threshold); }, value: threshold.value, onBlur: _this.onBlur }),
                    React.createElement("div", { onClick: function () { return _this.onRemoveThreshold(threshold); }, className: "threshold-row-remove" },
                        React.createElement("i", { className: "fa fa-times" })))));
        });
    };
    Thresholds.prototype.renderIndicator = function () {
        var _this = this;
        var thresholds = this.state.thresholds;
        return thresholds.map(function (t, i) {
            return (React.createElement("div", { key: t.value + "-" + i, className: "indicator-section" },
                React.createElement("div", { onClick: function () { return _this.onAddThreshold(t.index + 1); }, style: {
                        height: '50%',
                        backgroundColor: t.color,
                    } }),
                React.createElement("div", { onClick: function () { return _this.onAddThreshold(t.index); }, style: {
                        height: '50%',
                        backgroundColor: t.color,
                    } })));
        });
    };
    Thresholds.prototype.renderBaseIndicator = function () {
        var _this = this;
        return (React.createElement("div", { className: "indicator-section", style: { height: '100%' } },
            React.createElement("div", { onClick: function () { return _this.onAddThreshold(0); }, style: { height: '100%', backgroundColor: this.props.options.baseColor } })));
    };
    Thresholds.prototype.renderBase = function () {
        var _this = this;
        var baseColor = this.props.options.baseColor;
        return (React.createElement("div", { className: "threshold-row threshold-row-base" },
            React.createElement("div", { className: "threshold-row-inner threshold-row-inner--base" },
                React.createElement("div", { className: "threshold-row-color" },
                    React.createElement("div", { className: "threshold-row-color-inner" },
                        React.createElement(ColorPicker, { color: baseColor, onChange: function (color) { return _this.onChangeBaseColor(color); } }))),
                React.createElement("div", { className: "threshold-row-label" }, "Base"))));
    };
    Thresholds.prototype.render = function () {
        return (React.createElement("div", { className: "section gf-form-group" },
            React.createElement("h5", { className: "section-heading" }, "Thresholds"),
            React.createElement("div", { className: "thresholds" },
                React.createElement("div", { className: "color-indicators" },
                    this.renderIndicator(),
                    this.renderBaseIndicator()),
                React.createElement("div", { className: "threshold-rows" },
                    this.renderThresholds(),
                    this.renderBase()))));
    };
    return Thresholds;
}(PureComponent));
export default Thresholds;
//# sourceMappingURL=Thresholds.js.map