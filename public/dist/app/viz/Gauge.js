import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import $ from 'jquery';
import { BasicGaugeColor, MappingType } from 'app/types';
import config from '../core/config';
import kbn from '../core/utils/kbn';
var Gauge = /** @class */ (function (_super) {
    tslib_1.__extends(Gauge, _super);
    function Gauge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Gauge.prototype.componentDidMount = function () {
        this.draw();
    };
    Gauge.prototype.componentDidUpdate = function () {
        this.draw();
    };
    Gauge.prototype.formatWithMappings = function (mappings, value) {
        var valueMaps = mappings.filter(function (m) { return m.type === MappingType.ValueToText; });
        var rangeMaps = mappings.filter(function (m) { return m.type === MappingType.RangeToText; });
        var valueMap = valueMaps.map(function (mapping) {
            if (mapping.value && value === mapping.value) {
                return mapping.text;
            }
        })[0];
        var rangeMap = rangeMaps.map(function (mapping) {
            if (mapping.from && mapping.to && value > mapping.from && value < mapping.to) {
                return mapping.text;
            }
        })[0];
        return {
            rangeMap: rangeMap,
            valueMap: valueMap,
        };
    };
    Gauge.prototype.formatValue = function (value) {
        var _a = this.props, decimals = _a.decimals, mappings = _a.mappings, prefix = _a.prefix, suffix = _a.suffix, unit = _a.unit;
        var formatFunc = kbn.valueFormats[unit];
        var formattedValue = formatFunc(value, decimals);
        if (mappings.length > 0) {
            var _b = this.formatWithMappings(mappings, formattedValue), rangeMap = _b.rangeMap, valueMap = _b.valueMap;
            if (valueMap) {
                return valueMap;
            }
            else if (rangeMap) {
                return rangeMap;
            }
        }
        if (isNaN(value)) {
            return '-';
        }
        return prefix + " " + formattedValue + " " + suffix;
    };
    Gauge.prototype.getFontColor = function (value) {
        var _a = this.props, baseColor = _a.baseColor, maxValue = _a.maxValue, thresholds = _a.thresholds;
        var atThreshold = thresholds.filter(function (threshold) { return value <= threshold.value; });
        if (atThreshold.length > 0) {
            return atThreshold[0].color;
        }
        else if (value <= maxValue) {
            return BasicGaugeColor.Red;
        }
        return baseColor;
    };
    Gauge.prototype.draw = function () {
        var _this = this;
        var _a = this.props, baseColor = _a.baseColor, maxValue = _a.maxValue, minValue = _a.minValue, timeSeries = _a.timeSeries, showThresholdLabels = _a.showThresholdLabels, showThresholdMarkers = _a.showThresholdMarkers, thresholds = _a.thresholds, width = _a.width, height = _a.height, stat = _a.stat;
        var value = '';
        if (timeSeries[0]) {
            value = timeSeries[0].stats[stat];
        }
        else {
            value = 'N/A';
        }
        var dimension = Math.min(width, height * 1.3);
        var backgroundColor = config.bootData.user.lightTheme ? 'rgb(230,230,230)' : 'rgb(38,38,38)';
        var fontScale = parseInt('80', 10) / 100;
        var fontSize = Math.min(dimension / 5, 100) * fontScale;
        var gaugeWidthReduceRatio = showThresholdLabels ? 1.5 : 1;
        var gaugeWidth = Math.min(dimension / 6, 60) / gaugeWidthReduceRatio;
        var thresholdMarkersWidth = gaugeWidth / 5;
        var thresholdLabelFontSize = fontSize / 2.5;
        var formattedThresholds = [
            { value: minValue, color: BasicGaugeColor.Green }
        ].concat(thresholds.map(function (threshold, index) {
            return {
                value: threshold.value,
                color: index === 0 ? threshold.color : thresholds[index].color,
            };
        }), [
            {
                value: maxValue,
                color: thresholds.length > 0 ? BasicGaugeColor.Red : baseColor,
            },
        ]);
        var options = {
            series: {
                gauges: {
                    gauge: {
                        min: minValue,
                        max: maxValue,
                        background: { color: backgroundColor },
                        border: { color: null },
                        shadow: { show: false },
                        width: gaugeWidth,
                    },
                    frame: { show: false },
                    label: { show: false },
                    layout: { margin: 0, thresholdWidth: 0 },
                    cell: { border: { width: 0 } },
                    threshold: {
                        values: formattedThresholds,
                        label: {
                            show: showThresholdLabels,
                            margin: thresholdMarkersWidth + 1,
                            font: { size: thresholdLabelFontSize },
                        },
                        show: showThresholdMarkers,
                        width: thresholdMarkersWidth,
                    },
                    value: {
                        color: this.getFontColor(value),
                        formatter: function () {
                            return _this.formatValue(value);
                        },
                        font: {
                            size: fontSize,
                            family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        },
                    },
                    show: true,
                },
            },
        };
        var plotSeries = {
            data: [[0, value]],
        };
        try {
            $.plot(this.canvasElement, [plotSeries], options);
        }
        catch (err) {
            console.log('Gauge rendering error', err, options, timeSeries);
        }
    };
    Gauge.prototype.render = function () {
        var _this = this;
        var _a = this.props, height = _a.height, width = _a.width;
        return (React.createElement("div", { className: "singlestat-panel" },
            React.createElement("div", { style: {
                    height: height * 0.9 + "px",
                    width: Math.min(width, height * 1.3) + "px",
                    top: '10px',
                    margin: 'auto',
                }, ref: function (element) { return (_this.canvasElement = element); } })));
    };
    Gauge.defaultProps = {
        baseColor: BasicGaugeColor.Green,
        maxValue: 100,
        mappings: [],
        minValue: 0,
        prefix: '',
        showThresholdMarkers: true,
        showThresholdLabels: false,
        suffix: '',
        thresholds: [],
        unit: 'none',
        stat: 'avg',
    };
    return Gauge;
}(PureComponent));
export { Gauge };
export default Gauge;
//# sourceMappingURL=Gauge.js.map