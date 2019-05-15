import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { calculateLogsLabelStats } from 'app/core/logs_model';
function StatsRow(_a) {
    var active = _a.active, count = _a.count, proportion = _a.proportion, value = _a.value;
    var percent = Math.round(proportion * 100) + "%";
    var barStyle = { width: percent };
    var className = classnames('logs-stats-row', { 'logs-stats-row--active': active });
    return (React.createElement("div", { className: className },
        React.createElement("div", { className: "logs-stats-row__label" },
            React.createElement("div", { className: "logs-stats-row__value" }, value),
            React.createElement("div", { className: "logs-stats-row__count" }, count),
            React.createElement("div", { className: "logs-stats-row__percent" }, percent)),
        React.createElement("div", { className: "logs-stats-row__bar" },
            React.createElement("div", { className: "logs-stats-row__innerbar", style: barStyle }))));
}
var STATS_ROW_LIMIT = 5;
var Stats = /** @class */ (function (_super) {
    tslib_1.__extends(Stats, _super);
    function Stats() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stats.prototype.render = function () {
        var _a = this.props, label = _a.label, rowCount = _a.rowCount, stats = _a.stats, value = _a.value, onClickClose = _a.onClickClose;
        var topRows = stats.slice(0, STATS_ROW_LIMIT);
        var activeRow = topRows.find(function (row) { return row.value === value; });
        var otherRows = stats.slice(STATS_ROW_LIMIT);
        var insertActiveRow = !activeRow;
        // Remove active row from other to show extra
        if (insertActiveRow) {
            activeRow = otherRows.find(function (row) { return row.value === value; });
            otherRows = otherRows.filter(function (row) { return row.value !== value; });
        }
        var otherCount = otherRows.reduce(function (sum, row) { return sum + row.count; }, 0);
        var topCount = topRows.reduce(function (sum, row) { return sum + row.count; }, 0);
        var total = topCount + otherCount;
        var otherProportion = otherCount / total;
        return (React.createElement("div", { className: "logs-stats" },
            React.createElement("div", { className: "logs-stats__header" },
                React.createElement("span", { className: "logs-stats__title" },
                    label,
                    ": ",
                    total,
                    " of ",
                    rowCount,
                    " rows have that label"),
                React.createElement("span", { className: "logs-stats__close fa fa-remove", onClick: onClickClose })),
            React.createElement("div", { className: "logs-stats__body" },
                topRows.map(function (stat) { return React.createElement(StatsRow, tslib_1.__assign({ key: stat.value }, stat, { active: stat.value === value })); }),
                insertActiveRow && activeRow && React.createElement(StatsRow, tslib_1.__assign({ key: activeRow.value }, activeRow, { active: true })),
                otherCount > 0 && (React.createElement(StatsRow, { key: "__OTHERS__", count: otherCount, value: "Other", proportion: otherProportion })))));
    };
    return Stats;
}(PureComponent));
export { Stats };
var Label = /** @class */ (function (_super) {
    tslib_1.__extends(Label, _super);
    function Label() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            stats: null,
            showStats: false,
        };
        _this.onClickClose = function () {
            _this.setState({ showStats: false });
        };
        _this.onClickLabel = function () {
            var _a = _this.props, onClickLabel = _a.onClickLabel, label = _a.label, value = _a.value;
            if (onClickLabel) {
                onClickLabel(label, value);
            }
        };
        _this.onClickStats = function () {
            _this.setState(function (state) {
                if (state.showStats) {
                    return { showStats: false, stats: null };
                }
                var allRows = _this.props.getRows();
                var stats = calculateLogsLabelStats(allRows, _this.props.label);
                return { showStats: true, stats: stats };
            });
        };
        return _this;
    }
    Label.prototype.render = function () {
        var _a = this.props, getRows = _a.getRows, label = _a.label, plain = _a.plain, value = _a.value;
        var _b = this.state, showStats = _b.showStats, stats = _b.stats;
        var tooltip = label + ": " + value;
        return (React.createElement("span", { className: "logs-label" },
            React.createElement("span", { className: "logs-label__value", title: tooltip }, value),
            !plain && (React.createElement("span", { title: "Filter for label", onClick: this.onClickLabel, className: "logs-label__icon fa fa-search-plus" })),
            !plain && getRows && React.createElement("span", { onClick: this.onClickStats, className: "logs-label__icon fa fa-signal" }),
            showStats && (React.createElement("span", { className: "logs-label__stats" },
                React.createElement(Stats, { stats: stats, rowCount: getRows().length, label: label, value: value, onClickClose: this.onClickClose })))));
    };
    return Label;
}(PureComponent));
var LogLabels = /** @class */ (function (_super) {
    tslib_1.__extends(LogLabels, _super);
    function LogLabels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogLabels.prototype.render = function () {
        var _a = this.props, getRows = _a.getRows, labels = _a.labels, onClickLabel = _a.onClickLabel, plain = _a.plain;
        return Object.keys(labels).map(function (key) { return (React.createElement(Label, { key: key, getRows: getRows, label: key, value: labels[key], plain: plain, onClickLabel: onClickLabel })); });
    };
    return LogLabels;
}(PureComponent));
export default LogLabels;
//# sourceMappingURL=LogLabels.js.map