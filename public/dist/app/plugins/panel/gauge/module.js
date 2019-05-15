import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import Gauge from 'app/viz/Gauge';
import { getTimeSeriesVMs } from 'app/viz/state/timeSeries';
import ValueOptions from './ValueOptions';
import GaugeOptions from './GaugeOptions';
import Thresholds from './Thresholds';
import ValueMappings from './ValueMappings';
import { BasicGaugeColor, NullValueMode, } from 'app/types';
export var defaultProps = {
    options: {
        baseColor: BasicGaugeColor.Green,
        minValue: 0,
        maxValue: 100,
        prefix: '',
        showThresholdMarkers: true,
        showThresholdLabels: false,
        suffix: '',
        decimals: 0,
        stat: '',
        unit: '',
        mappings: [],
        thresholds: [],
    },
};
var GaugePanel = /** @class */ (function (_super) {
    tslib_1.__extends(GaugePanel, _super);
    function GaugePanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GaugePanel.prototype.render = function () {
        var _a = this.props, timeSeries = _a.timeSeries, width = _a.width, height = _a.height;
        var vmSeries = getTimeSeriesVMs({
            timeSeries: timeSeries,
            nullValueMode: NullValueMode.Ignore,
        });
        return React.createElement(Gauge, tslib_1.__assign({ timeSeries: vmSeries }, this.props.options, { width: width, height: height }));
    };
    return GaugePanel;
}(PureComponent));
var Options = /** @class */ (function (_super) {
    tslib_1.__extends(Options, _super);
    function Options() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Options.prototype.render = function () {
        var _a = this.props, onChange = _a.onChange, options = _a.options;
        return (React.createElement("div", null,
            React.createElement("div", { className: "form-section" },
                React.createElement(ValueOptions, { onChange: onChange, options: options }),
                React.createElement(GaugeOptions, { onChange: onChange, options: options }),
                React.createElement(Thresholds, { onChange: onChange, options: options })),
            React.createElement("div", { className: "form-section" },
                React.createElement(ValueMappings, { onChange: onChange, options: options }))));
    };
    Options.defaultProps = defaultProps;
    return Options;
}(PureComponent));
export { GaugePanel as Panel, Options as PanelOptions, defaultProps as PanelDefaults };
//# sourceMappingURL=module.js.map