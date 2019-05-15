import * as tslib_1 from "tslib";
var _a;
// Libraries
import React, { PureComponent } from 'react';
// Utils
import { isValidTimeSpan } from 'app/core/utils/rangeutil';
// Components
import { Switch } from 'app/core/components/Switch/Switch';
import { Input } from 'app/core/components/Form';
import { EventsWithValidation } from 'app/core/components/Form/Input';
import { InputStatus } from 'app/core/components/Form/Input';
import DataSourceOption from './DataSourceOption';
var timeRangeValidationEvents = (_a = {},
    _a[EventsWithValidation.onBlur] = [
        {
            rule: function (value) {
                if (!value) {
                    return true;
                }
                return isValidTimeSpan(value);
            },
            errorMessage: 'Not a valid timespan',
        },
    ],
    _a);
var emptyToNull = function (value) {
    return value === '' ? null : value;
};
var QueryOptions = /** @class */ (function (_super) {
    tslib_1.__extends(QueryOptions, _super);
    function QueryOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onOverrideTime = function (evt, status) {
            var value = evt.target.value;
            var panel = _this.props.panel;
            var emptyToNullValue = emptyToNull(value);
            if (status === InputStatus.Valid && panel.timeFrom !== emptyToNullValue) {
                panel.timeFrom = emptyToNullValue;
                panel.refresh();
            }
        };
        _this.onTimeShift = function (evt, status) {
            var value = evt.target.value;
            var panel = _this.props.panel;
            var emptyToNullValue = emptyToNull(value);
            if (status === InputStatus.Valid && panel.timeShift !== emptyToNullValue) {
                panel.timeShift = emptyToNullValue;
                panel.refresh();
            }
        };
        _this.onToggleTimeOverride = function () {
            var panel = _this.props.panel;
            panel.hideTimeOverride = !panel.hideTimeOverride;
            panel.refresh();
        };
        _this.render = function () {
            var hideTimeOverride = _this.props.panel.hideTimeOverride;
            return (React.createElement("div", { className: "gf-form-inline" },
                _this.renderOptions(),
                React.createElement("div", { className: "gf-form" },
                    React.createElement("span", { className: "gf-form-label" }, "Relative time"),
                    React.createElement(Input, { type: "text", className: "width-6", placeholder: "1h", onBlur: _this.onOverrideTime, validationEvents: timeRangeValidationEvents, hideErrorMessage: true })),
                React.createElement("div", { className: "gf-form" },
                    React.createElement("span", { className: "gf-form-label" }, "Time shift"),
                    React.createElement(Input, { type: "text", className: "width-6", placeholder: "1h", onBlur: _this.onTimeShift, validationEvents: timeRangeValidationEvents, hideErrorMessage: true })),
                React.createElement("div", { className: "gf-form-inline" },
                    React.createElement(Switch, { label: "Hide time info", checked: hideTimeOverride, onChange: _this.onToggleTimeOverride }))));
        };
        return _this;
    }
    QueryOptions.prototype.renderOptions = function () {
        var _a = this.props, datasource = _a.datasource, panel = _a.panel;
        var queryOptions = datasource.meta.queryOptions;
        if (!queryOptions) {
            return null;
        }
        var onChangeFn = function (panelKey) {
            return function (value) {
                panel[panelKey] = value;
                panel.refresh();
            };
        };
        var allOptions = {
            cacheTimeout: {
                label: 'Cache timeout',
                placeholder: '60',
                name: 'cacheTimeout',
                value: panel.cacheTimeout,
                tooltipInfo: (React.createElement(React.Fragment, null, "If your time series store has a query cache this option can override the default cache timeout. Specify a numeric value in seconds.")),
            },
            maxDataPoints: {
                label: 'Max data points',
                placeholder: 'auto',
                name: 'maxDataPoints',
                value: panel.maxDataPoints,
                tooltipInfo: (React.createElement(React.Fragment, null, "The maximum data points the query should return. For graphs this is automatically set to one data point per pixel.")),
            },
            minInterval: {
                label: 'Min time interval',
                placeholder: '0',
                name: 'minInterval',
                value: panel.interval,
                panelKey: 'interval',
                tooltipInfo: (React.createElement(React.Fragment, null,
                    "A lower limit for the auto group by time interval. Recommended to be set to write frequency, for example",
                    ' ',
                    React.createElement("code", null, "1m"),
                    " if your data is written every minute. Access auto interval via variable",
                    ' ',
                    React.createElement("code", null, "$__interval"),
                    " for time range string and ",
                    React.createElement("code", null, "$__interval_ms"),
                    " for numeric variable that can be used in math expressions.")),
            },
        };
        return Object.keys(queryOptions).map(function (key) {
            var options = allOptions[key];
            return React.createElement(DataSourceOption, tslib_1.__assign({ key: key }, options, { onChange: onChangeFn(allOptions[key].panelKey || key) }));
        });
    };
    return QueryOptions;
}(PureComponent));
export { QueryOptions };
//# sourceMappingURL=QueryOptions.js.map